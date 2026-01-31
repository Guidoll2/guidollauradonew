import { ConversationMessage } from './ai-engine';

type ConversationState = {
  greeted: boolean;
  assistantQuestionCount: number;
  lastUpdated: number;
  history: ConversationMessage[];
};

const store = new Map<string, ConversationState>();

const DEFAULT_TTL_MS = 24 * 60 * 60 * 1000;
const DEFAULT_HISTORY_LIMIT = 16;

function getKey(clientId: string, from: string) {
  return `${clientId}::${from}`;
}

function getOrCreateState(clientId: string, from: string): ConversationState {
  const key = getKey(clientId, from);
  const now = Date.now();
  const existing = store.get(key);

  if (existing) {
    if (now - existing.lastUpdated > DEFAULT_TTL_MS) {
      const fresh: ConversationState = {
        greeted: false,
        assistantQuestionCount: 0,
        lastUpdated: now,
        history: [],
      };
      store.set(key, fresh);
      return fresh;
    }

    existing.lastUpdated = now;
    return existing;
  }

  const created: ConversationState = {
    greeted: false,
    assistantQuestionCount: 0,
    lastUpdated: now,
    history: [],
  };
  store.set(key, created);
  return created;
}

function pushHistory(state: ConversationState, msg: ConversationMessage) {
  state.history.push(msg);
  if (state.history.length > DEFAULT_HISTORY_LIMIT) {
    state.history = state.history.slice(state.history.length - DEFAULT_HISTORY_LIMIT);
  }
}

export function getConversationState(clientId: string, from: string) {
  const state = getOrCreateState(clientId, from);
  return {
    greeted: state.greeted,
    assistantQuestionCount: state.assistantQuestionCount,
    lastUpdated: state.lastUpdated,
  };
}

export function getConversationHistory(clientId: string, from: string): ConversationMessage[] {
  const state = getOrCreateState(clientId, from);
  return [...state.history];
}

export function recordUserMessage(clientId: string, from: string, content: string, timestamp?: number) {
  const state = getOrCreateState(clientId, from);
  pushHistory(state, {
    role: 'user',
    content,
    timestamp: timestamp ?? Date.now(),
  });
}

export function recordAssistantMessage(
  clientId: string,
  from: string,
  content: string,
  opts?: { greeted?: boolean; askedQuestion?: boolean; timestamp?: number }
) {
  const state = getOrCreateState(clientId, from);

  pushHistory(state, {
    role: 'assistant',
    content,
    timestamp: opts?.timestamp ?? Date.now(),
  });

  if (opts?.greeted) {
    state.greeted = true;
  } else if (!state.greeted) {
    // Mark greeted after the first assistant response to prevent repeated greetings.
    state.greeted = true;
  }

  if (opts?.askedQuestion) {
    state.assistantQuestionCount += 1;
  }
}
