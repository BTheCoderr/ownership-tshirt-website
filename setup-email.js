#!/usr/bin/env node

console.log('🚀 OWNERSHIP Email Setup Guide')
console.log('================================\n')

console.log('1. Add these environment variables to your .env.local file:\n')
console.log('STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here')
console.log('STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here')
console.log('STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here')
console.log('RESEND_API_KEY=re_YiLVjkF8_BhZ7DXUv1SVdB938CUNQzG1u\n')

console.log('2. Set up Stripe Webhook:')
console.log('   - Go to Stripe Dashboard > Developers > Webhooks')
console.log('   - Add endpoint: https://yourdomain.com/api/webhook')
console.log('   - Select event: checkout.session.completed')
console.log('   - Copy the webhook secret to STRIPE_WEBHOOK_SECRET\n')

console.log('3. Test the setup:')
console.log('   - Make a test purchase')
console.log('   - Check bferrell514@gmail.com for order notification')
console.log('   - Check customer email for confirmation\n')

console.log('4. Optional: Add your domain to Resend for better deliverability')
console.log('   - Go to Resend Dashboard > Domains')
console.log('   - Add and verify your domain')
console.log('   - Update the "from" email in app/api/webhook/route.ts\n')

console.log('✅ Setup complete! Your checkout will now send email confirmations.') 