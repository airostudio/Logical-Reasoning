# 🔧 Stripe Setup & Troubleshooting Guide

This guide will help you set up Stripe payment integration and resolve common issues.

## Quick Setup Steps

### 1. Create a Stripe Account

1. Go to [stripe.com](https://stripe.com) and sign up
2. Complete your account setup
3. Enable **Test Mode** (toggle in the top right)

### 2. Get Your API Keys

1. Go to [Stripe Dashboard → Developers → API Keys](https://dashboard.stripe.com/test/apikeys)
2. Copy your **Publishable key** (starts with `pk_test_`)
3. Copy your **Secret key** (starts with `sk_test_`)

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
# Stripe Keys (REQUIRED)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51xxxxxxxxxxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_51xxxxxxxxxxxxxxxxxxxxx

# Email Configuration (OPTIONAL - for sending results)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=Logical Reasoning Test <noreply@logicaltest.com>

# App URL (REQUIRED)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Restart Your Development Server

```bash
npm run dev
```

## Testing the Payment Flow

### Test Card Numbers

Stripe provides test card numbers:

- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **3D Secure**: `4000 0027 6000 3184`

Use any:
- Future expiry date (e.g., 12/34)
- Any 3-digit CVC
- Any ZIP code

### Test the Flow

1. Fill out the registration form
2. Complete the test
3. Click "Proceed to Secure Checkout"
4. Use test card: `4242 4242 4242 4242`
5. Complete the payment

## Common Errors & Solutions

### ❌ "Stripe configuration error"

**Cause**: Missing or invalid Stripe API keys

**Solution**:
1. Check that `.env.local` exists and has your keys
2. Verify keys start with `pk_test_` and `sk_test_`
3. Make sure there are no spaces or quotes around the keys
4. Restart the dev server after changing `.env.local`

### ❌ "Payment system failed to load"

**Cause**: Invalid publishable key or key not loaded

**Solution**:
1. Check `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is set
2. Verify it starts with `pk_test_` (for test mode)
3. Make sure the variable name starts with `NEXT_PUBLIC_`
4. Clear browser cache and restart server

### ❌ "Invalid Stripe API key"

**Cause**: Wrong secret key or using live key in test mode

**Solution**:
1. Use test keys (start with `sk_test_` and `pk_test_`)
2. Don't use live keys (start with `sk_live_` and `pk_live_`)
3. Generate new keys if needed from Stripe Dashboard

### ❌ "App URL not configured"

**Cause**: Missing `NEXT_PUBLIC_APP_URL`

**Solution**:
Add to `.env.local`:
```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### ❌ Console shows "Error: No such price"

**Cause**: Using price IDs instead of price_data

**Solution**:
Our app creates prices dynamically. No action needed - this error shouldn't occur with our code.

## Setting Up Webhooks (Optional)

Webhooks allow Stripe to notify your app when payments complete.

### For Local Development

1. Install Stripe CLI:
   ```bash
   # macOS
   brew install stripe/stripe-cli/stripe

   # Windows
   scoop install stripe

   # Linux
   # Download from https://github.com/stripe/stripe-cli/releases
   ```

2. Login to Stripe CLI:
   ```bash
   stripe login
   ```

3. Forward webhooks to local server:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhook
   ```

4. Copy the webhook signing secret (starts with `whsec_`)

5. Add to `.env.local`:
   ```bash
   STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxx
   ```

6. Keep the `stripe listen` command running while testing

### For Production

1. Go to [Stripe Dashboard → Developers → Webhooks](https://dashboard.stripe.com/test/webhooks)
2. Click "Add endpoint"
3. Enter your URL: `https://yourdomain.com/api/webhook`
4. Select events: `checkout.session.completed`
5. Copy the signing secret
6. Add to your production environment variables

## Verifying Setup

### Check Environment Variables

Run this in your terminal:

```bash
# Check if .env.local exists
ls -la .env.local

# View the file (be careful not to share these!)
cat .env.local
```

### Check Console Logs

Open browser DevTools (F12) and check:
- **Console tab**: Any error messages?
- **Network tab**: Check the `/api/create-checkout-session` request
  - Status should be `200 OK`
  - Response should have `sessionId`

### Test the API Directly

You can test the API route directly:

```bash
curl -X POST http://localhost:3000/api/create-checkout-session \
  -H "Content-Type: application/json" \
  -d '{
    "userData": {
      "name": "Test User",
      "email": "test@example.com",
      "phone": "1234567890"
    },
    "testAnswers": [0,1,2,0,1,2,0,1,2,0,1,2,0,1,2],
    "timeElapsed": 600
  }'
```

Expected response:
```json
{
  "sessionId": "cs_test_xxxxxxxxxxxxxxxxxxxxx"
}
```

## Email Setup (Optional)

To send test results via email, you need SMTP credentials.

### Using Gmail

1. Enable 2-Factor Authentication on your Google account
2. Go to [Google Account → Security → App passwords](https://myaccount.google.com/apppasswords)
3. Generate an app password for "Mail"
4. Add to `.env.local`:
   ```bash
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASSWORD=your-16-digit-app-password
   EMAIL_FROM=Your Name <noreply@yourdomain.com>
   ```

### Using Other Services

- **SendGrid**: Use SMTP relay
- **Mailgun**: Get SMTP credentials
- **AWS SES**: Configure SMTP settings
- **Postmark**: Use SMTP integration

## Production Deployment

### Environment Variables on Vercel

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add all variables from `.env.local`
4. Redeploy your application

### Switching to Live Mode

1. Get live API keys from Stripe Dashboard (toggle off Test Mode)
2. Update environment variables:
   ```bash
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
   STRIPE_SECRET_KEY=sk_live_xxxxx
   ```
3. Set up production webhook endpoint
4. Update `NEXT_PUBLIC_APP_URL` to your production domain

### Security Checklist

- ✅ Never commit `.env.local` to git (already in `.gitignore`)
- ✅ Use environment variables for all secrets
- ✅ Enable HTTPS in production
- ✅ Verify webhook signatures
- ✅ Keep Stripe keys secure
- ✅ Use live keys only in production

## Need Help?

### Stripe Documentation
- [Testing](https://stripe.com/docs/testing)
- [Checkout](https://stripe.com/docs/payments/checkout)
- [Webhooks](https://stripe.com/docs/webhooks)

### Common Resources
- [Stripe Dashboard](https://dashboard.stripe.com)
- [API Logs](https://dashboard.stripe.com/test/logs) - See all API requests
- [Event Logs](https://dashboard.stripe.com/test/events) - See all events

### Debugging Tips

1. **Check Stripe Dashboard Logs**
   - Go to Developers → Logs
   - See all API requests and responses

2. **Enable Verbose Logging**
   - Check browser console
   - Check terminal/server logs
   - Look for detailed error messages

3. **Test in Isolation**
   - Test the API route directly with curl
   - Verify Stripe keys work in Stripe CLI
   - Try the official Stripe examples

## Quick Troubleshooting Checklist

- [ ] `.env.local` file exists in project root
- [ ] All required environment variables are set
- [ ] Development server restarted after changing `.env.local`
- [ ] Using test mode keys (start with `pk_test_` and `sk_test_`)
- [ ] Browser cache cleared
- [ ] Console shows no error messages
- [ ] Stripe Dashboard shows API requests
- [ ] Using valid test card number (4242 4242 4242 4242)

---

If you're still having issues, check the console logs for specific error messages and refer to the solutions above.
