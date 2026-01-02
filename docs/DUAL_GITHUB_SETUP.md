# Setting Up Dual GitHub Account Contributions

## Overview
To display contributions from both your personal and work GitHub accounts, you need to create a Personal Access Token from each account.

## Step-by-Step Setup

### 1. Create Token for Personal Account

1. **Log into your personal GitHub account**
2. Go to: https://github.com/settings/tokens
3. Click **"Generate new token (classic)"**
4. Fill in:
   - **Name**: `Portfolio Contributions - Personal`
   - **Expiration**: Choose your preference (90 days, 1 year, or no expiration)
   - **Scopes**: Check only `read:user`
5. Click **"Generate token"**
6. **Copy the token** (starts with `ghp_`)

### 2. Create Token for Work Account

1. **Log out and log into your work GitHub account**
2. Go to: https://github.com/settings/tokens
3. Click **"Generate new token (classic)"**
4. Fill in:
   - **Name**: `Portfolio Contributions - Work`
   - **Expiration**: Choose your preference
   - **Scopes**: Check only `read:user`
5. Click **"Generate token"**
6. **Copy the token** (starts with `ghp_`)

### 3. Configure Environment Variables

Create a `.env.local` file in your project root:

```bash
# Create the file
touch .env.local

# Add both tokens (replace with your actual tokens)
echo "GITHUB_TOKEN_PERSONAL=ghp_your_personal_token_here" >> .env.local
echo "GITHUB_TOKEN_WORK=ghp_your_work_token_here" >> .env.local
```

Your `.env.local` should look like:

```env
GITHUB_TOKEN_PERSONAL=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GITHUB_TOKEN_WORK=ghp_yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
```

### 4. Update Usernames in Code

Edit `app/page.tsx` and replace the placeholder usernames:

```tsx
<GitHubContributions 
  accounts={[
    { 
      username: 'your-personal-github',  // ← Replace with your personal username
      token: process.env.GITHUB_TOKEN_PERSONAL 
    },
    { 
      username: 'your-work-github',      // ← Replace with your work username
      token: process.env.GITHUB_TOKEN_WORK 
    }
  ]} 
  days={90}
/>
```

### 5. Test Locally

```bash
npm run dev
```

Visit http://localhost:3000 and you should see:
- Total contributions from both accounts combined
- Breakdown showing contributions per account
- Contribution calendar visualization

## How It Works

The implementation:
1. Uses the **personal token** to fetch data from your personal account
2. Uses the **work token** to fetch data from your work account
3. Aggregates the contributions and displays them together
4. Shows a breakdown of contributions by account

## Troubleshooting

**Problem**: "Unable to load contribution data"
- **Solution**: Check that both tokens are correctly set in `.env.local`
- Verify tokens have `read:user` scope
- Make sure usernames are correct

**Problem**: Only one account shows data
- **Solution**: Check that you created a token from BOTH accounts
- Each account needs its own token
- You can't use one token to access another account's data

**Problem**: Contributions showing as 0
- **Solution**: Verify the username spelling is correct
- Make sure the account has public contributions
- Private contributions won't show unless the repo is owned by you

## Security Notes

✅ **Safe to do:**
- Store tokens in `.env.local` (this file is gitignored)
- Use `read:user` scope (read-only access)
- Deploy with tokens in Vercel environment variables

❌ **Never do:**
- Commit tokens to git
- Share tokens publicly
- Use tokens with write permissions
- Hard-code tokens in your source files

## For Deployment (Vercel)

After deploying to Vercel:

1. Go to your project dashboard
2. Navigate to **Settings → Environment Variables**
3. Add both tokens:
   - Name: `GITHUB_TOKEN_PERSONAL`, Value: `ghp_xxx...`
   - Name: `GITHUB_TOKEN_WORK`, Value: `ghp_yyy...`
4. Redeploy your project

---

**Note**: The tokens expire based on what you selected. When they expire, you'll need to generate new tokens and update your `.env.local` and Vercel environment variables.
