'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useCartStore } from '@/store/cart'
import { Spinner } from './Loading'
import SizeGuide from './SizeGuide'

interface ProductCardProps {
  id: string
  name: string
  price: number
  color: 'black' | 'white'
}

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export default function ProductCard({ id, name, price, color }: ProductCardProps) {
  const [currentView, setCurrentView] = useState<'front' | 'back'>('front')
  const [selectedSize, setSelectedSize] = useState<string>('M')
  const [isLoading, setIsLoading] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [showSizeGuide, setShowSizeGuide] = useState(false)
  const { addItem, openCart } = useCartStore()

  const handleAddToCart = async () => {
    setIsLoading(true)
    
    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 800))
    
    addItem({
      id: `${id}-${selectedSize}`,
      name: `${name} - ${selectedSize}`,
      price,
      color
    })
    
    // Open cart briefly to show item was added
    openCart()
    setTimeout(() => {
      setIsLoading(false)
    }, 200)
  }

  const CircularText = () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg viewBox="0 0 200 200" className="w-44 h-44 animate-rotate">
        <defs>
          <path
            id={`circle-${color}`}
            d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0"
          />
        </defs>
        <text
          fontSize="14"
          fill={color === 'black' ? 'white' : 'black'}
          className="font-medium"
          letterSpacing="2"
        >
          <textPath href={`#circle-${color}`} startOffset="0%">
            own · that · shit | \o-ner-ship
          </textPath>
        </text>
      </svg>
    </div>
  )

  const DesignFallback = () => (
    <div className={`absolute inset-0 t-shirt-shape ${
      color === 'black' 
        ? 'bg-ownership-black' 
        : 'bg-white border border-gray-300'
    } flex items-center justify-center`}>
      {currentView === 'front' ? (
        <div className="text-center p-8">
          <div className={`text-2xl font-bold mb-3 tracking-wider ${
            color === 'black' ? 'text-white' : 'text-ownership-black'
          }`}>
            OWNERSHIP
          </div>
          <div className={`text-sm italic leading-relaxed ${
            color === 'black' ? 'text-white/90' : 'text-ownership-black/90'
          }`}>
            : the state, relation, or fact<br />of being an owner
          </div>
        </div>
      ) : (
        <CircularText />
      )}
    </div>
  )

  // Image paths for actual product photos
  const imagePath = `/images/${color}-${currentView}.jpg`

  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Product Image Area */}
      <div className="relative h-96 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {!imageError ? (
              <Image
                src={imagePath}
                alt={`${name} - ${currentView} view`}
                fill
                className="object-cover"
                onError={() => setImageError(true)}
                onLoad={() => setImageError(false)}
              />
            ) : (
              <DesignFallback />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-ownership-black">
          {name}
        </h3>
        <p className="text-2xl font-bold text-gray-700 mb-4">
          ${price}
        </p>

        {/* View Toggle */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setCurrentView('front')}
            className={`flex-1 py-2 px-4 font-medium transition-all duration-200 ${
              currentView === 'front'
                ? 'bg-ownership-black text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Front
          </button>
          <button
            onClick={() => setCurrentView('back')}
            className={`flex-1 py-2 px-4 font-medium transition-all duration-200 ${
              currentView === 'back'
                ? 'bg-ownership-black text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Back
          </button>
        </div>

        {/* Size Selection */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-ownership-black">
              Size: {selectedSize}
            </label>
            <button
              onClick={() => setShowSizeGuide(true)}
              className="text-sm text-ownership-black hover:underline"
            >
              Size Guide
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`py-2 px-3 text-sm font-medium transition-all duration-200 ${
                  selectedSize === size
                    ? 'bg-ownership-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Add to Cart Button */}
        <motion.button
          onClick={handleAddToCart}
          disabled={isLoading}
          className="w-full bg-ownership-black text-white py-3 px-6 font-semibold transition-all duration-300 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1 flex items-center justify-center gap-2"
          whileHover={{ scale: isLoading ? 1 : 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isLoading ? (
            <>
              <Spinner size="sm" />
              Adding...
            </>
          ) : (
            'Add to Cart'
          )}
        </motion.button>
      </div>

      {/* Size Guide Modal */}
      <SizeGuide isOpen={showSizeGuide} onClose={() => setShowSizeGuide(false)} />
    </motion.div>
  )
} 