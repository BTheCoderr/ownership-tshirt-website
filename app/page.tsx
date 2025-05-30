'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import ProductCard from '@/components/ProductCard'
import Cart from '@/components/Cart'
import Footer from '@/components/Footer'
import SocialProof from '@/components/SocialProof'
import { motion } from 'framer-motion'
import { sendContactEmail } from '@/lib/email'

const products = [
  {
    id: 'black-tee',
    name: 'OWNERSHIP Tee - Black',
    price: 35,
    color: 'black' as const,
  },
  {
    id: 'white-tee',
    name: 'OWNERSHIP Tee - White',
    price: 35,
    color: 'white' as const,
  },
]

export default function Home() {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    })
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      const result = await sendContactEmail(contactForm.name, contactForm.email, contactForm.message)
      
      if (result.success) {
        setSubmitMessage('Thanks for reaching out! We\'ll get back to you soon.')
        setContactForm({ name: '', email: '', message: '' })
      } else {
        setSubmitMessage('Sorry, there was an error sending your message. Please try again.')
      }
    } catch (error) {
      console.error('Contact form error:', error)
      setSubmitMessage('Sorry, there was an error sending your message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      
      {/* Shop Section */}
      <section id="shop" className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-ownership-black mb-6">
              Collection
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Two exclusive designs that represent the mindset of ownership. 
              Choose your style and make it yours.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                color={product.color}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <SocialProof />

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-ownership-black mb-8">
            About OWNERSHIP
          </h2>
          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>
              More than just clothing, OWNERSHIP represents a mindset. It's about taking 
              control of your narrative, defining your style, and owning that shit.
            </p>
            <p>
              Each piece is crafted with intention, designed to remind you that true 
              style comes from within. When you wear OWNERSHIP, you're not just wearing 
              a t-shirt – you're making a statement about who you are and what you stand for.
            </p>
            <p className="text-xl font-semibold text-ownership-black">
              Define your style. Own that shit.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-ownership-black mb-6">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-600">
              Questions about our products? We'd love to hear from you.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-ownership-black mb-2">
                  Customer Service
                </h3>
                <p className="text-gray-600">
                  Monday - Friday: 9AM - 6PM EST
                </p>
                <p className="text-gray-600">
                  Saturday: 10AM - 4PM EST
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-ownership-black mb-2">
                  Email
                </h3>
                <p className="text-gray-600">
                  bferrell514@gmail.com
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-ownership-black mb-2">
                  Social
                </h3>
                <div className="flex space-x-4">
                  <a href="https://instagram.com/bthedream_" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-ownership-black transition-colors">
                    Instagram
                  </a>
                  <a href="https://twitter.com/bthedream_" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-ownership-black transition-colors">
                    Twitter
                  </a>
                  <a href="https://tiktok.com/@bthedream_" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-ownership-black transition-colors">
                    TikTok
                  </a>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <form className="space-y-6" onSubmit={handleContactSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-ownership-black mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={contactForm.name}
                  onChange={handleContactChange}
                  className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-ownership-black focus:border-transparent outline-none transition-all duration-200"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-ownership-black mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleContactChange}
                  className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-ownership-black focus:border-transparent outline-none transition-all duration-200"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-ownership-black mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={contactForm.message}
                  onChange={handleContactChange}
                  className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-ownership-black focus:border-transparent outline-none transition-all duration-200 resize-none"
                  placeholder="Your message..."
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-ownership-black text-white py-3 px-6 font-semibold hover:bg-gray-800 transition-colors duration-200"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              
              {submitMessage && (
                <div className={`text-center p-4 rounded ${
                  submitMessage.includes('Thanks') 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {submitMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      <Footer />
      <Cart />
    </main>
  )
} 