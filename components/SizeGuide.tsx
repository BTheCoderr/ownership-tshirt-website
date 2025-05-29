'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Ruler } from 'lucide-react'

interface SizeGuideProps {
  isOpen: boolean
  onClose: () => void
}

export default function SizeGuide({ isOpen, onClose }: SizeGuideProps) {
  const sizeData = [
    { size: 'XS', chest: '31-34', length: '27', sleeve: '8' },
    { size: 'S', chest: '34-37', length: '28', sleeve: '8.25' },
    { size: 'M', chest: '38-41', length: '29', sleeve: '8.5' },
    { size: 'L', chest: '42-45', length: '30', sleeve: '8.75' },
    { size: 'XL', chest: '46-49', length: '31', sleeve: '9' },
    { size: 'XXL', chest: '50-53', length: '32', sleeve: '9.25' },
  ]

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

          {/* Size Guide Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Ruler className="h-6 w-6 text-ownership-black" />
                    <h2 className="text-2xl font-bold text-ownership-black">Size Guide</h2>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Size Chart */}
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b-2 border-ownership-black">
                        <th className="text-left py-3 px-4 font-semibold">Size</th>
                        <th className="text-left py-3 px-4 font-semibold">Chest (inches)</th>
                        <th className="text-left py-3 px-4 font-semibold">Length (inches)</th>
                        <th className="text-left py-3 px-4 font-semibold">Sleeve (inches)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sizeData.map((row, index) => (
                        <tr
                          key={row.size}
                          className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                        >
                          <td className="py-3 px-4 font-semibold">{row.size}</td>
                          <td className="py-3 px-4">{row.chest}</td>
                          <td className="py-3 px-4">{row.length}</td>
                          <td className="py-3 px-4">{row.sleeve}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Measuring Instructions */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-ownership-black mb-3">How to Measure:</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li><strong>Chest:</strong> Measure around the fullest part of your chest</li>
                    <li><strong>Length:</strong> From the highest point of the shoulder to the bottom hem</li>
                    <li><strong>Sleeve:</strong> From the shoulder seam to the sleeve opening</li>
                  </ul>
                </div>

                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">
                    All measurements are approximate. For the best fit, we recommend comparing with a similar shirt you own.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
} 