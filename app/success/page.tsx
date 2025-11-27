'use client'

import { useEffect, useState, Suspense } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Mail, Sparkles, ArrowRight, Gift } from 'lucide-react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'

function SuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    const userData = sessionStorage.getItem('userData')
    if (userData) {
      const data = JSON.parse(userData)
      setEmail(data.email)
    }

    // Clear session storage
    sessionStorage.removeItem('userData')
    sessionStorage.removeItem('testAnswers')
    sessionStorage.removeItem('timeElapsed')

    // Hide confetti after 3 seconds
    setTimeout(() => setShowConfetti(false), 3000)
  }, [])

  const otherTests = [
    {
      name: 'Emotional Intelligence Assessment',
      price: '$4.99',
      description: 'Discover your EQ and interpersonal skills',
      color: 'from-pink-500 to-rose-500'
    },
    {
      name: 'Critical Thinking Test',
      price: '$3.99',
      description: 'Evaluate your analytical and problem-solving abilities',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Creative Thinking Evaluation',
      price: '$3.99',
      description: 'Measure your innovation and creative potential',
      color: 'from-purple-500 to-indigo-500'
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute w-96 h-96 bg-green-500/20 rounded-full blur-3xl top-0 right-0 animate-pulse-slow"></div>
        <div className="absolute w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl bottom-0 left-0 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{
                top: '-10%',
                left: `${Math.random() * 100}%`,
                opacity: 1
              }}
              animate={{
                top: '110%',
                opacity: 0
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                delay: Math.random() * 0.5,
                ease: 'linear'
              }}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: ['#10B981', '#3B82F6', '#F59E0B', '#EC4899', '#8B5CF6'][Math.floor(Math.random() * 5)]
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          {/* Success Card */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl mb-8">
            {/* Icon */}
            <div className="text-center pt-12 pb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mb-6 shadow-2xl"
              >
                <CheckCircle className="w-12 h-12 text-white" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl font-bold text-white mb-4"
              >
                Payment Successful! 🎉
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-300 mb-2"
              >
                Thank you for your purchase!
              </motion.p>
            </div>

            {/* Email Notice */}
            <div className="px-8 pb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-2xl p-6 mb-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-500/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-blue-300" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-2 text-lg">Check Your Inbox!</h3>
                    <p className="text-gray-300 text-sm mb-3">
                      Your detailed test results are being sent to:
                    </p>
                    <p className="text-white font-mono bg-white/10 rounded-lg px-4 py-2 break-all">
                      {email}
                    </p>
                    <p className="text-gray-400 text-xs mt-3">
                      💡 Don't see it? Check your spam folder or wait a few minutes.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* What's Included */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h3 className="text-white font-semibold mb-4 text-lg">📧 What's in Your Email:</h3>
                <div className="space-y-3">
                  {[
                    'Your overall logical reasoning score',
                    'Performance breakdown by question type',
                    'Personalized cognitive assessment',
                    'Exclusive offers for 20+ professional tests'
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-6 h-6 bg-green-500/30 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      </div>
                      <span className="text-gray-300">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Other Tests Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 mb-8"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full px-4 py-2 mb-4">
                <Gift className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-300 text-sm font-semibold">EXCLUSIVE OFFER</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Continue Your Journey</h2>
              <p className="text-gray-300">Explore more professional assessments at special prices</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {otherTests.map((test, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all cursor-pointer"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${test.color} rounded-xl flex items-center justify-center mb-4`}>
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{test.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{test.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-white">{test.price}</span>
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-gray-400 text-sm mb-4">+ 17 more professional assessments available</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-purple-500/50 transition-all"
              >
                View All Tests
              </motion.button>
            </div>
          </motion.div>

          {/* Return Home */}
          <div className="text-center">
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white/10 backdrop-blur-lg border border-white/20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition-all"
              >
                Return to Home
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default function Success() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}
