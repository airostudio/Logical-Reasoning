import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-10-28.acacia',
})

export async function POST(req: NextRequest) {
  try {
    // Validate environment variables
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('STRIPE_SECRET_KEY is not set')
      return NextResponse.json(
        { error: 'Stripe configuration error. Please set STRIPE_SECRET_KEY environment variable.' },
        { status: 500 }
      )
    }

    if (!process.env.NEXT_PUBLIC_APP_URL) {
      console.error('NEXT_PUBLIC_APP_URL is not set')
      return NextResponse.json(
        { error: 'App URL not configured. Please set NEXT_PUBLIC_APP_URL environment variable.' },
        { status: 500 }
      )
    }

    const { userData, testAnswers, timeElapsed } = await req.json()

    // Validate request data
    if (!userData || !userData.email || !userData.name) {
      return NextResponse.json(
        { error: 'Invalid user data' },
        { status: 400 }
      )
    }

    console.log('Creating checkout session for:', userData.email)

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Logical Reasoning Test Results',
              description: 'Complete analysis of your logical reasoning abilities',
              images: ['https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400'],
            },
            unit_amount: 299, // $2.99 in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment`,
      metadata: {
        userName: userData.name,
        userEmail: userData.email,
        userPhone: userData.phone,
        testAnswers: JSON.stringify(testAnswers),
        timeElapsed: timeElapsed.toString(),
      },
      customer_email: userData.email,
    })

    console.log('Checkout session created:', session.id)

    return NextResponse.json({ sessionId: session.id })
  } catch (error: any) {
    console.error('Error creating checkout session:', error)

    // Provide more specific error messages
    if (error.type === 'StripeInvalidRequestError') {
      return NextResponse.json(
        { error: `Stripe configuration error: ${error.message}` },
        { status: 400 }
      )
    }

    if (error.type === 'StripeAuthenticationError') {
      return NextResponse.json(
        { error: 'Invalid Stripe API key. Please check your STRIPE_SECRET_KEY.' },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { error: error.message || 'Error creating checkout session' },
      { status: 500 }
    )
  }
}
