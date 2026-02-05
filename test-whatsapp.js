// Test script for WhatsApp integration
// Run this to test sending a WhatsApp message before deploying

import { sendWhatsAppMessage, getBirthdayWhatsAppMessage, getAnniversaryWhatsAppMessage } from './src/lib/whatsapp.ts';

async function testWhatsApp() {
    console.log('🧪 Testing WhatsApp Integration...\n');

    // CHANGE THIS to your WhatsApp number for testing
    const testPhoneNumber = '+918874510738'; // Replace with your number
    const testName = 'Test User';
    const testSpouseName = 'Test Spouse';

    console.log(`📱 Test phone number: ${testPhoneNumber}`);
    console.log('⚠️  Make sure you have joined the Twilio WhatsApp sandbox first!\n');

    // Test 1: Birthday Message
    console.log('--- Test 1: Birthday Message ---');
    try {
        const birthdayMessage = getBirthdayWhatsAppMessage(testName);
        console.log('Message preview:');
        console.log(birthdayMessage);
        console.log('\nSending...');
        
        const result = await sendWhatsAppMessage(testPhoneNumber, birthdayMessage);
        console.log('✅ Birthday message sent successfully!');
        console.log(`Message SID: ${result.sid}\n`);
    } catch (error) {
        console.error('❌ Failed to send birthday message:', error.message);
        console.log('\nTroubleshooting:');
        console.log('1. Check that TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_WHATSAPP_FROM are set in .env');
        console.log('2. Verify you have joined the WhatsApp sandbox');
        console.log('3. Check your phone number format (should be E.164: +919876543210)');
        console.log('4. Check Twilio Console for detailed error logs\n');
        process.exit(1);
    }

    // Wait a bit before sending next message
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Test 2: Anniversary Message
    console.log('--- Test 2: Anniversary Message ---');
    try {
        const anniversaryMessage = getAnniversaryWhatsAppMessage(testName, testSpouseName);
        console.log('Message preview:');
        console.log(anniversaryMessage);
        console.log('\nSending...');
        
        const result = await sendWhatsAppMessage(testPhoneNumber, anniversaryMessage);
        console.log('✅ Anniversary message sent successfully!');
        console.log(`Message SID: ${result.sid}\n`);
    } catch (error) {
        console.error('❌ Failed to send anniversary message:', error.message);
        process.exit(1);
    }

    console.log('🎉 All tests passed! WhatsApp integration is working correctly.');
    console.log('\nNext steps:');
    console.log('1. Check your WhatsApp to see the messages');
    console.log('2. Deploy to Vercel and add environment variables');
    console.log('3. Test the cron job in production');
}

// Run the test
testWhatsApp().catch(error => {
    console.error('Test failed:', error);
    process.exit(1);
});
