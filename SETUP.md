# Setup Guide for OWNERSHIP T-Shirt Website

## ✅ Checkout Button Fix

The checkout button has been fixed! It now uses the built-in checkout modal instead of requiring Stripe API keys immediately.

## 🔧 Environment Variables Setup

To enable full Stripe checkout functionality, you need to set up the following environment variables in your `.env.local` file:

### 1. Stripe Configuration

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Create an account or sign in
3. Go to Developers → API keys
4. Copy your publishable key and secret key
5. Update `.env.local`:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_publishable_key
STRIPE_SECRET_KEY=sk_test_your_actual_secret_key
```

### 2. EmailJS Configuration (Optional)

For email notifications to work:

1. Go to [EmailJS](https://www.emailjs.com/)
2. Create an account
3. Set up a Gmail service
4. Create an email template
5. Get your Service ID, Template ID, and User ID
6. Update `.env.local`:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_USER_ID=your_user_id
```

## 🚀 Current Status

- ✅ Checkout button works (uses built-in modal)
- ✅ Cart functionality works
- ✅ Product display works
- ⚠️ Stripe checkout requires API keys
- ⚠️ Email notifications require EmailJS setup

## 🎯 Next Steps

1. **For Testing**: The current setup works fine for testing the UI
2. **For Production**: Set up Stripe and EmailJS environment variables
3. **For Real Payments**: Replace test keys with live keys

## 🛠 Development

```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run start  # Start production server
```

The website should now be running at `http://localhost:3000` 