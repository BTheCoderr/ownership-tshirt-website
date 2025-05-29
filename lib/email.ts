import emailjs from 'emailjs-com'

// EmailJS configuration
const SERVICE_ID = 'service_ownership' // You'll get this from EmailJS
const TEMPLATE_ID = 'template_order' // You'll get this from EmailJS  
const USER_ID = 'your_user_id' // You'll get this from EmailJS

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
    const contactParams = {
      to_email: 'bferrell514@gmail.com',
      from_name: name,
      from_email: email,
      subject: 'New Contact Form Message',
      message: `
New contact form submission:

Name: ${name}
Email: ${email}
Message: ${message}

Sent from: OWNERSHIP website contact form
      `,
    }

    await emailjs.send(SERVICE_ID, TEMPLATE_ID, contactParams, USER_ID)
    return { success: true }
  } catch (error) {
    console.error('Failed to send contact email:', error)
    return { success: false, error }
  }
} 