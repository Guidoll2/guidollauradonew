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
    
    return {
      text: ruleMatch.response,
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
      const aiResponse = await generateAIResponse({
        message: text,
        systemPrompt: client.ai.systemPrompt,
        config: client.ai,
        // Future: Add conversation history here
      });

      if (aiResponse.text && !aiResponse.error) {
        return {
          text: aiResponse.text,
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
