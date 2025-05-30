'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, Trash2 } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import Checkout from './Checkout'

export default function Cart() {
  const { items, isOpen, total, closeCart, updateQuantity, removeItem } = useCartStore()
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  const handleCheckout = () => {
    setIsCheckoutOpen(true)
    closeCart()
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeCart}
            />

            {/* Cart Sidebar */}
            <motion.div
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-2xl font-bold text-ownership-black">Your Cart</h2>
                <button
                  onClick={closeCart}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {items.length === 0 ? (
                  <div className="text-center text-gray-500 mt-8">
                    <p className="text-lg">Your cart is empty</p>
                    <p className="text-sm mt-2">Add some items to get started!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        className="bg-gray-50 rounded-lg p-4"
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-ownership-black">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-600 capitalize">
                              {item.color}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:bg-gray-200 rounded"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="font-semibold min-w-[2rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:bg-gray-200 rounded"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="font-semibold text-lg">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="border-t p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-semibold">Total:</span>
                    <span className="text-2xl font-bold text-ownership-black">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                  <motion.button
                    onClick={async () => {
                      if (items.length === 0) return
                      
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
                            })),
                            customerEmail: '', // You can collect this or leave empty for Stripe to collect
                          }),
                        })
                        
                        const { url } = await response.json()
                        if (url) {
                          window.location.href = url
                        }
                      } catch (error) {
                        console.error('Error creating checkout session:', error)
                      }
                    }}
                    disabled={items.length === 0}
                    className="w-full bg-ownership-black text-white py-4 px-6 font-semibold hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: items.length > 0 ? 1.02 : 1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {items.length === 0 ? 'Cart is Empty' : `Checkout - $${total.toFixed(2)}`}
                  </motion.button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Checkout Component */}
      <Checkout 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
      />
    </>
  )
} 