'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, CreditCard, Lock } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { getStripe, createPaymentIntent } from '@/lib/stripe'
import { sendOrderNotification } from '@/lib/email'
import { orderManager } from '@/lib/orders'

interface CheckoutProps {
  isOpen: boolean
  onClose: () => void
}

export default function Checkout({ isOpen, onClose }: CheckoutProps) {
  const { items, total, clearCart } = useCartStore()
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details')
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)
  const [paymentError, setPaymentError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    cardName: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('payment')
  }

  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    setPaymentError(null)
    
    try {
      // Create order ID
      const newOrderId = `ORD-${Date.now()}`
      setOrderId(newOrderId)

      // For now, simulate successful payment
      // In production, you'd integrate with Stripe Elements here
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Create order in our system
      const order = orderManager.createOrder({
        orderId: newOrderId,
        status: 'pending',
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
        },
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          color: item.color,
        })),
        total: total,
        paymentIntentId: 'mock_payment_intent', // Replace with real payment intent ID
      })

      // Send email notifications
      await sendOrderNotification({
        orderId: newOrderId,
        customerName: `${formData.firstName} ${formData.lastName}`,
        customerEmail: formData.email,
        items: items,
        total: total,
        shippingAddress: `${formData.address}, ${formData.city}, ${formData.postalCode}, ${formData.country}`,
        timestamp: new Date().toISOString(),
      })

      setStep('success')
      
      // Clear cart after successful order
      setTimeout(() => {
        clearCart()
      }, 3000)
      
    } catch (error) {
      console.error('Payment processing failed:', error)
      setPaymentError('Payment failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const renderDetails = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-ownership-black">Shipping Details</h2>
      
      <form onSubmit={handleSubmitDetails} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-ownership-black mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-ownership-black focus:border-transparent outline-none transition-all duration-200"
            placeholder="you@example.com"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-ownership-black mb-2">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-ownership-black focus:border-transparent outline-none transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ownership-black mb-2">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-ownership-black focus:border-transparent outline-none transition-all duration-200"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-ownership-black mb-2">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-ownership-black focus:border-transparent outline-none transition-all duration-200"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-ownership-black mb-2">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-ownership-black focus:border-transparent outline-none transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ownership-black mb-2">
              Postal Code
            </label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-ownership-black focus:border-transparent outline-none transition-all duration-200"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-ownership-black mb-2">
            Country
          </label>
          <select
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-ownership-black focus:border-transparent outline-none transition-all duration-200"
          >
            <option value="">Select Country</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="UK">United Kingdom</option>
            <option value="AU">Australia</option>
          </select>
        </div>
        
        <button
          type="submit"
          className="w-full bg-ownership-black text-white py-3 px-6 font-semibold hover:bg-gray-800 transition-colors duration-200"
        >
          Continue to Payment
        </button>
      </form>
    </div>
  )

  const renderPayment = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setStep('details')}
          className="p-2 hover:bg-gray-100 transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h2 className="text-2xl font-bold text-ownership-black">Payment</h2>
      </div>
      
      <form onSubmit={handleSubmitPayment} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-ownership-black mb-2">
            Card Number
          </label>
          <div className="relative">
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              required
              placeholder="1234 5678 9012 3456"
              className="w-full px-4 py-3 pl-12 border border-gray-300 focus:ring-2 focus:ring-ownership-black focus:border-transparent outline-none transition-all duration-200"
            />
            <CreditCard className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-ownership-black mb-2">
              Expiry Date
            </label>
            <input
              type="text"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleInputChange}
              required
              placeholder="MM/YY"
              className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-ownership-black focus:border-transparent outline-none transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ownership-black mb-2">
              CVC
            </label>
            <input
              type="text"
              name="cvc"
              value={formData.cvc}
              onChange={handleInputChange}
              required
              placeholder="123"
              className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-ownership-black focus:border-transparent outline-none transition-all duration-200"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-ownership-black mb-2">
            Cardholder Name
          </label>
          <input
            type="text"
            name="cardName"
            value={formData.cardName}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-ownership-black focus:border-transparent outline-none transition-all duration-200"
          />
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-4 rounded">
          <Lock className="h-4 w-4" />
          <span>Your payment information is secure and encrypted</span>
        </div>
        
        <button
          type="submit"
          disabled={isProcessing}
          className="w-full bg-ownership-black text-white py-3 px-6 font-semibold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isProcessing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
        </button>
      </form>
    </div>
  )

  const renderSuccess = () => (
    <div className="text-center space-y-6">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      <h2 className="text-2xl font-bold text-ownership-black">Order Confirmed!</h2>
      <p className="text-gray-600">
        Thank you for your purchase. You'll receive a confirmation email shortly.
      </p>
      
      <div className="bg-gray-50 p-4 rounded">
        <p className="text-sm text-gray-600">
          Order Total: <span className="font-semibold">${total.toFixed(2)}</span>
        </p>
      </div>
    </div>
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Checkout Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                {/* Order Summary */}
                {step !== 'success' && (
                  <div className="mb-6 p-4 bg-gray-50 rounded">
                    <h3 className="font-semibold text-ownership-black mb-2">Order Summary</h3>
                    <div className="space-y-2 text-sm">
                      {items.map((item) => (
                        <div key={item.id} className="flex justify-between">
                          <span>{item.name} × {item.quantity}</span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                      <div className="border-t pt-2 font-semibold flex justify-between">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Step Content */}
                {step === 'details' && renderDetails()}
                {step === 'payment' && renderPayment()}
                {step === 'success' && renderSuccess()}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
} 