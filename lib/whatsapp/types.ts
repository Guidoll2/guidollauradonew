/**
 * Core types for the WhatsApp AI assistant system
 * All types are designed to support multi-tenant architecture
 */

// ============================================================================
// CLIENT CONFIGURATION TYPES
// ============================================================================

export interface ClientConfig {
  clientId: string;
  businessName: string;
  businessDescription: string;
  allowedPhoneNumbers: string[]; // WhatsApp phone numbers that belong to this client
  rules: Rule[];
  ai: AIConfig;
  handoff?: HandoffConfig;
  metadata?: Record<string, any>; // For future extensibility (billing, tier, etc.)
}

export interface Rule {
  keywords: string[]; // Case-insensitive matching
  response: string;
  priority?: number; // For future rule ordering
  enabled?: boolean;
}

export interface AIConfig {
  enabled: boolean;
  systemPrompt: string;
  model?: string; // e.g., "gpt-4", "claude-3-opus"
  temperature?: number;
  maxTokens?: number;
}

export interface HandoffConfig {
  enabled: boolean;
  triggers?: string[]; // Keywords that trigger handoff
  fallbackMessage?: string;
  notificationWebhook?: string; // Where to send handoff notifications
}

// ============================================================================
// MESSAGE PROCESSING TYPES
// ============================================================================

export interface IncomingMessage {
  from: string; // Sender phone number
  to: string; // Recipient phone number (your WhatsApp Business number)
  text: string;
  timestamp?: number;
  messageId?: string;
  metadata?: Record<string, any>;
}

export interface ProcessedResponse {
  text: string;
  source: 'rule' | 'ai' | 'fallback' | 'handoff';
  matchedRule?: string; // Which rule was matched, if any
  clientId: string;
  metadata?: Record<string, any>;
}

// ============================================================================
// WHATSAPP WEBHOOK TYPES (based on WhatsApp Business API payload)
// ============================================================================

export interface WhatsAppWebhookPayload {
  object: string;
  entry: WhatsAppEntry[];
}

export interface WhatsAppEntry {
  id: string;
  changes: WhatsAppChange[];
}

export interface WhatsAppChange {
  value: WhatsAppValue;
  field: string;
}

export interface WhatsAppValue {
  messaging_product: string;
  metadata: {
    display_phone_number: string;
    phone_number_id: string;
  };
  contacts?: WhatsAppContact[];
  messages?: WhatsAppMessage[];
  statuses?: any[]; // For message status updates
}

export interface WhatsAppContact {
  profile: {
    name: string;
  };
  wa_id: string;
}

export interface WhatsAppMessage {
  from: string;
  id: string;
  timestamp: string;
  text?: {
    body: string;
  };
  type: string;
}

// ============================================================================
// ERROR TYPES
// ============================================================================

export class ClientNotFoundError extends Error {
  constructor(phoneNumber: string) {
    super(`No client configuration found for phone number: ${phoneNumber}`);
    this.name = 'ClientNotFoundError';
  }
}

export class InvalidConfigError extends Error {
  constructor(clientId: string, reason: string) {
    super(`Invalid configuration for client ${clientId}: ${reason}`);
    this.name = 'InvalidConfigError';
  }
}
