import emailjs from 'emailjs-com'

// EmailJS configuration - Use environment variables for security
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_fcb4hs4'
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_irsmogl'
const USER_ID = process.env.NEXT_PUBLIC_EMAILJS_USER_ID || 'cBkM5RSjmNp8xBVpE'

interface OrderData {
  orderId: string
  customerName: string
  customerEmail: string
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
  total: number
  shippingAddress: string
  timestamp: string
}

export const sendOrderNotification = async (orderData: OrderData) => {
  try {
    // Email to business owner
    const ownerEmailParams = {
      to_email: 'bferrell514@gmail.com',
      from_name: 'OWNERSHIP Store',
      subject: `New Order #${orderData.orderId}`,
      message: `
🎉 NEW ORDER RECEIVED!

Order ID: ${orderData.orderId}
Customer: ${orderData.customerName}
Email: ${orderData.customerEmail}
Total: $${orderData.total.toFixed(2)}

Items:
${orderData.items.map(item => `- ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`).join('\n')}

Shipping Address:
${orderData.shippingAddress}

Order Time: ${new Date(orderData.timestamp).toLocaleString()}

Login to your admin panel to process this order.
      `,
    }

    // Send notification to business owner
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, ownerEmailParams, USER_ID)

    // Email confirmation to customer
    const customerEmailParams = {
      to_email: orderData.customerEmail,
      from_name: 'OWNERSHIP',
      subject: `Order Confirmation #${orderData.orderId}`,
      message: `
Hi ${orderData.customerName},

Thank you for your OWNERSHIP order! 🔥

Order Details:
Order ID: ${orderData.orderId}
Total: $${orderData.total.toFixed(2)}

Items:
${orderData.items.map(item => `- ${item.name} x${item.quantity}`).join('\n')}

We'll send you tracking information once your order ships.

Own that shit!
- The OWNERSHIP Team

Questions? Reply to this email or contact us at bferrell514@gmail.com
      `,
    }

    // Send confirmation to customer
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, customerEmailParams, USER_ID)

    console.log('Order emails sent successfully!')
    return { success: true }
  } catch (error) {
    console.error('Failed to send order emails:', error)
    return { success: false, error }
  }
}

export const sendContactEmail = async (name: string, email: string, message: string) => {
  try {
    console.log('=== EmailJS Debug Info ===')
    console.log('SERVICE_ID:', SERVICE_ID)
    console.log('TEMPLATE_ID:', TEMPLATE_ID)
    console.log('USER_ID:', USER_ID)
    console.log('Sending contact email with:', { name, email, message })
    
    const contactParams = {
      to_email: 'bferrell514@gmail.com',
      from_name: name,
      reply_to: email,
      subject: `Contact from ${name}`,
      message: message,
    }

    console.log('EmailJS params:', contactParams)

    const result = await emailjs.send(SERVICE_ID, TEMPLATE_ID, contactParams, USER_ID)
    console.log('✅ EmailJS SUCCESS:', result)
    
    return { success: true }
  } catch (error) {
    console.error('❌ Failed to send contact email:', error)
    console.error('Error details:', JSON.stringify(error, null, 2))
    
    // If template not found, suggest creating a new one
    if (error && typeof error === 'object' && 'text' in error) {
      const errorWithText = error as { text: string }
      if (errorWithText.text && errorWithText.text.includes('template ID not found')) {
        console.error('🔧 SOLUTION: Create a new template in EmailJS dashboard with simple text content')
      }
    }
    
    return { success: false, error }
  }
} 