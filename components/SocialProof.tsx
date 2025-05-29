'use client'

import { motion } from 'framer-motion'
import { Star, Users, Package } from 'lucide-react'

export default function SocialProof() {
  const stats = [
    {
      icon: Users,
      number: '25+',
      label: 'Happy Customers'
    },
    {
      icon: Package,
      number: '50+',
      label: 'Orders Shipped'
    },
    {
      icon: Star,
      number: '5.0',
      label: 'Average Rating'
    }
  ]

  const testimonials = [
    {
      name: 'Marcus Johnson',
      text: 'Quality is unmatched. The shirt fits perfectly and the message resonates.',
      rating: 5
    },
    {
      name: 'Sarah Chen',
      text: 'Love the design! Gets compliments everywhere I go. True ownership mentality.',
      rating: 5
    },
    {
      name: 'David Rodriguez',
      text: 'Comfortable, well-made, and represents everything I stand for.',
      rating: 5
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-ownership-black rounded-full mb-4">
                <stat.icon className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-ownership-black mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-ownership-black mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands who've embraced the ownership mindset with our premium tees.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className="bg-white p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "{testimonial.text}"
              </p>
              <div className="font-semibold text-ownership-black">
                {testimonial.name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 