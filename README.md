# OWNERSHIP T-Shirt Website

A premium e-commerce website for OWNERSHIP brand t-shirts, built with Next.js 14, TypeScript, and Tailwind CSS.

![OWNERSHIP Website Preview](public/images/preview.png)

## 🚀 Features

- **Modern E-commerce Experience**
  - Shopping cart with Zustand state management
  - Complete checkout process with multi-step flow
  - Size selection with professional size guide
  - Product image gallery with front/back views

- **Professional Design**
  - Responsive design for all devices
  - Smooth animations with Framer Motion
  - Custom OWNERSHIP brand styling
  - Social proof and testimonials section

- **SEO Optimized**
  - Comprehensive meta tags and structured data
  - Google Analytics ready
  - Open Graph for social sharing
  - Performance optimized

- **User Experience**
  - Loading states and error handling
  - Contact forms and customer service info
  - Newsletter signup and social media integration
  - Accessible and user-friendly interface

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Netlify

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ownership-tshirt-website.git
   cd ownership-tshirt-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🌐 Deployment

### Netlify Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Connect to Netlify**
   - Push your code to GitHub
   - Connect your GitHub repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `out`

### Environment Variables

If you're using Google Analytics, create a `.env.local` file:
```
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

## 📁 Project Structure

```
ownership-tshirt-website/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── Cart.tsx          # Shopping cart
│   ├── Checkout.tsx      # Checkout process
│   ├── ProductCard.tsx   # Product display
│   ├── SizeGuide.tsx     # Size guide modal
│   └── SocialProof.tsx   # Customer testimonials
├── store/                # Zustand store
│   └── cart.ts          # Cart state management
├── public/               # Static assets
│   └── images/          # Product images
└── tailwind.config.js   # Tailwind configuration
```

## 🎨 Customization

### Brand Colors
The main brand color is defined in `tailwind.config.js`:
```js
colors: {
  'ownership-black': '#1a1a1a',
}
```

### Product Images
Add your product images to `public/images/`:
- `black-front.jpg` - Black shirt front view
- `black-back.jpg` - Black shirt back view
- `white-front.jpg` - White shirt front view
- `white-back.jpg` - White shirt back view

### Analytics
Replace `GA_MEASUREMENT_ID` in `app/layout.tsx` with your Google Analytics ID.

## 🛒 E-commerce Features

- **Product Catalog**: Displays black and white t-shirt variants
- **Size Selection**: XS through XXL with detailed size guide
- **Shopping Cart**: Add/remove items with quantity management
- **Checkout Process**: Multi-step checkout with shipping and payment forms
- **Order Confirmation**: Complete order summary and confirmation

## 📧 Contact & Support

For questions about this website or the OWNERSHIP brand:
- Email: hello@ownership-brand.com
- Website: [ownership-brand.com](https://ownership-brand.com)

## 📄 License

This project is proprietary software for OWNERSHIP brand.

---

**Built with ❤️ for the OWNERSHIP mindset** 