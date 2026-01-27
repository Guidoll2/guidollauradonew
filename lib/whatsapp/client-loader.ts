/**
 * Client Configuration Loader
 * 
 * Loads and validates client configurations from the file system.
 * Designed for horizontal scalability - in production, this could be replaced
 * with a database query or cache layer.
 */

import fs from 'fs';
import path from 'path';
import { ClientConfig, ClientNotFoundError, InvalidConfigError } from './types';

// Cache to avoid re-reading files on every request
// In production, consider Redis or another distributed cache
const clientCache = new Map<string, ClientConfig>();
const phoneToClientMap = new Map<string, string>(); // phone -> clientId

/**
 * Load all client configurations from config/clients/
 * Called once at startup or when cache needs refresh
 */
export function loadAllClients(): void {
  const configDir = path.join(process.cwd(), 'config', 'clients');
  
  if (!fs.existsSync(configDir)) {
    console.warn('[ClientLoader] Config directory not found:', configDir);
    return;
  }

  const files = fs.readdirSync(configDir).filter(f => f.endsWith('.json'));
  
  for (const file of files) {
    try {
      const filePath = path.join(configDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const config: ClientConfig = JSON.parse(content);
      
      validateClientConfig(config);
      
      clientCache.set(config.clientId, config);
      
      // Build phone number index for fast lookup
      for (const phone of config.allowedPhoneNumbers) {
        phoneToClientMap.set(normalizePhoneNumber(phone), config.clientId);
      }
      
      console.log(`[ClientLoader] Loaded client: ${config.clientId}`);
    } catch (error) {
      console.error(`[ClientLoader] Failed to load ${file}:`, error);
    }
  }
  
  console.log(`[ClientLoader] Loaded ${clientCache.size} client(s)`);
}

/**
 * Get client config by phone number (main lookup method)
 */
export function getClientByPhone(phoneNumber: string): ClientConfig {
  const normalized = normalizePhoneNumber(phoneNumber);
  const clientId = phoneToClientMap.get(normalized);
  
  if (!clientId) {
    throw new ClientNotFoundError(phoneNumber);
  }
  
  const config = clientCache.get(clientId);
  if (!config) {
    // Should never happen if maps are in sync
    throw new ClientNotFoundError(phoneNumber);
  }
  
  return config;
}

/**
 * Get client config by clientId (for admin operations)
 */
export function getClientById(clientId: string): ClientConfig | null {
  return clientCache.get(clientId) || null;
}

/**
 * Normalize phone number for consistent lookup
 * Removes spaces, dashes, parentheses, and ensures + prefix
 */
function normalizePhoneNumber(phone: string): string {
  let normalized = phone.replace(/[\s\-\(\)]/g, '');
  
  // Ensure it starts with +
  if (!normalized.startsWith('+')) {
    normalized = '+' + normalized;
  }
  
  return normalized;
}

/**
 * Validate client configuration structure
 */
function validateClientConfig(config: ClientConfig): void {
  if (!config.clientId) {
    throw new InvalidConfigError('unknown', 'clientId is required');
  }
  
  if (!config.allowedPhoneNumbers || config.allowedPhoneNumbers.length === 0) {
    throw new InvalidConfigError(config.clientId, 'At least one phone number is required');
  }
  
  if (!config.businessName || !config.businessDescription) {
    throw new InvalidConfigError(config.clientId, 'businessName and businessDescription are required');
  }
  
  if (config.ai && typeof config.ai.enabled !== 'boolean') {
    throw new InvalidConfigError(config.clientId, 'ai.enabled must be a boolean');
  }
  
  if (config.ai?.enabled && !config.ai.systemPrompt) {
    throw new InvalidConfigError(config.clientId, 'ai.systemPrompt is required when AI is enabled');
  }
}

/**
 * Reload all client configurations (for hot-reloading in dev)
 */
export function reloadClients(): void {
  clientCache.clear();
  phoneToClientMap.clear();
  loadAllClients();
}

// Auto-load on module import
// In production, you might want to do this explicitly at app startup
if (process.env.NODE_ENV !== 'test') {
  loadAllClients();
}
