// Test script to debug email automation
// Run with: node test-email-automation.js

const testDate = new Date('2026-01-11T00:09:47+05:30');
const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
const istDate = new Date(testDate.getTime() + istOffset);
const todayMonth = istDate.getMonth() + 1;
const todayDay = istDate.getDate();

console.log('=== EMAIL AUTOMATION DEBUG ===\n');
console.log('Current Date (IST):', istDate.toISOString());
console.log('Month:', todayMonth);
console.log('Day:', todayDay);
console.log('\n=== TESTING BIRTHDAY MATCH ===');

// Test with a birthday on Jan 11
const testBirthday = new Date('2000-01-11'); // Example: Jan 11, 2000
const birthMonth = testBirthday.getMonth() + 1;
const birthDay = testBirthday.getDate();

console.log('Test Birthday:', testBirthday.toISOString());
console.log('Birth Month:', birthMonth);
console.log('Birth Day:', birthDay);
console.log('Match?', birthMonth === todayMonth && birthDay === todayDay);

console.log('\n=== CRON SCHEDULE CHECK ===');
console.log('Cron schedule in vercel.json: "30 18 * * *"');
console.log('This means: 18:30 UTC (6:30 PM UTC)');
console.log('In IST: 18:30 UTC + 5:30 = 00:00 IST (midnight)');
console.log('⚠️  WARNING: This will run at MIDNIGHT IST, not 8:00 AM!');

console.log('\n=== RECOMMENDED FIX ===');
console.log('For 8:00 AM IST:');
console.log('8:00 AM IST - 5:30 hours = 2:30 AM UTC');
console.log('Cron schedule should be: "30 2 * * *"');
