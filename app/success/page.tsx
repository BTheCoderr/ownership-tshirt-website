'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle, Package, Mail } from 'lucide-react'
import Link from 'next/link'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [orderDetails, setOrderDetails] = useState<any>(null)

  useEffect(() => {
    if (sessionId) {
      // In a real app, you'd fetch order details from your backend
      // For now, we'll show a generic success message
      setOrderDetails({
        id: sessionId,
        email: 'customer@example.com' // This would come from your API
      })
    }
  }, [sessionId])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-12 h-12 text-green-600" />
        </motion.div>

        <h1 className="text-3xl font-bold text-ownership-black mb-4">
          Order Successful! 🎉
        </h1>
        
        <p className="text-gray-600 mb-6">
          Thank you for your OWNERSHIP purchase! Your order has been confirmed and we'll send you tracking information soon.
        </p>

        {sessionId && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500 mb-1">Order ID</p>
            <p className="font-mono text-sm text-ownership-black break-all">
              {sessionId}
            </p>
          </div>
        )}

        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-center space-x-3">
            <Package className="w-5 h-5 text-blue-500" />
            <span className="text-sm text-gray-600">Processing your order</span>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <Mail className="w-5 h-5 text-green-500" />
            <span className="text-sm text-gray-600">Confirmation email sent</span>
          </div>
        </div>

        <div className="space-y-3">
          <Link 
            href="/"
            className="block w-full bg-ownership-black text-white py-3 px-6 font-semibold hover:bg-gray-800 transition-colors duration-200"
          >
            Continue Shopping
          </Link>
          <Link 
            href="/admin"
            className="block w-full bg-gray-100 text-ownership-black py-3 px-6 font-semibold hover:bg-gray-200 transition-colors duration-200"
          >
            Track Your Order
          </Link>
        </div>

        <p className="text-xs text-gray-500 mt-6">
          Questions? Contact us at bferrell514@gmail.com
        </p>
      </motion.div>
    </div>
  )
} 