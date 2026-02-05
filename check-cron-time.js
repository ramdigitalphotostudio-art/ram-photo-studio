// Check what time the cron will run

const cronSchedule = "30 19 * * *";
const [minute, hour] = cronSchedule.split(' ');

console.log('=== CRON SCHEDULE ANALYSIS ===\n');
console.log('Cron schedule:', cronSchedule);
console.log('UTC Time:', `${hour}:${minute} (${hour}:${minute} UTC)`);

// Convert to IST
const utcHour = parseInt(hour);
const utcMinute = parseInt(minute);

// IST is UTC + 5:30
let istHour = utcHour + 5;
let istMinute = utcMinute + 30;

if (istMinute >= 60) {
    istHour += 1;
    istMinute -= 60;
}

if (istHour >= 24) {
    istHour -= 24;
}

console.log('IST Time:', `${istHour}:${istMinute.toString().padStart(2, '0')} IST`);
console.log('\n=== CURRENT TIME ===');

const now = new Date();
const istNow = new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
console.log('Current IST:', istNow.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));
console.log('Current UTC:', now.toISOString());

console.log('\n=== NEXT RUN ===');
console.log(`The cron will run next at: ${istHour}:${istMinute.toString().padStart(2, '0')} IST`);
console.log(`That's ${utcHour}:${utcMinute.toString().padStart(2, '0')} UTC`);

console.log('\n=== FOR 8:00 AM IST ===');
console.log('You need: "30 2 * * *" (2:30 AM UTC = 8:00 AM IST)');
