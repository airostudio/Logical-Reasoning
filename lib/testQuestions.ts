export interface Question {
  id: number
  type: 'abstract' | 'deductive'
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  // For abstract questions
  pattern?: {
    shapes: string[]
    colors: string[]
    sequence: string
  }
}

export const testQuestions: Question[] = [
  // Abstract Reasoning Questions (Pattern Recognition)
  {
    id: 1,
    type: 'abstract',
    question: 'Study the pattern below. Which shape comes next in the sequence?',
    pattern: {
      shapes: ['circle', 'square', 'triangle', 'circle', 'square'],
      colors: ['blue', 'red', 'green', 'blue', 'red'],
      sequence: 'repeating-pattern'
    },
    options: ['Triangle (Green)', 'Circle (Blue)', 'Square (Red)', 'Pentagon (Yellow)'],
    correctAnswer: 0,
    explanation: 'The pattern repeats: circle-square-triangle with colors blue-red-green. Next should be triangle in green.'
  },
  {
    id: 2,
    type: 'abstract',
    question: 'Which shape completes the pattern? The number of sides increases by 1 each time.',
    pattern: {
      shapes: ['triangle', 'square', 'pentagon', 'hexagon'],
      colors: ['purple', 'purple', 'purple', 'purple'],
      sequence: 'increasing-sides'
    },
    options: ['Octagon', 'Heptagon (7 sides)', 'Circle', 'Pentagon'],
    correctAnswer: 1,
    explanation: 'The pattern shows shapes with increasing sides: 3, 4, 5, 6. Next is 7 sides (heptagon).'
  },
  {
    id: 3,
    type: 'abstract',
    question: 'The shapes rotate 45° clockwise each step. Which comes next?',
    pattern: {
      shapes: ['arrow-up', 'arrow-right', 'arrow-down', 'arrow-left'],
      colors: ['orange', 'orange', 'orange', 'orange'],
      sequence: 'rotation'
    },
    options: ['Arrow Up', 'Arrow Down', 'Arrow Right', 'Arrow Left'],
    correctAnswer: 0,
    explanation: 'After 4 rotations of 90°, the arrow completes a full circle and points up again.'
  },
  {
    id: 4,
    type: 'abstract',
    question: 'The pattern shows shapes doubling in quantity. What comes next?',
    pattern: {
      shapes: ['1-dot', '2-dots', '4-dots', '8-dots'],
      colors: ['cyan', 'cyan', 'cyan', 'cyan'],
      sequence: 'doubling'
    },
    options: ['12 dots', '16 dots', '10 dots', '8 dots'],
    correctAnswer: 1,
    explanation: 'Each step doubles: 1, 2, 4, 8. Next is 8 × 2 = 16 dots.'
  },
  {
    id: 5,
    type: 'abstract',
    question: 'Shapes alternate between filled and outlined, while size increases. What\'s next?',
    pattern: {
      shapes: ['small-filled-circle', 'medium-outline-circle', 'large-filled-circle'],
      colors: ['pink', 'pink', 'pink'],
      sequence: 'alternating-fill-size'
    },
    options: ['Extra Large Filled Circle', 'Extra Large Outline Circle', 'Small Filled Circle', 'Medium Outline Circle'],
    correctAnswer: 1,
    explanation: 'Alternates filled/outline (next is outline) and size increases (next is extra large).'
  },
  {
    id: 6,
    type: 'abstract',
    question: 'Colors shift through the rainbow spectrum. Which color comes next?',
    pattern: {
      shapes: ['circle', 'circle', 'circle', 'circle', 'circle'],
      colors: ['red', 'orange', 'yellow', 'green', 'blue'],
      sequence: 'color-spectrum'
    },
    options: ['Purple', 'Indigo', 'Red', 'Pink'],
    correctAnswer: 1,
    explanation: 'Following the rainbow spectrum: red, orange, yellow, green, blue, indigo, violet.'
  },

  // Deductive Reasoning Questions
  {
    id: 7,
    type: 'deductive',
    question: 'All managers are employees. Sarah is a manager. Therefore:',
    options: [
      'Sarah is an employee',
      'Sarah is not an employee',
      'All employees are managers',
      'Some employees are not managers'
    ],
    correctAnswer: 0,
    explanation: 'If all managers are employees and Sarah is a manager, then Sarah must be an employee.'
  },
  {
    id: 8,
    type: 'deductive',
    question: 'If it rains, the ground gets wet. The ground is wet. Therefore:',
    options: [
      'It definitely rained',
      'It might have rained, but there could be other causes',
      'It did not rain',
      'The ground is always wet'
    ],
    correctAnswer: 1,
    explanation: 'The ground being wet doesn\'t prove it rained (could be sprinklers, etc.). This is affirming the consequent fallacy.'
  },
  {
    id: 9,
    type: 'deductive',
    question: 'No cats are dogs. All dogs are mammals. Therefore:',
    options: [
      'No cats are mammals',
      'Some mammals are not cats',
      'All mammals are dogs',
      'No mammals are cats'
    ],
    correctAnswer: 1,
    explanation: 'Since all dogs are mammals and dogs exist, at least some mammals (dogs) are not cats.'
  },
  {
    id: 10,
    type: 'deductive',
    question: 'Either John went to the store or he went home. John did not go to the store. Therefore:',
    options: [
      'John might be at home',
      'John went home',
      'John went to both places',
      'John went nowhere'
    ],
    correctAnswer: 1,
    explanation: 'This is a valid disjunctive syllogism: if it\'s A or B, and not A, then it must be B.'
  },
  {
    id: 11,
    type: 'deductive',
    question: 'If you study hard, you will pass the exam. Maria passed the exam. Therefore:',
    options: [
      'Maria studied hard',
      'Maria might have studied hard, or she might be naturally talented',
      'Maria did not study hard',
      'Everyone who passes studied hard'
    ],
    correctAnswer: 1,
    explanation: 'Passing doesn\'t prove studying hard (affirming the consequent). There could be other reasons for passing.'
  },
  {
    id: 12,
    type: 'deductive',
    question: 'All birds have feathers. Penguins are birds. Therefore:',
    options: [
      'Penguins can fly',
      'Penguins have feathers',
      'All feathered animals are birds',
      'Penguins are not birds'
    ],
    correctAnswer: 1,
    explanation: 'Valid deductive reasoning: if all birds have feathers and penguins are birds, penguins must have feathers.'
  },
  {
    id: 13,
    type: 'deductive',
    question: 'If a number is divisible by 10, it is divisible by 5. The number 30 is divisible by 10. Therefore:',
    options: [
      '30 is divisible by 5',
      '30 is not divisible by 5',
      'All numbers divisible by 5 are divisible by 10',
      '30 is divisible by 3 only'
    ],
    correctAnswer: 0,
    explanation: 'Valid deductive reasoning: 30 is divisible by 10, therefore it must be divisible by 5.'
  },
  {
    id: 14,
    type: 'deductive',
    question: 'Some teachers are strict. Ms. Johnson is a teacher. Therefore:',
    options: [
      'Ms. Johnson is strict',
      'Ms. Johnson might or might not be strict',
      'Ms. Johnson is not strict',
      'All teachers are strict'
    ],
    correctAnswer: 1,
    explanation: 'We can\'t determine if Ms. Johnson is strict just because some teachers are. Invalid conclusion.'
  },
  {
    id: 15,
    type: 'deductive',
    question: 'All squares are rectangles. All rectangles have four sides. Therefore:',
    options: [
      'All four-sided shapes are squares',
      'All squares have four sides',
      'No rectangles are squares',
      'Some squares don\'t have four sides'
    ],
    correctAnswer: 1,
    explanation: 'Valid chain reasoning: squares → rectangles → four sides, therefore squares have four sides.'
  }
]

export function calculateScore(answers: number[]): {
  score: number
  percentage: number
  abstractScore: number
  deductiveScore: number
  level: string
  description: string
} {
  let correct = 0
  let abstractCorrect = 0
  let deductiveCorrect = 0
  let abstractTotal = 0
  let deductiveTotal = 0

  answers.forEach((answer, index) => {
    const question = testQuestions[index]
    if (answer === question.correctAnswer) {
      correct++
      if (question.type === 'abstract') {
        abstractCorrect++
      } else {
        deductiveCorrect++
      }
    }
    if (question.type === 'abstract') {
      abstractTotal++
    } else {
      deductiveTotal++
    }
  })

  const percentage = Math.round((correct / testQuestions.length) * 100)
  const abstractScore = Math.round((abstractCorrect / abstractTotal) * 100)
  const deductiveScore = Math.round((deductiveCorrect / deductiveTotal) * 100)

  let level = ''
  let description = ''

  if (percentage >= 90) {
    level = 'Exceptional'
    description = 'Outstanding logical reasoning abilities. You demonstrate superior pattern recognition and deductive thinking skills.'
  } else if (percentage >= 75) {
    level = 'Advanced'
    description = 'Strong logical reasoning abilities. You excel at identifying patterns and drawing valid conclusions.'
  } else if (percentage >= 60) {
    level = 'Proficient'
    description = 'Good logical reasoning abilities. You can effectively solve most logical problems with consistent accuracy.'
  } else if (percentage >= 45) {
    level = 'Developing'
    description: 'Moderate logical reasoning abilities. With practice, you can improve your pattern recognition and deductive skills.'
  } else {
    level = 'Emerging'
    description = 'Basic logical reasoning abilities. Focus on developing fundamental pattern recognition and logical thinking skills.'
  }

  return {
    score: correct,
    percentage,
    abstractScore,
    deductiveScore,
    level,
    description
  }
}
