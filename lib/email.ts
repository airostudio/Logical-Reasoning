import nodemailer from 'nodemailer'

interface EmailData {
  name: string
  email: string
  phone: string
  results: {
    score: number
    percentage: number
    abstractScore: number
    deductiveScore: number
    level: string
    description: string
  }
  timeElapsed: number
}

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

const otherTestsOffers = [
  { name: 'Emotional Intelligence Assessment', price: '$4.99', discount: '50% OFF' },
  { name: 'Critical Thinking Test', price: '$3.99', discount: '60% OFF' },
  { name: 'Spatial Reasoning Challenge', price: '$2.99', discount: '70% OFF' },
  { name: 'Verbal Aptitude Exam', price: '$3.99', discount: '60% OFF' },
  { name: 'Numerical Reasoning Test', price: '$2.99', discount: '70% OFF' },
  { name: 'Problem-Solving Assessment', price: '$4.99', discount: '50% OFF' },
  { name: 'Creative Thinking Evaluation', price: '$3.99', discount: '60% OFF' },
  { name: 'Memory & Cognition Test', price: '$2.99', discount: '70% OFF' },
  { name: 'Decision Making Analysis', price: '$4.99', discount: '50% OFF' },
  { name: 'Pattern Recognition Advanced', price: '$3.99', discount: '60% OFF' },
  { name: 'Abstract Thinking Pro', price: '$4.99', discount: '50% OFF' },
  { name: 'Analytical Reasoning Suite', price: '$5.99', discount: '40% OFF' },
  { name: 'Leadership Potential Test', price: '$4.99', discount: '50% OFF' },
  { name: 'Personality Type Analysis', price: '$3.99', discount: '60% OFF' },
  { name: 'Career Aptitude Assessment', price: '$4.99', discount: '50% OFF' },
  { name: 'Communication Skills Evaluation', price: '$2.99', discount: '70% OFF' },
  { name: 'Time Management Test', price: '$3.99', discount: '60% OFF' },
  { name: 'Strategic Thinking Assessment', price: '$4.99', discount: '50% OFF' },
  { name: 'Innovation Mindset Test', price: '$3.99', discount: '60% OFF' },
  { name: 'Resilience & Adaptability Score', price: '$2.99', discount: '70% OFF' },
]

export async function sendResultsEmail(data: EmailData) {
  const { name, email, results, timeElapsed } = data

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}m ${secs}s`
  }

  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 90) return '#10B981' // green
    if (percentage >= 75) return '#3B82F6' // blue
    if (percentage >= 60) return '#F59E0B' // orange
    return '#EF4444' // red
  }

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Logical Reasoning Test Results</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px;">
  <table role="presentation" style="max-width: 600px; margin: 0 auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
    <!-- Header -->
    <tr>
      <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 32px; font-weight: bold;">🧠 Your Test Results</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Logical Reasoning Assessment</p>
      </td>
    </tr>

    <!-- Greeting -->
    <tr>
      <td style="padding: 30px;">
        <h2 style="color: #1f2937; margin: 0 0 15px 0; font-size: 24px;">Hello ${name}! 👋</h2>
        <p style="color: #6b7280; margin: 0; font-size: 16px; line-height: 1.6;">
          Congratulations on completing the Logical Reasoning Test! Here's your comprehensive performance analysis:
        </p>
      </td>
    </tr>

    <!-- Overall Score -->
    <tr>
      <td style="padding: 0 30px 30px 30px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 15px; padding: 30px; text-align: center; color: white;">
          <p style="margin: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; opacity: 0.9;">Overall Score</p>
          <div style="font-size: 64px; font-weight: bold; margin: 10px 0;">${results.percentage}%</div>
          <p style="margin: 0; font-size: 18px;">${results.score} out of 15 correct</p>
          <div style="background: rgba(255,255,255,0.2); height: 8px; border-radius: 4px; margin: 20px 0 10px 0; overflow: hidden;">
            <div style="background: white; height: 100%; width: ${results.percentage}%; border-radius: 4px;"></div>
          </div>
          <p style="margin: 10px 0 0 0; font-size: 20px; font-weight: bold;">Performance: ${results.level}</p>
        </div>
      </td>
    </tr>

    <!-- Performance Breakdown -->
    <tr>
      <td style="padding: 0 30px 30px 30px;">
        <h3 style="color: #1f2937; margin: 0 0 20px 0; font-size: 20px;">📊 Performance Breakdown</h3>

        <!-- Abstract Reasoning -->
        <div style="background: #f3f4f6; border-radius: 12px; padding: 20px; margin-bottom: 15px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <span style="color: #1f2937; font-weight: 600; font-size: 16px;">🔷 Abstract Reasoning</span>
            <span style="color: #6b7280; font-weight: bold; font-size: 18px;">${results.abstractScore}%</span>
          </div>
          <div style="background: #e5e7eb; height: 8px; border-radius: 4px; overflow: hidden;">
            <div style="background: linear-gradient(90deg, #06b6d4, #3b82f6); height: 100%; width: ${results.abstractScore}%; border-radius: 4px;"></div>
          </div>
        </div>

        <!-- Deductive Reasoning -->
        <div style="background: #f3f4f6; border-radius: 12px; padding: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <span style="color: #1f2937; font-weight: 600; font-size: 16px;">🧠 Deductive Reasoning</span>
            <span style="color: #6b7280; font-weight: bold; font-size: 18px;">${results.deductiveScore}%</span>
          </div>
          <div style="background: #e5e7eb; height: 8px; border-radius: 4px; overflow: hidden;">
            <div style="background: linear-gradient(90deg, #f97316, #ef4444); height: 100%; width: ${results.deductiveScore}%; border-radius: 4px;"></div>
          </div>
        </div>
      </td>
    </tr>

    <!-- Analysis -->
    <tr>
      <td style="padding: 0 30px 30px 30px;">
        <div style="background: #eff6ff; border-left: 4px solid #3b82f6; border-radius: 8px; padding: 20px;">
          <h4 style="color: #1e40af; margin: 0 0 10px 0; font-size: 16px;">💡 Expert Analysis</h4>
          <p style="color: #1f2937; margin: 0; font-size: 15px; line-height: 1.6;">
            ${results.description}
          </p>
        </div>
      </td>
    </tr>

    <!-- Test Stats -->
    <tr>
      <td style="padding: 0 30px 30px 30px;">
        <h3 style="color: #1f2937; margin: 0 0 15px 0; font-size: 20px;">⏱️ Test Statistics</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
          <div style="background: #f9fafb; border-radius: 10px; padding: 15px; text-align: center; border: 1px solid #e5e7eb;">
            <p style="color: #6b7280; margin: 0; font-size: 14px;">Time Taken</p>
            <p style="color: #1f2937; margin: 5px 0 0 0; font-size: 20px; font-weight: bold;">${formatTime(timeElapsed)}</p>
          </div>
          <div style="background: #f9fafb; border-radius: 10px; padding: 15px; text-align: center; border: 1px solid #e5e7eb;">
            <p style="color: #6b7280; margin: 0; font-size: 14px;">Questions</p>
            <p style="color: #1f2937; margin: 5px 0 0 0; font-size: 20px; font-weight: bold;">15 Total</p>
          </div>
        </div>
      </td>
    </tr>

    <!-- Divider -->
    <tr>
      <td style="padding: 0 30px;">
        <div style="height: 1px; background: linear-gradient(90deg, transparent, #e5e7eb, transparent);"></div>
      </td>
    </tr>

    <!-- Other Tests Offer -->
    <tr>
      <td style="padding: 30px;">
        <h3 style="color: #1f2937; margin: 0 0 10px 0; font-size: 22px; text-align: center;">🎁 Exclusive Offers Just For You!</h3>
        <p style="color: #6b7280; margin: 0 0 25px 0; font-size: 15px; text-align: center;">
          Continue your journey of self-discovery with these professional assessments:
        </p>

        <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 15px; padding: 25px; margin-bottom: 20px; border: 2px solid #fbbf24;">
          <p style="color: #92400e; margin: 0; font-size: 16px; font-weight: bold; text-align: center;">⚡ LIMITED TIME: All tests up to 70% OFF! ⚡</p>
        </div>

        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          ${otherTestsOffers.slice(0, 10).map((test, index) => `
            <tr>
              <td style="padding: 12px 0; ${index < 9 ? 'border-bottom: 1px solid #f3f4f6;' : ''}">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div style="flex: 1;">
                    <p style="margin: 0; color: #1f2937; font-size: 15px; font-weight: 600;">${test.name}</p>
                  </div>
                  <div style="text-align: right;">
                    <span style="background: #dc2626; color: white; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: bold; margin-right: 8px;">${test.discount}</span>
                    <span style="color: #059669; font-weight: bold; font-size: 16px;">${test.price}</span>
                  </div>
                </div>
              </td>
            </tr>
          `).join('')}
        </table>

        <div style="text-align: center; margin-top: 25px;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; padding: 15px 40px; border-radius: 10px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);">
            View All 20 Tests →
          </a>
        </div>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="padding: 30px; background: #f9fafb; text-align: center; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; margin: 0 0 10px 0; font-size: 14px;">
          Thank you for choosing our Logical Reasoning Test!
        </p>
        <p style="color: #9ca3af; margin: 0; font-size: 12px;">
          Questions? Reply to this email or visit our support page.
        </p>
        <div style="margin-top: 20px;">
          <p style="color: #9ca3af; margin: 0; font-size: 11px;">
            © ${new Date().getFullYear()} Logical Reasoning Test. All rights reserved.
          </p>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>
  `

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: `🎉 Your Logical Reasoning Test Results - ${results.level} Performance!`,
    html: htmlContent,
  }

  await transporter.sendMail(mailOptions)
}
