'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CreditCard, Lock, CheckCircle, Zap, Mail } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function Payment() {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    const data = sessionStorage.getItem('userData')
    const answers = sessionStorage.getItem('testAnswers')

    if (!data || !answers) {
      router.push('/register')
      return
    }

    setUserData(JSON.parse(data))
  }, [router])

  const handlePayment = async () => {
    setIsProcessing(true)

    try {
      const testAnswers = sessionStorage.getItem('testAnswers')
      const timeElapsed = sessionStorage.getItem('timeElapsed')

      // Create checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userData,
          testAnswers: JSON.parse(testAnswers!),
          timeElapsed: parseInt(timeElapsed || '0')
        }),
      })

      const { sessionId } = await response.json()

      // Redirect to Stripe Checkout
      const stripe = await stripePromise
      const { error } = await stripe!.redirectToCheckout({ sessionId })

      if (error) {
        console.error('Error:', error)
        alert('Payment failed. Please try again.')
        setIsProcessing(false)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred. Please try again.')
      setIsProcessing(false)
    }
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl top-0 left-0 animate-pulse-slow"></div>
        <div className="absolute w-96 h-96 bg-pink-500/20 rounded-full blur-3xl bottom-0 right-0 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Main Card */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-20 h-20 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle className="w-10 h-10 text-white" />
              </motion.div>
              <h1 className="text-3xl font-bold text-white mb-2">Test Completed!</h1>
              <p className="text-purple-100">Unlock your results for just $2.99</p>
            </div>

            {/* Content */}
            <div className="p-8">
              {/* User Info */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
                <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-purple-400" />
                  Results will be sent to:
                </h2>
                <div className="space-y-2 text-gray-300">
                  <p><span className="font-medium text-white">Name:</span> {userData.name}</p>
                  <p><span className="font-medium text-white">Email:</span> {userData.email}</p>
                  <p><span className="font-medium text-white">Phone:</span> {userData.phone}</p>
                </div>
              </div>

              {/* What You Get */}
              <div className="mb-8">
                <h3 className="text-white font-semibold mb-4">What You'll Receive:</h3>
                <div className="space-y-3">
                  {[
                    'Detailed score report with percentile ranking',
                    'Performance breakdown by question type',
                    'Personalized cognitive assessment',
                    'Access to 20+ additional professional tests',
                    'Instant delivery to your email'
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <Zap className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 border-green-500/30 rounded-2xl p-6 mb-6 text-center">
                <div className="flex items-center justify-center gap-4 mb-2">
                  <span className="text-5xl font-bold text-white">$2.99</span>
                  <div className="text-left">
                    <div className="text-gray-400 line-through text-xl">$9.99</div>
                    <div className="text-green-400 font-semibold">Save 70%!</div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">One-time payment • No subscription • Instant access</p>
              </div>

              {/* Payment Button */}
              <motion.button
                onClick={handlePayment}
                disabled={isProcessing}
                whileHover={!isProcessing ? { scale: 1.02 } : {}}
                whileTap={!isProcessing ? { scale: 0.98 } : {}}
                className={`w-full py-5 rounded-xl font-bold text-lg shadow-2xl transition-all ${
                  isProcessing
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-purple-500/50'
                } text-white flex items-center justify-center gap-3`}
              >
                {isProcessing ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-6 h-6" />
                    Proceed to Secure Checkout
                  </>
                )}
              </motion.button>

              {/* Security Badge */}
              <div className="flex items-center justify-center gap-2 mt-6 text-gray-400 text-sm">
                <Lock className="w-4 h-4" />
                <span>Secured by Stripe • SSL Encrypted</span>
              </div>

              {/* Money Back Guarantee */}
              <div className="mt-6 text-center">
                <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 rounded-full px-4 py-2">
                  <CheckCircle className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-blue-300">30-Day Money-Back Guarantee</span>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-6 text-center text-gray-400 text-sm">
            <p>✓ Trusted by 10,000+ test-takers worldwide</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
