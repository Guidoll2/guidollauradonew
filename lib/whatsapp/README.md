# WhatsApp AI Assistant - Architecture Documentation

## Overview

This is a **production-ready, multi-tenant WhatsApp AI assistant** built on Next.js. It's designed as a SaaS foundation where multiple clients can have their own AI assistants, each with custom rules, AI personalities, and business logic.

## Architecture Principles

✅ **Multi-tenant from day one** - No hardcoded logic for a single client  
✅ **Configuration-driven** - Add new clients via JSON files  
✅ **Clean separation** - Webhooks, routing, rules, and AI are independent  
✅ **Provider-agnostic AI** - Easy to swap OpenAI, Anthropic, etc.  
✅ **Production-ready structure** - Built for scale, monitoring, and extensibility  

## System Architecture

```
WhatsApp Business API
        ↓
  /api/whatsapp/webhook
        ↓
  Client Loader (phone → config)
        ↓
  Message Router
        ↓
    ┌───────────────┬──────────────┬──────────────┐
    │               │              │              │
Handoff Check   Rules Engine   AI Engine    Fallback
```

## Directory Structure

```
lib/whatsapp/
├── types.ts              # All TypeScript interfaces
├── client-loader.ts      # Load & cache client configs
├── router.ts             # Message routing orchestration
├── rules-engine.ts       # Keyword-based responses
└── ai-engine.ts          # LLM integration (placeholder)

config/clients/
└── self.json             # Your client configuration
                          # Add more: client-abc.json, client-xyz.json

app/api/whatsapp/webhook/
└── route.ts              # WhatsApp webhook endpoint
```

## Core Components

### 1. Client Configuration (`config/clients/*.json`)

Each client gets a JSON file defining:
- **Business identity** (name, description)
- **Phone numbers** (which WhatsApp numbers belong to this client)
- **Rules** (keyword → instant response mappings)
- **AI settings** (system prompt, model, temperature)
- **Handoff rules** (when to escalate to human)

**Example:**
```json
{
  "clientId": "self",
  "businessName": "My Business",
  "allowedPhoneNumbers": ["+1234567890"],
  "rules": [
    {
      "keywords": ["pricing", "cost"],
      "response": "Our pricing starts at $X...",
      "enabled": true
    }
  ],
  "ai": {
    "enabled": true,
    "systemPrompt": "You are a helpful assistant for...",
    "model": "gpt-4"
  }
}
```

### 2. Client Loader (`lib/whatsapp/client-loader.ts`)

- Loads all client configs at startup
- Caches in memory for fast lookup
- Maps phone numbers → clientId
- Validates configuration structure

**In production**, this can be replaced with:
- Database queries (PostgreSQL, MongoDB)
- Redis cache
- External config service

### 3. Webhook Endpoint (`app/api/whatsapp/webhook/route.ts`)

**Responsibilities:**
- Verify WhatsApp webhook (GET request)
- Receive incoming messages (POST request)
- Extract sender, message text, metadata
- Resolve client configuration
- Trigger message processing
- Return 200 OK immediately

**WhatsApp Integration:**
- Currently mocked - logs instead of sending
- Ready for WhatsApp Cloud API integration
- Comments show exact integration points

### 4. Message Router (`lib/whatsapp/router.ts`)

**Execution flow:**
1. Check if handoff to human is needed
2. Try rules engine (instant responses)
3. Try AI engine (if enabled)
4. Return fallback message

**Key features:**
- Single responsibility: orchestration only
- Clear decision tree
- Extensible for future enhancements (rate limiting, analytics)

### 5. Rules Engine (`lib/whatsapp/rules-engine.ts`)

**Simple but powerful:**
- Case-insensitive keyword matching
- Priority-based ordering
- Enable/disable individual rules
- First match wins

**Use cases:**
- FAQ responses
- Business hours
- Pricing info
- Common questions

### 6. AI Engine (`lib/whatsapp/ai-engine.ts`)

**Current state:** Mock responses

**Ready for:**
- OpenAI (GPT-4, GPT-3.5)
- Anthropic (Claude)
- Google (Gemini)
- Any LLM provider

**Includes:**
- Example integration code (commented)
- Conversation history support (prepared)
- Token tracking for billing
- Error handling

## Adding a New Client

1. **Create config file:**
   ```bash
   cp config/clients/self.json config/clients/acme-corp.json
   ```

2. **Update configuration:**
   - Change `clientId` to `"acme-corp"`
   - Update business name and description
   - Set their WhatsApp Business phone number
   - Customize rules and AI prompt

3. **Restart application** (or call `reloadClients()`)

4. **Done!** Messages to that phone number will use this config.

## Environment Variables

Create a `.env.local` file:

```bash
# WhatsApp Webhook Verification
WHATSAPP_VERIFY_TOKEN=your_secure_token_here

# WhatsApp Cloud API (when ready to integrate)
WHATSAPP_ACCESS_TOKEN=your_meta_access_token
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id

# AI Provider (when ready)
OPENAI_API_KEY=sk-...
# OR
ANTHROPIC_API_KEY=sk-ant-...
```

## Testing the System

### 1. Test Webhook Verification
```bash
curl "http://localhost:3000/api/whatsapp/webhook?hub.mode=subscribe&hub.verify_token=your_verify_token_here&hub.challenge=test123"
```
**Expected:** Returns `test123`

### 2. Test Message Processing (Mock)

See `test-webhook.ts` in the next section for a full test script.

## Integration Checklist

### Phase 1: Local Testing ✅ (Done)
- [x] Project structure created
- [x] Client configuration system
- [x] Webhook endpoint
- [x] Message routing
- [x] Rules engine
- [x] AI engine placeholder

### Phase 2: WhatsApp Integration
- [ ] Set up Meta Business Account
- [ ] Create WhatsApp Business API app
- [ ] Get phone number and access token
- [ ] Configure webhook URL
- [ ] Uncomment WhatsApp API calls in `route.ts`
- [ ] Test with real WhatsApp messages

### Phase 3: AI Integration
- [ ] Choose LLM provider (OpenAI/Anthropic/etc.)
- [ ] Add API credentials
- [ ] Uncomment integration code in `ai-engine.ts`
- [ ] Test AI responses
- [ ] Tune system prompts

### Phase 4: Production Enhancements
- [ ] Move configs to database
- [ ] Add conversation history/context
- [ ] Implement rate limiting per client
- [ ] Add usage tracking & billing
- [ ] Set up monitoring/logging
- [ ] Build admin dashboard
- [ ] Add webhook signature verification

## Extending the System

### Add Rate Limiting
```typescript
// In router.ts, before processing
await checkRateLimit(client.clientId, message.from);
```

### Add Analytics
```typescript
// After routing
await logMessageEvent({
  clientId: client.clientId,
  source: response.source,
  tokensUsed: response.metadata?.tokensUsed,
});
```

### Add Conversation Context
```typescript
// In router.ts
const history = await getConversationHistory(client.clientId, message.from);
// Pass to AI engine
```

### Add More Channels
The architecture supports any messaging channel:
- Telegram
- SMS (Twilio)
- Slack
- Discord

Just create new webhook endpoints that normalize to `IncomingMessage` format.

## Security Considerations

1. **Webhook Verification**
   - Add signature verification for WhatsApp webhooks
   - Validate all incoming payloads

2. **Client Isolation**
   - Each client's data must remain separate
   - Never expose one client's config to another

3. **Secrets Management**
   - Never commit API keys or tokens
   - Use environment variables or secret managers
   - Rotate credentials regularly

4. **Rate Limiting**
   - Prevent abuse per client
   - Protect AI API costs

## Monitoring & Observability

**Key metrics to track:**
- Messages per client per day
- Response source distribution (rules vs AI vs fallback)
- AI token usage per client
- Response latency
- Error rates

**Recommended tools:**
- Sentry for error tracking
- Datadog/New Relic for metrics
- CloudWatch/Grafana for dashboards

## Cost Management

**AI costs:**
- Track tokens per client via `metadata.tokensUsed`
- Set per-client monthly limits
- Choose appropriate models (GPT-3.5 vs GPT-4)

**Infrastructure:**
- Start with Vercel/Netlify free tier
- Scale to dedicated hosting as client base grows

## FAQ

**Q: Can I use this for one client only?**  
A: Yes! Just use `self.json`. The multi-tenant design doesn't add complexity.

**Q: How do I test without WhatsApp?**  
A: Use the test script (see next section) to simulate webhook calls.

**Q: Can I use a different database?**  
A: Yes! Replace `client-loader.ts` with database queries. The interface stays the same.

**Q: How do I add conversation memory?**  
A: Store messages in a database, retrieve in `router.ts`, pass to AI engine.

**Q: Can clients have different AI providers?**  
A: Yes! Add `provider` field to `AIConfig` and route accordingly in `ai-engine.ts`.

---

**Built with ❤️ for production use.**
