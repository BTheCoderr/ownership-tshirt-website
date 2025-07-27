import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
})

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const limit = parseInt(searchParams.get('limit') || '100')
    const startingAfter = searchParams.get('starting_after')

    const sessions = await stripe.checkout.sessions.list({
      limit,
      starting_after: startingAfter || undefined,
      expand: ['data.line_items', 'data.customer_details'],
    })

    // Filter only completed sessions and format them
    const orders = sessions.data
      .filter(session => session.payment_status === 'paid')
      .map(session => ({
        id: session.id,
        orderId: session.id,
        customer: {
          firstName: session.customer_details?.name?.split(' ')[0] || 'Unknown',
          lastName: session.customer_details?.name?.split(' ').slice(1).join(' ') || '',
          email: session.customer_details?.email || '',
        },
        items: session.line_items?.data.map(item => ({
          id: item.id,
          name: item.description || 'OWNERSHIP T-Shirt',
          quantity: item.quantity || 1,
          price: (item.amount_total || 0) / 100,
        })) || [],
        total: (session.amount_total || 0) / 100,
        status: 'pending', // Default status, you can update this based on your business logic
        createdAt: new Date(session.created * 1000).toISOString(),
        shippingAddress: session.customer_details?.address ? {
          line1: session.customer_details.address.line1,
          line2: session.customer_details.address.line2,
          city: session.customer_details.address.city,
          state: session.customer_details.address.state,
          postalCode: session.customer_details.address.postal_code,
          country: session.customer_details.address.country,
        } : null,
        metadata: session.metadata,
      }))

    return NextResponse.json({
      orders,
      hasMore: sessions.has_more,
      nextCursor: sessions.data[sessions.data.length - 1]?.id,
    })
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
} 