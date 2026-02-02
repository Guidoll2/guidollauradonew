/**
 * AI Engine - LLM Integration Layer
 * 
 * This is an abstraction layer for AI/LLM providers.
 * Currently returns mock responses, but designed for easy integration with:
 * - OpenAI (GPT-4, GPT-3.5)
 * - Anthropic (Claude)
 * - Google (Gemini)
 * - Any other LLM provider
 * 
 * Design principles:
 * - Provider-agnostic interface
 * - Client-specific configuration (model, temperature, etc.)
 * - Conversation history support (for future context management)
 * - Error handling and fallbacks
 */

import { AIConfig } from './types';

export interface AIRequest {
  message: string;
  systemPrompt: string;
  conversationHistory?: ConversationMessage[]; // For future context support
  config: AIConfig;
}

export interface ConversationMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

export interface AIResponse {
  text: string;
  model?: string;
  tokensUsed?: number; // For billing/monitoring
  error?: string;
}

/**
 * Generate AI response for incoming message
 * 
 * TODO: Replace with actual LLM API calls
 * Integration points:
 * - OpenAI: await openai.chat.completions.create(...)
 * - Anthropic: await anthropic.messages.create(...)
 */
export async function generateAIResponse(request: AIRequest): Promise<AIResponse> {
  // ========================================================================
  // Google Gemini Integration
  // ========================================================================
  try {
    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '');
    const model = genAI.getGenerativeModel({ 
      model: request.config.model || 'gemini-1.5-flash' 
    });

    // Preparar el historial de conversación para Gemini
    const history: any[] = [];
    
    if (request.conversationHistory && request.conversationHistory.length > 0) {
      for (const msg of request.conversationHistory) {
        history.push({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }],
        });
      }
    }

    // Crear sesión de chat con historial y system prompt
    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: request.systemPrompt }],
        },
        {
          role: 'model',
          parts: [{ text: 'Entendido. Responderé siguiendo estas instrucciones.' }],
        },
        ...history,
      ],
      generationConfig: {
        temperature: request.config.temperature ?? 0.7,
        maxOutputTokens: request.config.maxTokens ?? 500,
      },
    });

    const result = await chat.sendMessage(request.message);
    const response = result.response;

    return {
      text: response.text() || 'No response generated',
      model: request.config.model || 'gemini-1.5-flash',
    };

    // ========================================================================
    // EXAMPLE: OpenAI Integration (commented out)
    // ========================================================================
    /*
    const OpenAI = (await import('openai')).default;
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const messages: any[] = [
      { role: 'system', content: request.systemPrompt },
    ];

    // Add conversation history if available
    if (request.conversationHistory) {
      messages.push(...request.conversationHistory.map(msg => ({
        role: msg.role,
        content: msg.content,
      })));
    }

    // Add current user message
    messages.push({ role: 'user', content: request.message });

    const completion = await openai.chat.completions.create({
      model: request.config.model || 'gpt-4',
      messages,
      temperature: request.config.temperature ?? 0.7,
      max_tokens: request.config.maxTokens ?? 500,
    });

    return {
      text: completion.choices[0].message.content || 'No response generated',
      model: completion.model,
      tokensUsed: completion.usage?.total_tokens,
    };
    */

    // ========================================================================
    // EXAMPLE: Anthropic Integration (commented out)
    // ========================================================================
    /*
    import Anthropic from '@anthropic-ai/sdk';
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const message = await anthropic.messages.create({
      model: request.config.model || 'claude-3-opus-20240229',
      max_tokens: request.config.maxTokens ?? 1024,
      system: request.systemPrompt,
      messages: [
        { role: 'user', content: request.message }
      ],
    });

    return {
      text: message.content[0].text,
      model: message.model,
      tokensUsed: message.usage.input_tokens + message.usage.output_tokens,
    };
    */

  } catch (error) {
    console.error('[AIEngine] Error generating response:', error);
    
    return {
      text: '',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Check if AI is properly configured for a client
 */
export function isAIEnabled(config: AIConfig): boolean {
  return config.enabled && !!config.systemPrompt;
}
