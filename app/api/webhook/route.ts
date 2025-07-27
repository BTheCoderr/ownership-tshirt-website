import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { Resend } from 'resend'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
})

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session
        
        // Extract order details from the session
        const customerEmail = session.customer_details?.email
        const customerName = session.customer_details?.name || 'Customer'
        const shippingAddress = session.customer_details?.address
        const lineItems = session.line_items?.data || []
        
        if (!customerEmail) {
          console.error('No customer email found in session')
          return NextResponse.json({ error: 'No customer email' }, { status: 400 })
        }

        // Calculate total
        const total = session.amount_total ? session.amount_total / 100 : 0
        
        // Format items for email
        const items = lineItems.map(item => ({
          name: item.description || 'OWNERSHIP T-Shirt',
          quantity: item.quantity || 1,
          price: (item.amount_total || 0) / 100
        }))

        // Send email to business owner
        if (!resend) {
          console.error('Resend API key not configured')
          return NextResponse.json({ error: 'Email service not configured' }, { status: 500 })
        }
        
        await resend.emails.send({
          from: 'OWNERSHIP Store <onboarding@resend.dev>',
          to: 'bferrell514@gmail.com',
          subject: `New Order #${session.id}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #000; text-align: center;">🎉 NEW ORDER RECEIVED!</h1>
              
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h2>Order Details</h2>
                <p><strong>Order ID:</strong> ${session.id}</p>
                <p><strong>Customer:</strong> ${customerName}</p>
                <p><strong>Email:</strong> ${customerEmail}</p>
                <p><strong>Total:</strong> $${total.toFixed(2)}</p>
              </div>

              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3>Items:</h3>
                ${items.map(item => `
                  <p>• ${item.name} x${item.quantity} - $${item.price.toFixed(2)}</p>
                `).join('')}
              </div>

              ${shippingAddress ? `
                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3>Shipping Address:</h3>
                  <p>${shippingAddress.line1 || ''}</p>
                  ${shippingAddress.line2 ? `<p>${shippingAddress.line2}</p>` : ''}
                  <p>${shippingAddress.city || ''}, ${shippingAddress.state || ''} ${shippingAddress.postal_code || ''}</p>
                  <p>${shippingAddress.country || ''}</p>
                </div>
              ` : ''}

              <p style="color: #666; font-size: 14px;">
                Order Time: ${new Date().toLocaleString()}
              </p>
              
              <p style="text-align: center; margin-top: 30px;">
                <a href="/admin" style="background: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
                  View in Admin Panel
                </a>
              </p>
            </div>
          `
        })

        // Send confirmation email to customer
        await resend.emails.send({
          from: 'OWNERSHIP <onboarding@resend.dev>',
          to: customerEmail,
          subject: `Order Confirmation #${session.id}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #000; text-align: center;">Thank you for your order! 🔥</h1>
              
              <p style="font-size: 18px; text-align: center; margin: 20px 0;">
                Hi ${customerName},
              </p>
              
              <p style="font-size: 16px; text-align: center; margin: 20px 0;">
                Your OWNERSHIP order has been confirmed and is being processed!
              </p>

              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h2>Order Details</h2>
                <p><strong>Order ID:</strong> ${session.id}</p>
                <p><strong>Total:</strong> $${total.toFixed(2)}</p>
              </div>

              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3>Items:</h3>
                ${items.map(item => `
                  <p>• ${item.name} x${item.quantity}</p>
                `).join('')}
              </div>

              <p style="text-align: center; font-size: 16px; margin: 30px 0;">
                We'll send you tracking information once your order ships.
              </p>

              <div style="text-align: center; margin: 30px 0;">
                <h2 style="color: #000;">Own that shit!</h2>
                <p style="color: #666;">- The OWNERSHIP Team</p>
              </div>

              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
                <p style="margin: 0; color: #666;">
                  Questions? Contact us at <a href="mailto:bferrell514@gmail.com">bferrell514@gmail.com</a>
                </p>
              </div>
            </div>
          `
        })

        console.log('Order confirmation emails sent successfully!')
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
} 