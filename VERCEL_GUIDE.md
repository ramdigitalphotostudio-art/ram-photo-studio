# 📖 How to Check Vercel Cron Jobs and Logs - Step by Step

## Part 1: Check Cron Jobs

### Step 1: Go to Vercel Dashboard
1. Open browser and go to: **https://vercel.com/dashboard**
2. Log in if needed

### Step 2: Select Your Project
1. You'll see a list of your projects
2. Click on **"ramdigitalphotostudio"** (or whatever your project name is)

### Step 3: Find Cron Jobs
1. On the left sidebar, look for **"Cron Jobs"** or **"Crons"**
2. Click on it

**What you should see:**
- A list of cron jobs (if any are configured)
- For each cron job, you'll see:
  - **Name/Path**: `/api/cron/send-greetings`
  - **Schedule**: `30 19 * * *`
  - **Last Run**: Date and time of last execution
  - **Status**: Success ✅ or Failed ❌
  - **Run** button (to trigger manually)

**If you DON'T see "Cron Jobs" in the sidebar:**
- Your Vercel plan might not support cron jobs (need Hobby plan or higher)
- OR the cron job wasn't deployed properly

---

## Part 2: Check Logs

### Step 1: Go to Logs Section
1. In your project dashboard, click **"Logs"** in the left sidebar
2. OR click **"Functions"** → then **"Logs"**

### Step 2: Filter Logs
You'll see a lot of logs. Here's how to filter:

**Method 1: Search Box**
1. Look for a **search box** at the top
2. Type: `/api/cron/send-greetings`
3. Press Enter

**Method 2: Time Filter**
1. Look for a **time range dropdown** (usually says "Last 1 hour" or similar)
2. Select **"Last 1 hour"** or **"Last 24 hours"**

**Method 3: Status Filter**
1. Look for **status filters** (All, Errors, etc.)
2. Select **"All"** to see everything

### Step 3: What to Look For
In the logs, you're looking for:

**✅ Success logs:**
```
[GET] /api/cron/send-greetings
Status: 200
Checking for events on 1/11
Birthday email sent to [Customer Name]
```

**❌ Error logs:**
```
[GET] /api/cron/send-greetings
Status: 401 - Unauthorized
OR
Status: 500 - Internal Server Error
```

**⚠️ No logs:**
- Means the cron never ran
- Could be a deployment issue

---

## Part 3: Manually Trigger Cron Job

### Step 1: Go to Cron Jobs
1. Click **"Cron Jobs"** in sidebar

### Step 2: Find Your Cron
1. Look for the row with `/api/cron/send-greetings`

### Step 3: Click "Run"
1. On the right side of that row, there should be a **"Run"** or **"Trigger"** button
2. Click it
3. Wait 10-20 seconds

### Step 4: Check Results
1. Go back to **"Logs"**
2. You should see new logs from just now
3. Check if email was sent
4. Check Resend dashboard for the email

---

## Quick Troubleshooting

### "I don't see Cron Jobs in the sidebar"
**Possible reasons:**
1. **Free plan limitation**: Vercel free plan doesn't support cron jobs
   - **Solution**: Upgrade to Hobby plan ($20/month) OR use a different deployment method
2. **Not deployed yet**: The `vercel.json` wasn't deployed
   - **Solution**: Make sure you pushed the latest code to GitHub

### "Cron Jobs section is empty"
**Reason**: The `vercel.json` file wasn't recognized
**Solution**: 
1. Make sure `vercel.json` is in the root of your project
2. Make sure it's committed to git
3. Redeploy the project

### "Logs are empty"
**Reason**: Cron hasn't run yet OR failed silently
**Solution**: 
1. Manually trigger the cron
2. Check the time - maybe it hasn't reached 1:00 AM yet

---

## Alternative: Check via Vercel CLI

If you have Vercel CLI installed:

```bash
# List all cron jobs
vercel crons ls

# View recent logs
vercel logs --follow
```

---

## What to Report Back

After checking, tell me:

1. **Do you see "Cron Jobs" in the Vercel sidebar?**
   - Yes / No

2. **If yes, is `send-greetings` listed?**
   - Yes / No
   - What's the "Last Run" time?
   - What's the status?

3. **In Logs, do you see any entries for `/api/cron/send-greetings`?**
   - Yes / No
   - If yes, what's the status code?
   - Any error messages?

4. **When you click "Run" to manually trigger:**
   - What happens?
   - Any new logs appear?
   - Any emails sent?

This will help me figure out exactly what's wrong!
