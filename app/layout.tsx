import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ErrorBoundary from '@/components/ErrorBoundary'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'OWNERSHIP - Premium T-Shirts | Own Your Style',
  description: 'Premium quality t-shirts that represent the ownership mindset. Express your individuality with OWNERSHIP brand clothing. Free shipping on orders over $50.',
  keywords: 'premium t-shirts, ownership mindset, clothing brand, fashion, black t-shirts, white t-shirts',
  authors: [{ name: 'OWNERSHIP Brand' }],
  creator: 'OWNERSHIP',
  publisher: 'OWNERSHIP',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ownership-brand.com',
    title: 'OWNERSHIP - Premium T-Shirts | Own Your Style',
    description: 'Premium quality t-shirts that represent the ownership mindset. Express your individuality with OWNERSHIP brand clothing.',
    siteName: 'OWNERSHIP',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'OWNERSHIP Premium T-Shirts',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OWNERSHIP - Premium T-Shirts | Own Your Style',
    description: 'Premium quality t-shirts that represent the ownership mindset.',
    images: ['/images/twitter-image.jpg'],
    creator: '@ownership_brand',
  },
  alternates: {
    canonical: 'https://ownership-brand.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `,
        }} />
        
        {/* Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "OWNERSHIP",
            "url": "https://ownership-brand.com",
            "logo": "https://ownership-brand.com/images/logo.png",
            "description": "Premium t-shirts that represent the ownership mindset",
            "sameAs": [
              "https://instagram.com/ownership_brand",
              "https://twitter.com/ownership_brand"
            ]
          })
        }} />
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "OWNERSHIP Premium T-Shirt",
            "description": "Premium quality t-shirt representing the ownership mindset",
            "brand": {
              "@type": "Brand",
              "name": "OWNERSHIP"
            },
            "offers": {
              "@type": "Offer",
              "price": "35",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock"
            }
          })
        }} />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  )
} 