'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Check, Clock, Brain } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { testQuestions } from '@/lib/testQuestions'
import ShapeRenderer from '@/components/ShapeRenderer'

export default function Test() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>(new Array(testQuestions.length).fill(-1))
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number>(-1)

  useEffect(() => {
    // Check if user has registered
    const userData = sessionStorage.getItem('userData')
    if (!userData) {
      router.push('/register')
      return
    }

    // Set initial selected option if answer exists
    setSelectedOption(answers[currentQuestion])

    // Timer
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [currentQuestion, router])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex)
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = optionIndex
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < testQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
      setSelectedOption(answers[currentQuestion + 1])
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
      setSelectedOption(answers[currentQuestion - 1])
    }
  }

  const handleFinish = () => {
    // Store answers and navigate to payment
    sessionStorage.setItem('testAnswers', JSON.stringify(answers))
    sessionStorage.setItem('timeElapsed', timeElapsed.toString())
    router.push('/payment')
  }

  const answeredCount = answers.filter(a => a !== -1).length
  const progress = (answeredCount / testQuestions.length) * 100
  const question = testQuestions[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-lg border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-white font-semibold">Logical Reasoning Test</h1>
                <p className="text-sm text-gray-300">Question {currentQuestion + 1} of {testQuestions.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-gray-300">
                <Clock className="w-5 h-5" />
                <span className="font-mono">{formatTime(timeElapsed)}</span>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-300">Progress</div>
                <div className="text-white font-semibold">{answeredCount}/{testQuestions.length}</div>
              </div>
            </div>
          </div>
          {/* Progress Bar */}
          <div className="mt-4 bg-white/10 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl"
          >
            {/* Question Type Badge */}
            <div className="flex items-center gap-3 mb-6">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                question.type === 'abstract'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                  : 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
              }`}>
                {question.type === 'abstract' ? '🔷 Abstract Reasoning' : '🧠 Deductive Reasoning'}
              </span>
              <span className="text-gray-400 text-sm">
                {question.type === 'abstract' ? 'Pattern Recognition' : 'Logical Deduction'}
              </span>
            </div>

            {/* Question */}
            <h2 className="text-2xl font-bold text-white mb-8">
              {question.question}
            </h2>

            {/* Visual Pattern for Abstract Questions */}
            {question.type === 'abstract' && question.pattern && (
              <div className="mb-8">
                <ShapeRenderer
                  shapes={question.pattern.shapes}
                  colors={question.pattern.colors}
                  size="large"
                />
              </div>
            )}

            {/* Options */}
            <div className="space-y-4">
              {question.options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-300 ${
                    selectedOption === index
                      ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 border-purple-400 shadow-lg shadow-purple-500/30'
                      : 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      selectedOption === index
                        ? 'bg-purple-500 border-purple-400'
                        : 'border-gray-400'
                    }`}>
                      {selectedOption === index && <Check className="w-5 h-5 text-white" />}
                    </div>
                    <span className="text-lg text-white font-medium">{option}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              currentQuestion === 0
                ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          {currentQuestion === testQuestions.length - 1 ? (
            <motion.button
              onClick={handleFinish}
              disabled={answeredCount < testQuestions.length}
              whileHover={answeredCount === testQuestions.length ? { scale: 1.05 } : {}}
              whileTap={answeredCount === testQuestions.length ? { scale: 0.95 } : {}}
              className={`flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all shadow-xl ${
                answeredCount === testQuestions.length
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-green-500/50'
                  : 'bg-gray-600 text-gray-300 cursor-not-allowed'
              }`}
            >
              <Check className="w-5 h-5" />
              Finish Test
            </motion.button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/50 transition-all"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Question Grid */}
        <div className="mt-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-4">Question Overview</h3>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
            {testQuestions.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentQuestion(index)
                  setSelectedOption(answers[index])
                }}
                className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                  currentQuestion === index
                    ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg'
                    : answers[index] !== -1
                    ? 'bg-green-500/50 text-white border border-green-400'
                    : 'bg-white/10 text-gray-400 border border-white/20 hover:bg-white/20'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
