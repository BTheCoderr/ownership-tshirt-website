'use client'

import { motion } from 'framer-motion'

export default function Hero() {
  const scrollToShop = () => {
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              <span className="ownership-gradient">OWNERSHIP</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 italic mb-6 leading-relaxed">
              : the state, relation, or fact of being an owner
            </p>
            
            <p className="text-lg md:text-xl text-gray-700 mb-10 leading-relaxed">
              Define your style. Own that shit.
            </p>
            
            <motion.button
              onClick={scrollToShop}
              className="bg-ownership-black text-white px-8 py-4 font-semibold text-lg border-2 border-ownership-black transition-all duration-300 hover:bg-transparent hover:text-ownership-black transform hover:-translate-y-1 hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Shop Collection
            </motion.button>
          </motion.div>

          {/* Visual */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="relative">
              {/* T-shirt Shape */}
              <motion.div
                className="w-80 h-96 bg-ownership-black t-shirt-shape flex items-center justify-center relative overflow-hidden"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* OWNERSHIP Text on Shirt */}
                <div className="text-center text-white">
                  <div className="text-3xl font-bold mb-2 tracking-wider">
                    OWNERSHIP
                  </div>
                  <div className="text-sm italic opacity-90">
                    : the state, relation, or fact<br />of being an owner
                  </div>
                </div>
                
                {/* Subtle overlay pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-white/10 pointer-events-none" />
              </motion.div>
              
              {/* Decorative elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 bg-ownership-black rounded-full opacity-20"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-ownership-black rounded-full opacity-30"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 