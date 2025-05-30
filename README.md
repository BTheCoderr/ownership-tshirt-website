# OWNERSHIP T-Shirt Website

A premium e-commerce website for OWNERSHIP brand t-shirts built with Next.js 15, TypeScript, and modern web technologies.

## 🎯 Features

### ✅ **E-commerce Functionality**
- **Product Catalog** - Black and White OWNERSHIP t-shirts with real product photos
- **Size Selection** - XS, S, M, L, XL, XXL with size guide
- **Shopping Cart** - Add/remove items with quantity management
- **Stripe Checkout** - Secure payment processing with Stripe's prebuilt checkout
- **Order Management** - Complete order tracking and management system
- **Admin Dashboard** - Order statistics, management, and CSV export

### ✅ **Email Integration**
- **EmailJS Integration** - Contact form and order notifications
- **Automated Emails** - Order confirmations to customers and business owner
- **Contact Form** - Direct communication with customers

### ✅ **Modern UI/UX**
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Smooth Animations** - Framer Motion for enhanced user experience
- **Professional Design** - Clean, modern interface
- **Loading States** - User feedback during operations
- **Error Handling** - Graceful error boundaries and validation

### ✅ **SEO & Performance**
- **Next.js 15** - Latest React framework with App Router
- **TypeScript** - Type-safe development
- **SEO Optimized** - Meta tags, structured data, sitemap
- **Fast Loading** - Optimized images and performance

## 🛠 Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **State Management:** Zustand
- **Payment Processing:** Stripe
- **Email Service:** EmailJS
- **Deployment:** Netlify
- **Version Control:** Git/GitHub

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Stripe account
- EmailJS account

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/BTheCoderr/ownership-tshirt-website.git
cd ownership-tshirt-website
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env.local` file in the root directory:
```env
# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_USER_ID=your_user_id

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
STRIPE_SECRET_KEY=sk_test_your_secret_key
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to `http://localhost:3000`

## 📧 EmailJS Setup

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Set up a Gmail service
3. Create an email template with variables: `{{from_name}}`, `{{reply_to}}`, `{{subject}}`, `{{message}}`
4. Get your Service ID, Template ID, and User ID
5. Update your `.env.local` file

## 💳 Stripe Setup

1. Create an account at [Stripe](https://stripe.com/)
2. Get your API keys from the dashboard
3. For testing, use test keys (`pk_test_` and `sk_test_`)
4. For production, use live keys (`pk_live_` and `sk_live_`)
5. Update your `.env.local` file

## 🌐 Deployment

### Netlify Deployment

1. **Build the project**
```bash
npm run build
```

2. **Deploy to Netlify**
- Connect your GitHub repository to Netlify
- Set build command: `npm run build`
- Set publish directory: `out`
- Add environment variables in Netlify dashboard

### Environment Variables for Production
Make sure to add these in your Netlify dashboard:
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` 
- `NEXT_PUBLIC_EMAILJS_USER_ID`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`

## 📱 Features Walkthrough

### Product Catalog
- View OWNERSHIP t-shirts in black and white
- Switch between front and back views
- Select sizes with size guide reference
- Add items to shopping cart

### Shopping Experience
- Persistent shopping cart with Zustand
- Secure checkout with Stripe
- Order confirmations via email
- Professional success page

### Admin Dashboard
- View order statistics and revenue
- Manage orders and update status
- Export orders to CSV
- Track customer information

### Contact & Support
- Contact form with EmailJS integration
- Automated email responses
- Business contact information
- Social media links

## 🎨 Brand Identity

**OWNERSHIP** represents the mindset of taking control and owning your decisions. The brand features:

- **Logo:** Bold "OWNERSHIP" typography
- **Tagline:** "Own that shit"
- **Colors:** Primarily black and white for timeless appeal
- **Message:** Empowerment and personal responsibility

## 🛡 Security & Privacy

- **Secure Payments:** All transactions processed through Stripe
- **Data Protection:** Customer information encrypted and secure
- **SSL/HTTPS:** Secure communication protocols
- **Environment Variables:** Sensitive keys stored securely

## 📊 Analytics & Tracking

- Order management system with statistics
- Revenue tracking and reporting
- Customer analytics
- Performance monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support or inquiries:
- **Email:** bferrell514@gmail.com
- **Instagram:** [@bthedream_](https://instagram.com/bthedream_)
- **Twitter:** [@bthedream_](https://twitter.com/bthedream_)
- **TikTok:** [@bthedream_](https://tiktok.com/@bthedream_)

## 📄 License

This project is proprietary and owned by OWNERSHIP brand.

## 🎉 Acknowledgments

Built with modern web technologies and best practices for optimal performance and user experience.

---

**Own that shit.** 💪 