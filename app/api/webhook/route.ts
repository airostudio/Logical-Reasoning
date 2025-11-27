import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { sendResultsEmail } from '@/lib/email'
import { testQuestions, calculateScore } from '@/lib/testQuestions'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 })
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    try {
      // Extract metadata
      const { userName, userEmail, userPhone, testAnswers, timeElapsed } = session.metadata!

      // Calculate scores
      const answers = JSON.parse(testAnswers)
      const results = calculateScore(answers)

      // Send results email
      await sendResultsEmail({
        name: userName,
        email: userEmail,
        phone: userPhone,
        results,
        timeElapsed: parseInt(timeElapsed),
      })

      console.log('Results email sent successfully to:', userEmail)
    } catch (error) {
      console.error('Error processing payment webhook:', error)
      return NextResponse.json({ error: 'Error processing webhook' }, { status: 500 })
    }
  }

  return NextResponse.json({ received: true })
}
