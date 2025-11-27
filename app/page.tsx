'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Brain, Zap, Target, CheckCircle, ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const [isHovered, setIsHovered] = useState(false)

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'Aptitude-Based Testing',
      description: 'Measure your innate ability to think logically and solve complex problems',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Predictive Validity',
      description: 'Proven correlation with workplace performance and critical thinking skills',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Multiple Question Types',
      description: 'Abstract reasoning patterns and deductive logic challenges',
      color: 'from-orange-500 to-yellow-500'
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: 'Standardized & Objective',
      description: 'Consistent, unbiased evaluation with instant professional results',
      color: 'from-green-500 to-emerald-500'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-purple-500/30 rounded-full blur-3xl top-0 left-0 animate-pulse-slow"></div>
        <div className="absolute w-96 h-96 bg-blue-500/30 rounded-full blur-3xl bottom-0 right-0 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute w-96 h-96 bg-pink-500/20 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full px-6 py-2 mb-8">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-purple-200">Limited Time Offer: 70% OFF!</span>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold mb-6 gradient-text">
              Unlock Your
              <br />
              Cognitive Potential
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Take our world-class logical reasoning test and discover your true problem-solving capabilities
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
              <div className="flex items-center gap-2">
                <div className="text-4xl font-bold text-white">$2.99</div>
                <div className="text-gray-400">
                  <div className="text-sm line-through">$9.99</div>
                  <div className="text-xs">One-time fee</div>
                </div>
              </div>
            </div>

            <Link href="/register">
              <motion.button
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-2xl hover:shadow-purple-500/50 transition-all duration-300"
              >
                Start Your Test Now
                <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
              </motion.button>
            </Link>

            <p className="text-sm text-gray-400 mt-4">
              ✓ Instant results via email  ✓ No subscription required  ✓ Professional assessment
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300"
              >
                <div className={`bg-gradient-to-br ${feature.color} w-16 h-16 rounded-xl flex items-center justify-center mb-4 text-white`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* What You'll Get Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-3xl p-8 md:p-12 mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-8 text-center">What You'll Get</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">15 Challenging Questions</h3>
                    <p className="text-gray-300 text-sm">Mix of abstract pattern recognition and deductive reasoning</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Detailed Score Report</h3>
                    <p className="text-gray-300 text-sm">Comprehensive analysis of your logical reasoning abilities</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Performance Benchmarks</h3>
                    <p className="text-gray-300 text-sm">See how you compare to other test-takers</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Instant Email Delivery</h3>
                    <p className="text-gray-300 text-sm">Results sent directly to your inbox after payment</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Exclusive Offers</h3>
                    <p className="text-gray-300 text-sm">Access to 20+ additional professional assessment tests</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Secure Payment</h3>
                    <p className="text-gray-300 text-sm">Protected by Stripe - industry-leading payment security</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Discover Your Logical Reasoning Score?
            </h2>
            <Link href="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-10 py-5 rounded-full text-xl font-semibold shadow-2xl hover:shadow-green-500/50 transition-all duration-300"
              >
                Begin Test - Only $2.99
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
