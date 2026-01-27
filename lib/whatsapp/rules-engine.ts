/**
 * Rules Engine
 * 
 * Keyword-based message matching system.
 * Processes client-defined rules to provide instant responses without AI.
 * 
 * Design principles:
 * - Case-insensitive matching
 * - First match wins (can be extended with priority)
 * - Disabled rules are skipped
 */

import { Rule } from './types';

export interface RuleMatchResult {
  matched: boolean;
  response?: string;
  matchedRule?: string; // For debugging/analytics
}

/**
 * Check if message matches any rule and return response
 * 
 * @param message - The incoming message text
 * @param rules - Array of rules from client config
 * @returns Match result with response if found
 */
export function processRules(message: string, rules: Rule[]): RuleMatchResult {
  if (!rules || rules.length === 0) {
    return { matched: false };
  }

  const normalizedMessage = message.toLowerCase().trim();

  // Sort by priority if defined (higher priority first)
  const sortedRules = [...rules].sort((a, b) => {
    const priorityA = a.priority ?? 0;
    const priorityB = b.priority ?? 0;
    return priorityB - priorityA;
  });

  for (const rule of sortedRules) {
    // Skip disabled rules
    if (rule.enabled === false) {
      continue;
    }

    // Check if any keyword matches
    const matched = rule.keywords.some(keyword => {
      const normalizedKeyword = keyword.toLowerCase().trim();
      
      // Exact match or contains match
      // You can make this more sophisticated (regex, fuzzy matching, etc.)
      return normalizedMessage.includes(normalizedKeyword);
    });

    if (matched) {
      return {
        matched: true,
        response: rule.response,
        matchedRule: rule.keywords.join(', '),
      };
    }
  }

  return { matched: false };
}

/**
 * Check if message should trigger a handoff to human agent
 * 
 * @param message - The incoming message text
 * @param triggers - Array of handoff trigger keywords
 * @returns True if handoff should occur
 */
export function shouldHandoff(message: string, triggers?: string[]): boolean {
  if (!triggers || triggers.length === 0) {
    return false;
  }

  const normalizedMessage = message.toLowerCase().trim();

  return triggers.some(trigger => {
    const normalizedTrigger = trigger.toLowerCase().trim();
    return normalizedMessage.includes(normalizedTrigger);
  });
}
