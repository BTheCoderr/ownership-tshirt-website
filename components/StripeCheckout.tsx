'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, CreditCard, ArrowRight } from 'lucide-react'
import { useCartStore } from '@/store/cart'

interface StripeCheckoutProps {
  isOpen: boolean
  onClose: () => void
}

export default function StripeCheckout({ isOpen, onClose }: StripeCheckoutProps) {
  const { items, total, clearCart } = useCartStore()
  const [isLoading, setIsLoading] = useState(false)
  const [customerEmail, setCustomerEmail] = useState('')

  const handleCheckout = async () => {
    if (items.length === 0) return

    setIsLoading(true)

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map(item => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            color: item.color,
            size: item.size,
          })),
          customerEmail: customerEmail.trim() || undefined,
        }),
      })

      const { url, error } = await response.json()

      if (error) {
        console.error('Checkout error:', error)
        alert('Error creating checkout session. Please try again.')
        return
      }

      // Redirect to Stripe Checkout
      window.location.href = url
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Error creating checkout session. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-ownership-black">Checkout</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Order Summary */}
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-3">Order Summary</h3>
          <div className="space-y-2">
            {items.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span>
                  {item.name} ({item.color}, {item.size}) x{item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-2 mt-3">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Email Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address (optional)
          </label>
          <input
            type="email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ownership-black focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">
            We'll send your order confirmation to this email
          </p>
        </div>

        {/* Checkout Button */}
        <button
          onClick={handleCheckout}
          disabled={isLoading || items.length === 0}
          className="w-full bg-ownership-black text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="h-5 w-5" />
              Proceed to Payment
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          You'll be redirected to Stripe's secure checkout page
        </p>
      </motion.div>
    </div>
  )
} 