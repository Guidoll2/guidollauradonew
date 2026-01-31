/**
 * Message Router - Orchestration Layer
 * 
 * This is the central coordinator that routes messages through:
 * 1. Rules engine (instant keyword-based responses)
 * 2. AI engine (LLM-powered responses)
 * 3. Fallback (when nothing else works)
 * 
 * Design principles:
 * - Single responsibility: orchestration only
 * - Clear execution order
 * - Extensible for future enhancements (rate limiting, analytics, etc.)
 */

import { ClientConfig, IncomingMessage, ProcessedResponse } from './types';
import { processRules, shouldHandoff } from './rules-engine';
import { generateAIResponse, isAIEnabled } from './ai-engine';
import {
  getConversationHistory,
  getConversationState,
  recordAssistantMessage,
  recordUserMessage,
} from './conversation-store';

function enforceSingleQuestion(text: string): string {
  const first = text.indexOf('?');
  if (first === -1) return text.trim();
  const second = text.indexOf('?', first + 1);
  if (second === -1) return text.trim();
  return text.slice(0, first + 1).trim();
}

function askedAQuestion(text: string): boolean {
  return text.includes('?');
}

function looksComplex(userText: string): boolean {
  const t = userText.toLowerCase();
  const keywords = [
    'tienda online',
    'tienda en linea',
    'ecommerce',
    'e-commerce',
    'carrito',
    'pagos',
    'pasarela',
    'mercadopago',
    'stripe',
    'suscripcion',
    'suscripción',
    'login',
    'usuarios',
    'panel',
    'admin',
    'app',
    'sistema',
    'integracion',
    'integración',
    'api',
    'crm',
  ];
  return keywords.some(k => t.includes(k));
}

function isAffirmative(userText: string): boolean {
  const t = userText.toLowerCase().trim();
  const yesPhrases = [
    'si',
    'sí',
    'dale',
    'ok',
    'okay',
    'perfecto',
    'me interesa',
    'me sirve',
    'de acuerdo',
    'vamos',
    'adelante',
    'yes',
    'sure',
    'sounds good',
  ];
  return yesPhrases.some(p => t === p || t.startsWith(p + ' ') || t.includes(' ' + p + ' '));
}

function basicOfferText(): string {
  return (
    'Una web básica tipo landing cuesta 200 euros e incluye dominio por 1 año, hosting, enlace a WhatsApp, correo y redes sociales. ¿Le interesa?'
  );
}

function complexHandoffText(): string {
  return 'Perfecto, gracias. Le aviso a Guido para que lo contacte y lo llame. ¿A qué número y horario le viene bien?';
}

function acceptedOfferCloseText(): string {
  return 'Perfecto, gracias. Le aviso a Guido para coordinarlo. ¿A qué número y horario le viene bien?';
}

/**
 * Main entry point for message processing
 * 
 * Execution flow:
 * 1. Check for handoff triggers
 * 2. Try rules-based matching
 * 3. Try AI response (if enabled)
 * 4. Return fallback
 * 
 * @param client - Client configuration
 * @param message - Incoming message from WhatsApp
 * @returns Processed response ready to send back
 */
export async function routeMessage(
  client: ClientConfig,
  message: IncomingMessage
): Promise<ProcessedResponse> {
  
  const { text, from } = message;

  // Record the inbound user message for context/stateful behavior.
  recordUserMessage(client.clientId, from, text, message.timestamp);

  // If the request is clearly complex, escalate early.
  if (looksComplex(text)) {
    const msg = complexHandoffText();
    recordAssistantMessage(client.clientId, from, msg, {
      askedQuestion: askedAQuestion(msg),
    });

    return {
      text: msg,
      source: 'ai',
      clientId: client.clientId,
      metadata: {
        earlyHandoff: true,
      },
    };
  }
  
  // ============================================================================
  // 1. CHECK FOR HANDOFF TO HUMAN AGENT
  // ============================================================================
  if (client.handoff?.enabled) {
    const needsHandoff = shouldHandoff(text, client.handoff.triggers);
    
    if (needsHandoff) {
      console.log(`[Router] Handoff triggered for client: ${client.clientId}`);
      
      // TODO: In production, trigger notification to human agent
      // e.g., send webhook, create ticket, etc.
      
      return {
        text: client.handoff.fallbackMessage || 
              'Thank you for your message. A team member will assist you shortly.',
        source: 'handoff',
        clientId: client.clientId,
        metadata: {
          handoffTriggered: true,
          from,
        },
      };
    }
  }

  // ============================================================================
  // 2. RULES ENGINE - Instant keyword-based responses
  // ============================================================================
  const ruleMatch = processRules(text, client.rules);
  
  if (ruleMatch.matched && ruleMatch.response) {
    console.log(`[Router] Rule matched for client: ${client.clientId}`);

    const ruleResponse = enforceSingleQuestion(ruleMatch.response);
    recordAssistantMessage(client.clientId, from, ruleResponse, {
      askedQuestion: askedAQuestion(ruleResponse),
    });
    
    return {
      text: ruleResponse,
      source: 'rule',
      matchedRule: ruleMatch.matchedRule,
      clientId: client.clientId,
    };
  }

  // ============================================================================
  // 3. AI ENGINE - LLM-powered response
  // ============================================================================
  if (isAIEnabled(client.ai)) {
    console.log(`[Router] Attempting AI response for client: ${client.clientId}`);
    
    try {
      const state = getConversationState(client.clientId, from);
      const history = getConversationHistory(client.clientId, from);

      // If user accepted the basic offer, close and collect contact/time.
      const lastAssistant = [...history].reverse().find(m => m.role === 'assistant');
      const lastAssistantText = lastAssistant?.content?.toLowerCase() || '';
      const lastWasOffer = lastAssistantText.includes('200') || lastAssistantText.includes('200 euros');
      if (lastWasOffer && isAffirmative(text)) {
        const close = acceptedOfferCloseText();
        recordAssistantMessage(client.clientId, from, close, {
          askedQuestion: askedAQuestion(close),
        });

        return {
          text: close,
          source: 'ai',
          clientId: client.clientId,
          metadata: {
            offerAccepted: true,
          },
        };
      }

      // Hard guard: after 4 questions, never ask more. Conclude instead.
      if (state.assistantQuestionCount >= 4) {
        const combinedUserText = history
          .filter(m => m.role === 'user')
          .map(m => m.content)
          .join('\n');

        const forced = looksComplex(combinedUserText) ? complexHandoffText() : basicOfferText();
        recordAssistantMessage(client.clientId, from, forced, {
          askedQuestion: askedAQuestion(forced),
        });

        return {
          text: forced,
          source: 'ai',
          clientId: client.clientId,
          metadata: {
            forcedConclusion: true,
          },
        };
      }

      const stateHint =
        `\n\nESTADO (no lo menciones):\n` +
        `- saludo_ya_hecho: ${state.greeted ? 'sí' : 'no'}\n` +
        `- preguntas_hechas: ${state.assistantQuestionCount} (máx 4)\n` +
        `REGLA CLAVE: Una sola pregunta por mensaje. Si saludo_ya_hecho=no, abre con "Buen día" o "Buenas tardes" (no digas solo "Hola."). ` +
        `Si preguntas_hechas es 3 o más, ahora debes concluir (oferta 200€ para web básica o derivación a Guido si es complejo) y cerrar siempre con que le avisarás a Guido para que lo contacte; haz SOLO una pregunta final.`;

      const aiResponse = await generateAIResponse({
        message: text,
        systemPrompt: client.ai.systemPrompt + stateHint,
        config: client.ai,
        conversationHistory: history,
      });

      if (aiResponse.text && !aiResponse.error) {
        const cleaned = enforceSingleQuestion(aiResponse.text);
        // Ensure that conclusions always end with notifying Guido.
        const needsNotify =
          (cleaned.toLowerCase().includes('200') || cleaned.toLowerCase().includes('landing') || cleaned.toLowerCase().includes('tienda')) &&
          !cleaned.toLowerCase().includes('guido');
        const finalText = needsNotify
          ? `${cleaned} Le aviso a Guido para que lo contacte.`
          : cleaned;

        recordAssistantMessage(client.clientId, from, finalText, {
          askedQuestion: askedAQuestion(finalText),
        });

        return {
          text: finalText,
          source: 'ai',
          clientId: client.clientId,
          metadata: {
            model: aiResponse.model,
            tokensUsed: aiResponse.tokensUsed,
          },
        };
      }

      // AI failed, log and continue to fallback
      console.error(`[Router] AI error for client ${client.clientId}:`, aiResponse.error);
      
    } catch (error) {
      console.error(`[Router] AI exception for client ${client.clientId}:`, error);
    }
  }

  // ============================================================================
  // 4. FALLBACK RESPONSE
  // ============================================================================
  console.log(`[Router] Using fallback for client: ${client.clientId}`);
  
  return {
    text: "Thank you for your message. I'm currently processing your request. " +
          "If you need immediate assistance, please contact our support team.",
    source: 'fallback',
    clientId: client.clientId,
  };
}

/**
 * Batch message routing (for future bulk processing)
 */
export async function routeMessages(
  client: ClientConfig,
  messages: IncomingMessage[]
): Promise<ProcessedResponse[]> {
  return Promise.all(messages.map(msg => routeMessage(client, msg)));
}
