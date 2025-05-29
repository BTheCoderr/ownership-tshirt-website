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

          {/* Visual - Alternative Abstract Design */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="relative w-80 h-96">
              {/* Main geometric shape */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-ownership-black to-gray-800 transform rotate-12 rounded-2xl"
                animate={{ rotate: [12, 15, 12] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Secondary shape */}
              <motion.div
                className="absolute top-8 left-8 w-32 h-32 bg-white/10 rounded-full"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Text overlay */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="text-center text-white">
                  <motion.div 
                    className="text-6xl font-bold mb-2"
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    O
                  </motion.div>
                  <div className="text-sm tracking-wider">
                    OWNERSHIP
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-6 h-6 bg-ownership-black rounded-full"
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-4 h-4 bg-ownership-black rounded-full"
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 