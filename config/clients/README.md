# Client Configuration Directory

This directory contains JSON configuration files for each client using the WhatsApp AI assistant.

## Structure

Each client gets their own JSON file (e.g., `self.json`, `client-abc.json`).

## Adding a New Client

1. Copy `self.json` as a template
2. Update all fields:
   - `clientId`: Unique identifier (lowercase, no spaces)
   - `businessName`: Display name
   - `businessDescription`: What the business does
   - `allowedPhoneNumbers`: WhatsApp Business numbers for this client
   - `rules`: Keyword-based auto-responses
   - `ai`: AI configuration and system prompt
   - `handoff`: Human escalation settings

3. Save the file as `{clientId}.json`
4. Restart the application (or call reloadClients() if hot-reload is enabled)

## Security Note

**Do NOT commit sensitive data** (API keys, real phone numbers, PII) to version control.
For production, consider:
- Loading configs from a database
- Using environment-specific secrets
- Implementing access controls

## Multi-Tenant Design

The system is designed to support unlimited clients. Each client's messages are:
- Routed independently based on phone number lookup
- Processed with their specific rules and AI settings
- Isolated from other clients

Future enhancements:
- Rate limiting per client
- Usage tracking and billing
- Admin dashboard to manage configs via UI
- Webhook notifications per client
