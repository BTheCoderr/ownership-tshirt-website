import { loadStripe, Stripe } from '@stripe/stripe-js'

// Replace with your actual Stripe publishable key
const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_...'

let stripePromise: Promise<Stripe | null>

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(stripePublishableKey)
  }
  return stripePromise
}

export interface PaymentData {
  amount: number // in cents
  currency: string
  orderId: string
  customerEmail: string
  customerName: string
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
}

export const createPaymentIntent = async (paymentData: PaymentData) => {
  try {
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    })

    if (!response.ok) {
      throw new Error('Failed to create payment intent')
    }

    const { clientSecret } = await response.json()
    return { clientSecret, error: null }
  } catch (error) {
    console.error('Error creating payment intent:', error)
    return { clientSecret: null, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export const processPayment = async (
  stripe: Stripe,
  clientSecret: string,
  paymentMethodId: string
) => {
  try {
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethodId,
    })

    if (error) {
      return { success: false, error: error.message }
    }

    if (paymentIntent.status === 'succeeded') {
      return { success: true, paymentIntent }
    }

    return { success: false, error: 'Payment failed' }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
} 