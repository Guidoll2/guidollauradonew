/**
 * WhatsApp Webhook Endpoint
 * 
 * Receives incoming messages from WhatsApp Business API.
 * 
 * Flow:
 * 1. Verify webhook (GET) - for WhatsApp verification
 * 2. Process messages (POST) - actual message handling
 * 3. Resolve client by phone number
 * 4. Route through message processing system
 * 5. Send response back to WhatsApp
 * 
 * Production considerations:
 * - Add webhook signature verification
 * - Implement retry logic
 * - Add request logging/monitoring
 * - Rate limiting per client
 */

import { NextRequest, NextResponse } from 'next/server';
import { getClientByPhone } from '@/lib/whatsapp/client-loader';
import { routeMessage } from '@/lib/whatsapp/router';
import { 
  WhatsAppWebhookPayload, 
  IncomingMessage, 
  ClientNotFoundError 
} from '@/lib/whatsapp/types';

// ============================================================================
// GET - Webhook Verification (WhatsApp requirement)
// ============================================================================
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  // WhatsApp sends these params to verify the webhook
  // Set WHATSAPP_VERIFY_TOKEN in your environment variables
  const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || 'your_verify_token_here';

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('[Webhook] Verification successful');
    return new NextResponse(challenge, { status: 200 });
  }

  console.warn('[Webhook] Verification failed', { mode, token });
  return NextResponse.json({ error: 'Verification failed' }, { status: 403 });
}

// ============================================================================
// POST - Message Processing
// ============================================================================
export async function POST(request: NextRequest) {
  try {
    const body: WhatsAppWebhookPayload = await request.json();

    // Log incoming webhook (useful for debugging)
    console.log('\n=== [Webhook] RECEIVED MESSAGE ===');
    console.log('[Webhook] Full body:', JSON.stringify(body, null, 2));
    console.log('[Webhook] Environment check:', {
      hasToken: !!process.env.WHATSAPP_ACCESS_TOKEN,
      hasPhoneId: !!process.env.WHATSAPP_PHONE_NUMBER_ID,
      hasGoogleAI: !!process.env.GOOGLE_AI_API_KEY
    });

    // WhatsApp sends different types of events - we only care about messages
    if (body.object !== 'whatsapp_business_account') {
      return NextResponse.json({ status: 'ignored' }, { status: 200 });
    }

    // Process each entry (usually just one)
    for (const entry of body.entry) {
      for (const change of entry.changes) {
        // Only process message events
        if (change.field !== 'messages') {
          continue;
        }

        const { messages, metadata } = change.value;

        // Skip if no messages or only status updates
        if (!messages || messages.length === 0) {
          continue;
        }

        // Process each message
        for (const msg of messages) {
          // Only handle text messages for now
          if (msg.type !== 'text' || !msg.text?.body) {
            console.log(`[Webhook] Skipping non-text message type: ${msg.type}`);
            continue;
          }

          // Build normalized incoming message
          const incomingMessage: IncomingMessage = {
            from: msg.from, // Sender's phone number
            to: metadata.display_phone_number, // Your WhatsApp Business number
            text: msg.text.body,
            timestamp: parseInt(msg.timestamp),
            messageId: msg.id,
          };

          console.log('[Webhook] Processing message:', {
            from: incomingMessage.from,
            to: incomingMessage.to,
            text: incomingMessage.text
          });

          // Process the message
          await processIncomingMessage(incomingMessage);
        }
      }
    }

    // Always return 200 to WhatsApp to acknowledge receipt
    return NextResponse.json({ status: 'success' }, { status: 200 });

  } catch (error) {
    console.error('[Webhook] Error processing webhook:', error);
    
    // Still return 200 to prevent WhatsApp from retrying
    // Log the error for manual investigation
    return NextResponse.json(
      { status: 'error', message: 'Internal processing error' },
      { status: 200 }
    );
  }
}

// ============================================================================
// Message Processing Logic
// ============================================================================
async function processIncomingMessage(message: IncomingMessage): Promise<void> {
  try {
    // 1. Resolve client by recipient phone number (your business number)
    // Note: In a multi-client system, each client has their own WhatsApp Business number
    const client = getClientByPhone(message.to);
    
    console.log(`[Webhook] Processing message for client: ${client.clientId}`);

    // 2. Route the message through the processing pipeline
    const response = await routeMessage(client, message);

    console.log(`[Webhook] Generated response from: ${response.source}`);

    // 3. Send response back to WhatsApp
    await sendWhatsAppMessage(message.from, response.text, message.to);

    // 4. Log for analytics/debugging (in production, save to database)
    console.log('[Webhook] Message processed successfully', {
      clientId: client.clientId,
      from: message.from,
      source: response.source,
      matchedRule: response.matchedRule,
    });

  } catch (error) {
    if (error instanceof ClientNotFoundError) {
      console.error('[Webhook] No client found for phone:', message.to);
      // In production, you might want to notify admins or send a default response
      return;
    }

    console.error('[Webhook] Error processing message:', error);
    
    // Send error fallback message
    try {
      await sendWhatsAppMessage(
        message.from,
        "Sorry, I'm having trouble processing your message. Please try again later.",
        message.to
      );
    } catch (sendError) {
      console.error('[Webhook] Failed to send error message:', sendError);
    }
  }
}

// ============================================================================
// WhatsApp API - Send Message
// ============================================================================
async function sendWhatsAppMessage(
  to: string,
  text: string,
  fromPhoneNumberId: string
): Promise<void> {
  console.log('\n=== [Webhook] SENDING MESSAGE ===');
  console.log('[Webhook] To:', to);
  console.log('[Webhook] Text:', text);
  console.log('[Webhook] Phone Number ID:', fromPhoneNumberId);

  // ========================================================================
  // WhatsApp Cloud API Integration
  // ========================================================================
  try {
    const WHATSAPP_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
    const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

    console.log('[Webhook] Credentials check:', {
      hasToken: !!WHATSAPP_TOKEN,
      tokenLength: WHATSAPP_TOKEN?.length,
      hasPhoneId: !!PHONE_NUMBER_ID,
      phoneId: PHONE_NUMBER_ID
    });

    if (!WHATSAPP_TOKEN || !PHONE_NUMBER_ID) {
      console.error('[Webhook] Missing WhatsApp credentials');
      throw new Error('WhatsApp credentials not configured');
    }

    const response = await fetch(
      `https://graph.facebook.com/v18.0/${PHONE_NUMBER_ID}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: to,
          type: 'text',
          text: { body: text },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`WhatsApp API error: ${JSON.stringify(error)}`);
    }

    const result = await response.json();
    console.log('[Webhook] Message sent successfully:', result.messages[0].id);
  } catch (error) {
    console.error('[Webhook] Error sending WhatsApp message:', error);
    throw error;
  }
}
