# WhatsApp AI Assistant - System Overview

## 🏗️ Architecture at a Glance

```
┌─────────────────────────────────────────────────────────────────┐
│                        WhatsApp Business API                     │
│                     (Meta's Cloud Service)                       │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ HTTP POST (webhook)
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                   YOUR NEXT.JS APPLICATION                       │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐   │
│  │  /api/whatsapp/webhook/route.ts                        │   │
│  │  ✓ Validates webhook                                   │   │
│  │  ✓ Extracts message data                               │   │
│  │  ✓ Returns 200 OK immediately                          │   │
│  └──────────────────────┬─────────────────────────────────┘   │
│                         │                                       │
│                         ▼                                       │
│  ┌────────────────────────────────────────────────────────┐   │
│  │  lib/whatsapp/client-loader.ts                         │   │
│  │  ✓ Maps phone number → client config                   │   │
│  │  ✓ Loads config/clients/*.json                         │   │
│  │  ✓ Caches in memory                                    │   │
│  └──────────────────────┬─────────────────────────────────┘   │
│                         │                                       │
│                         ▼                                       │
│  ┌────────────────────────────────────────────────────────┐   │
│  │  lib/whatsapp/router.ts                                │   │
│  │  ✓ Orchestrates message flow                           │   │
│  │  ✓ Decides: rules → AI → fallback                      │   │
│  └──────────┬──────────────────────┬──────────────┬───────┘   │
│             │                      │              │            │
│             ▼                      ▼              ▼            │
│  ┌──────────────┐    ┌──────────────────┐  ┌─────────────┐  │
│  │ rules-engine │    │   ai-engine      │  │  fallback   │  │
│  │              │    │                  │  │             │  │
│  │ • Keywords   │    │ • OpenAI/Claude  │  │ • Default   │  │
│  │ • Instant    │    │ • System prompt  │  │   message   │  │
│  │ • Free       │    │ • Context        │  │             │  │
│  └──────────────┘    └──────────────────┘  └─────────────┘  │
│             │                      │              │            │
│             └──────────┬───────────┴──────────────┘            │
│                        ▼                                       │
│               ┌─────────────────┐                              │
│               │ Response Object │                              │
│               │ • text          │                              │
│               │ • source        │                              │
│               │ • metadata      │                              │
│               └────────┬────────┘                              │
│                        │                                       │
└────────────────────────┼───────────────────────────────────────┘
                         │
                         │ Send back to WhatsApp
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    User's WhatsApp Device                        │
└─────────────────────────────────────────────────────────────────┘
```

## 🔄 Message Flow Example

### Scenario: User asks "What's your pricing?"

```
1. User sends WhatsApp message
   ↓
2. WhatsApp API POSTs to /api/whatsapp/webhook
   {
     "from": "+1234567890",
     "text": "What's your pricing?",
     ...
   }
   ↓
3. Webhook extracts data and looks up client
   Phone: +1234567890 → Client: "self"
   ↓
4. Router receives message + client config
   ↓
5. Rules Engine checks keywords
   ✓ "pricing" matches rule #1
   → Returns configured response
   ↓
6. Router stops (rule matched, no need for AI)
   ↓
7. Response sent back to WhatsApp
   ↓
8. User receives instant answer
```

## 📊 Multi-Tenant Architecture

```
┌───────────────────────────────────────────────────────────────┐
│                    config/clients/                            │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│  self.json                acme-corp.json         startup.json │
│  ├─ clientId: "self"      ├─ clientId: "acme"   ├─ ...       │
│  ├─ phone: +1234567890    ├─ phone: +1555000000 ├─ ...       │
│  ├─ rules: [...]          ├─ rules: [...]       └─ ...       │
│  └─ ai: {prompt: "..."}   └─ ai: {prompt: "..."}             │
│                                                               │
└───────────────────────────┬───────────────────────────────────┘
                            │
                            │ All loaded into memory
                            ▼
                ┌──────────────────────────┐
                │   Client Cache (Map)     │
                │                          │
                │  +1234567890 → self      │
                │  +1555000000 → acme-corp │
                │  +1999888777 → startup   │
                └──────────────────────────┘
                            │
                            │ Fast O(1) lookup
                            ▼
                     Process message
```

## 🎯 Why This Architecture?

### ✅ Multi-Tenant from Day 1
- **No hardcoded logic** - Everything driven by config files
- **Add clients** by creating `{clientId}.json`
- **Each client isolated** - Own rules, AI prompt, settings

### ✅ Production-Ready Structure
- **Clean separation** - Webhook, routing, rules, AI are independent
- **Testable** - Each component can be tested in isolation
- **Scalable** - Can move to database, add caching, etc.

### ✅ Provider Agnostic
- **AI Engine** is abstracted - swap OpenAI for Claude easily
- **WhatsApp** could be swapped for Telegram, SMS, etc.
- **Config storage** can move from files to database

### ✅ Cost Optimized
- **Rules first** - Free, instant responses for common questions
- **AI second** - Only used when rules don't match
- **Fallback last** - Graceful degradation

## 🚀 Scaling Path

### Phase 1: Single Client (NOW)
```
Files → Memory Cache → Message Router → Mock AI
```

### Phase 2: Multiple Clients (Easy)
```
Files → Memory Cache → Message Router → Real AI
                ↓
        +3 clients added by creating JSON files
```

### Phase 3: Production (Future)
```
Database → Redis Cache → Message Router → Real AI
    ↓           ↓              ↓
Analytics   Rate Limit    Context DB
    ↓           ↓              ↓
Dashboard   Billing      Conversation History
```

## 💾 Data Flow

### Configuration (Static)
```
JSON files (config/clients/*.json)
    ↓
client-loader.ts (read once at startup)
    ↓
In-memory cache (Map<clientId, ClientConfig>)
    ↓
Fast lookups during message processing
```

### Messages (Dynamic)
```
WhatsApp → Webhook → Router → Rules/AI → Response
                                  ↓
                        (Future: Save to DB for history)
```

## 🔐 Security Layers

```
┌─────────────────────────────────────────┐
│ WhatsApp Business API                   │
│ ✓ HTTPS only                            │
│ ✓ Signature verification (you add)     │
└─────────────┬───────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────┐
│ Your Webhook Endpoint                   │
│ ✓ Verify webhook token                 │
│ ✓ Validate payload structure            │
│ ✓ Rate limiting (you add)               │
└─────────────┬───────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────┐
│ Client Resolution                       │
│ ✓ Phone number must match config       │
│ ✓ Client isolation enforced             │
└─────────────┬───────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────┐
│ Message Processing                      │
│ ✓ Input sanitization                   │
│ ✓ AI prompt injection protection       │
│ ✓ Error handling                        │
└─────────────────────────────────────────┘
```

## 📈 Monitoring Points

```
Webhook Endpoint
  ├─ Request rate
  ├─ Error rate
  └─ Response time

Client Loader
  ├─ Configs loaded
  ├─ Cache hits
  └─ Lookup failures

Message Router
  ├─ Messages processed
  ├─ Source distribution (rule/AI/fallback)
  └─ Processing time

Rules Engine
  ├─ Rules matched
  └─ Match rate

AI Engine
  ├─ API calls
  ├─ Tokens used
  ├─ Response time
  └─ Error rate
```

## 🛠️ Extension Points

The architecture is designed for easy extension:

### 1. Add New Message Channels
```typescript
// Just create a new webhook that normalizes to IncomingMessage
POST /api/telegram/webhook
POST /api/sms/webhook
POST /api/slack/webhook
  ↓
All use same router.ts
```

### 2. Add Conversation Context
```typescript
// In router.ts, before AI call:
const history = await getConversationHistory(clientId, phoneNumber);
// Pass to AI engine
```

### 3. Add Rate Limiting
```typescript
// In webhook route.ts:
await checkRateLimit(clientId, phoneNumber);
```

### 4. Add Admin Dashboard
```typescript
POST /api/admin/clients       // Create client
GET  /api/admin/clients       // List all clients
PUT  /api/admin/clients/:id   // Update config
GET  /api/admin/analytics     // Usage stats
```

### 5. Add Billing/Usage Tracking
```typescript
// After message processing:
await trackUsage({
  clientId,
  tokensUsed: response.metadata.tokensUsed,
  timestamp: Date.now(),
});
```

## 🎓 Key Design Decisions

| Decision | Why |
|----------|-----|
| **File-based configs** | Easy to start, can migrate to DB later |
| **Phone → Client mapping** | WhatsApp uses phone numbers as identifiers |
| **Rules before AI** | Cheaper, faster for common questions |
| **In-memory cache** | Fast lookups, configs rarely change |
| **Immediate webhook response** | WhatsApp requires quick 200 OK |
| **Provider abstraction** | Easy to swap AI providers |
| **No hardcoded logic** | True multi-tenant from start |

---

**This architecture grows with you** - from single client to SaaS platform. 🚀
