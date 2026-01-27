/**
 * WhatsApp Webhook Test Script
 * 
 * This script simulates WhatsApp webhook calls to test the entire system
 * without needing actual WhatsApp Business API access.
 * 
 * Run with: npx tsx lib/whatsapp/test-webhook.ts
 * Or with Node: node --loader ts-node/esm lib/whatsapp/test-webhook.ts
 */

import { getClientByPhone } from './client-loader';
import { routeMessage } from './router';
import { IncomingMessage } from './types';

// ============================================================================
// Test Messages
// ============================================================================

const testMessages: Array<{ message: string; description: string }> = [
  {
    description: 'Greeting (should match rule)',
    message: 'Hello!',
  },
  {
    description: 'Pricing inquiry (should match rule)',
    message: 'How much does a website cost?',
  },
  {
    description: 'Portfolio request (should match rule)',
    message: 'Can I see your work?',
  },
  {
    description: 'Complex question (should use AI)',
    message: 'I need a full-stack e-commerce platform with payment integration, what would be your approach?',
  },
  {
    description: 'Handoff trigger (should escalate to human)',
    message: 'This is urgent, I need to speak to a real person',
  },
  {
    description: 'Unknown query (should use AI or fallback)',
    message: 'What is your favorite color?',
  },
];

// ============================================================================
// Test Runner
// ============================================================================

async function runTests() {
  console.log('='.repeat(80));
  console.log('WhatsApp AI Assistant - System Test');
  console.log('='.repeat(80));
  console.log();

  // Step 1: Load client configuration
  console.log('📋 Step 1: Loading client configuration...');
  try {
    // Update this to match your phone number in config/clients/self.json
    const testPhoneNumber = '+1234567890';
    const client = getClientByPhone(testPhoneNumber);
    
    console.log('✅ Client loaded successfully!');
    console.log(`   Client ID: ${client.clientId}`);
    console.log(`   Business: ${client.businessName}`);
    console.log(`   Rules: ${client.rules.length} configured`);
    console.log(`   AI Enabled: ${client.ai.enabled}`);
    console.log();

    // Step 2: Test each message
    console.log('📨 Step 2: Testing message routing...');
    console.log();

    for (let i = 0; i < testMessages.length; i++) {
      const test = testMessages[i];
      console.log(`Test ${i + 1}/${testMessages.length}: ${test.description}`);
      console.log('-'.repeat(80));
      console.log(`Message: "${test.message}"`);
      
      const incomingMessage: IncomingMessage = {
        from: '+1987654321', // Mock sender
        to: testPhoneNumber,
        text: test.message,
        timestamp: Date.now(),
        messageId: `test-${i}`,
      };

      try {
        const response = await routeMessage(client, incomingMessage);
        
        console.log(`✅ Response generated!`);
        console.log(`   Source: ${response.source}`);
        if (response.matchedRule) {
          console.log(`   Matched Rule: ${response.matchedRule}`);
        }
        console.log(`   Response:`);
        console.log(`   "${response.text.substring(0, 150)}${response.text.length > 150 ? '...' : ''}"`);
        
        if (response.metadata) {
          console.log(`   Metadata:`, response.metadata);
        }
      } catch (error) {
        console.log(`❌ Error:`, error);
      }

      console.log();
    }

    // Step 3: Summary
    console.log('='.repeat(80));
    console.log('✅ All tests completed!');
    console.log('='.repeat(80));
    console.log();
    console.log('Next steps:');
    console.log('1. Review the responses above');
    console.log('2. Adjust rules in config/clients/self.json if needed');
    console.log('3. When ready, integrate with WhatsApp Business API');
    console.log('4. Integrate real AI provider (OpenAI/Anthropic)');
    console.log();

  } catch (error) {
    console.error('❌ Test failed:', error);
    console.log();
    console.log('Troubleshooting:');
    console.log('- Ensure config/clients/self.json exists');
    console.log('- Update the phone number in this test file');
    console.log('- Check that client-loader.ts loaded configs successfully');
  }
}

// ============================================================================
// Run Tests
// ============================================================================

runTests().catch(console.error);

// ============================================================================
// Example: Testing Individual Components
// ============================================================================

export async function testRulesEngine() {
  const { processRules } = await import('./rules-engine');
  const client = getClientByPhone('+1234567890');
  
  const testCases = [
    'hello',
    'what are your prices?',
    'show me your portfolio',
    'random message',
  ];

  console.log('Testing Rules Engine:');
  for (const message of testCases) {
    const result = processRules(message, client.rules);
    console.log(`"${message}" → ${result.matched ? '✅ Matched' : '❌ No match'}`);
    if (result.matched) {
      console.log(`  Response: ${result.response?.substring(0, 50)}...`);
    }
  }
}

export async function testAIEngine() {
  const { generateAIResponse } = await import('./ai-engine');
  
  console.log('Testing AI Engine:');
  const response = await generateAIResponse({
    message: 'Tell me about your services',
    systemPrompt: 'You are a helpful assistant',
    config: {
      enabled: true,
      systemPrompt: 'You are a helpful assistant',
      model: 'gpt-4',
      temperature: 0.7,
    },
  });

  console.log('AI Response:', response);
}
