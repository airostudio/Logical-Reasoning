'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Check, Clock, Brain, CheckCircle2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { testQuestions } from '@/lib/testQuestions'
import Image from 'next/image'

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-slate-900 font-bold text-lg">Logical Reasoning Test</h1>
                <p className="text-sm text-slate-600">Question {currentQuestion + 1} of {testQuestions.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-slate-700 bg-slate-100 px-4 py-2 rounded-lg">
                <Clock className="w-4 h-4" />
                <span className="font-mono font-semibold">{formatTime(timeElapsed)}</span>
              </div>
              <div className="text-right hidden sm:block">
                <div className="text-sm text-slate-600 mb-1">Progress</div>
                <div className="text-slate-900 font-bold">{answeredCount}/{testQuestions.length}</div>
              </div>
            </div>
          </div>
          {/* Progress Bar */}
          <div className="mt-4 bg-slate-200 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-600"
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Question Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden mb-6">
              {/* Question Type Badge */}
              <div className="bg-gradient-to-r from-slate-50 to-blue-50 px-6 py-4 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`px-4 py-2 rounded-xl text-sm font-bold shadow-sm ${
                      question.type === 'abstract'
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                        : 'bg-gradient-to-r from-orange-500 to-pink-600 text-white'
                    }`}>
                      {question.type === 'abstract' ? '🔷 Abstract Reasoning' : '🧠 Deductive Reasoning'}
                    </span>
                    <span className="text-slate-600 text-sm font-medium">
                      {question.type === 'abstract' ? 'Pattern Recognition' : 'Logical Deduction'}
                    </span>
                  </div>
                  {answers[currentQuestion] !== -1 && (
                    <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1.5 rounded-lg">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="text-sm font-semibold">Answered</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-8">
                {/* Question Text */}
                <h2 className="text-2xl font-bold text-slate-900 mb-8 leading-relaxed">
                  {question.question}
                </h2>

                {/* Visual Pattern for Abstract Questions */}
                {question.type === 'abstract' && question.imageUrl && (
                  <div className="mb-8 bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 border border-slate-200">
                    <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-white shadow-inner">
                      <Image
                        src={question.imageUrl}
                        alt="Pattern visualization"
                        fill
                        className="object-contain p-4"
                        priority
                      />
                    </div>
                  </div>
                )}

                {/* Options */}
                <div className="space-y-3">
                  {question.options.map((option, index) => {
                    const isSelected = selectedOption === index
                    const optionLetters = ['A', 'B', 'C', 'D']

                    return (
                      <motion.button
                        key={index}
                        onClick={() => handleOptionSelect(index)}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-300 ${
                          isSelected
                            ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-400 shadow-lg ring-2 ring-indigo-200'
                            : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-md'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm transition-all ${
                            isSelected
                              ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md'
                              : 'bg-slate-100 text-slate-700'
                          }`}>
                            {isSelected ? <Check className="w-5 h-5" /> : optionLetters[index]}
                          </div>
                          <span className={`text-lg font-medium leading-relaxed ${
                            isSelected ? 'text-slate-900' : 'text-slate-700'
                          }`}>
                            {option}
                          </span>
                        </div>
                      </motion.button>
                    )
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              currentQuestion === 0
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-white text-slate-700 hover:bg-slate-50 border-2 border-slate-200 hover:border-slate-300 shadow-sm'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          {currentQuestion === testQuestions.length - 1 ? (
            <motion.button
              onClick={handleFinish}
              disabled={answeredCount < testQuestions.length}
              whileHover={answeredCount === testQuestions.length ? { scale: 1.02 } : {}}
              whileTap={answeredCount === testQuestions.length ? { scale: 0.98 } : {}}
              className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-xl ${
                answeredCount === testQuestions.length
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-2xl'
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed'
              }`}
            >
              <Check className="w-5 h-5" />
              Complete Test
            </motion.button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg transition-all"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Question Grid */}
        <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 shadow-lg">
          <h3 className="text-slate-900 font-bold mb-4 text-lg">Question Navigation</h3>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {testQuestions.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentQuestion(index)
                  setSelectedOption(answers[index])
                }}
                className={`aspect-square rounded-lg font-bold text-sm transition-all ${
                  currentQuestion === index
                    ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg ring-2 ring-indigo-300 scale-110'
                    : answers[index] !== -1
                    ? 'bg-green-500 text-white border-2 border-green-400 hover:scale-105'
                    : 'bg-slate-100 text-slate-600 border-2 border-slate-200 hover:bg-slate-200 hover:scale-105'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded"></div>
              <span className="text-slate-600">Current</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-500 rounded"></div>
              <span className="text-slate-600">Answered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-slate-100 border-2 border-slate-200 rounded"></div>
              <span className="text-slate-600">Unanswered</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
