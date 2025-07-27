# Email Setup Guide

## Environment Variables Required

Add these to your `.env.local` file:

```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Resend Email Configuration
RESEND_API_KEY=re_YiLVjkF8_BhZ7DXUv1SVdB938CUNQzG1u
```

## Stripe Webhook Setup

1. Go to your Stripe Dashboard
2. Navigate to Developers > Webhooks
3. Click "Add endpoint"
4. Set the endpoint URL to: `https://yourdomain.com/api/webhook`
5. Select the event: `checkout.session.completed`
6. Copy the webhook signing secret and add it to `STRIPE_WEBHOOK_SECRET`

## Resend Domain Setup

1. Go to your Resend Dashboard
2. Add and verify your domain (e.g., `yourdomain.com`)
3. Update the `from` email in the webhook handler to use your verified domain:
   - Change `onboarding@resend.dev` to your actual verified domain in `app/api/webhook/route.ts`

## Testing

1. Make a test purchase
2. Check your email (bferrell514@gmail.com) for the order notification
3. Check the customer's email for the confirmation

## Troubleshooting

- Check the browser console and server logs for errors
- Verify all environment variables are set correctly
- Ensure your domain is verified in Resend
- Test the webhook endpoint manually if needed 