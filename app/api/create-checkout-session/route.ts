import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
})

export async function POST(req: NextRequest) {
  try {
    const { items, customerEmail } = await req.json()
    
    // Calculate total amount
    const amount = items.reduce((total: number, item: any) => total + (item.price * item.quantity), 0)
    
    // Create checkout session configuration
    const sessionConfig: any = {
      payment_method_types: ['card'],
      line_items: items.map((item: any) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            description: `OWNERSHIP T-Shirt - ${item.color} - Size: ${item.size || 'M'}`,
          },
          unit_amount: item.price * 100, // Convert to cents
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/?canceled=true`,
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'IT', 'ES', 'NL', 'BE'],
      },
      metadata: {
        order_source: 'ownership_website',
      },
    }

    // Only add customer_email if it's provided and valid
    if (customerEmail && customerEmail.trim() !== '') {
      sessionConfig.customer_email = customerEmail
    }
    
    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create(sessionConfig)

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    )
  }
} 