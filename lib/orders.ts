export interface Order {
  id: string
  orderId: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  customer: {
    firstName: string
    lastName: string
    email: string
    address: string
    city: string
    postalCode: string
    country: string
  }
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
    color: string
  }>
  total: number
  paymentIntentId?: string
  createdAt: string
  updatedAt: string
  trackingNumber?: string
  notes?: string
}

class OrderManager {
  private storageKey = 'ownership_orders'

  // Get all orders
  getAllOrders(): Order[] {
    if (typeof window === 'undefined') return []
    const orders = localStorage.getItem(this.storageKey)
    return orders ? JSON.parse(orders) : []
  }

  // Get order by ID
  getOrder(orderId: string): Order | null {
    const orders = this.getAllOrders()
    return orders.find(order => order.orderId === orderId) || null
  }

  // Create new order
  createOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Order {
    const orders = this.getAllOrders()
    const newOrder: Order = {
      ...orderData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    orders.push(newOrder)
    this.saveOrders(orders)
    return newOrder
  }

  // Update order
  updateOrder(orderId: string, updates: Partial<Order>): Order | null {
    const orders = this.getAllOrders()
    const orderIndex = orders.findIndex(order => order.orderId === orderId)
    
    if (orderIndex === -1) return null
    
    orders[orderIndex] = {
      ...orders[orderIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    }
    
    this.saveOrders(orders)
    return orders[orderIndex]
  }

  // Delete order
  deleteOrder(orderId: string): boolean {
    const orders = this.getAllOrders()
    const filteredOrders = orders.filter(order => order.orderId !== orderId)
    
    if (filteredOrders.length === orders.length) return false
    
    this.saveOrders(filteredOrders)
    return true
  }

  // Get orders by status
  getOrdersByStatus(status: Order['status']): Order[] {
    return this.getAllOrders().filter(order => order.status === status)
  }

  // Get orders by customer email
  getOrdersByCustomer(email: string): Order[] {
    return this.getAllOrders().filter(order => order.customer.email === email)
  }

  // Get order statistics
  getOrderStats() {
    const orders = this.getAllOrders()
    const now = new Date()
    const thisMonth = orders.filter(order => {
      const orderDate = new Date(order.createdAt)
      return orderDate.getMonth() === now.getMonth() && 
             orderDate.getFullYear() === now.getFullYear()
    })

    return {
      total: orders.length,
      thisMonth: thisMonth.length,
      totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
      monthlyRevenue: thisMonth.reduce((sum, order) => sum + order.total, 0),
      byStatus: {
        pending: orders.filter(o => o.status === 'pending').length,
        processing: orders.filter(o => o.status === 'processing').length,
        shipped: orders.filter(o => o.status === 'shipped').length,
        delivered: orders.filter(o => o.status === 'delivered').length,
        cancelled: orders.filter(o => o.status === 'cancelled').length,
      }
    }
  }

  // Export orders to CSV
  exportToCSV(): string {
    const orders = this.getAllOrders()
    const headers = [
      'Order ID', 'Status', 'Customer Name', 'Email', 'Total', 
      'Items', 'Created Date', 'Tracking Number'
    ]
    
    const rows = orders.map(order => [
      order.orderId,
      order.status,
      `${order.customer.firstName} ${order.customer.lastName}`,
      order.customer.email,
      order.total.toFixed(2),
      order.items.map(item => `${item.name} x${item.quantity}`).join('; '),
      new Date(order.createdAt).toLocaleDateString(),
      order.trackingNumber || 'N/A'
    ])

    return [headers, ...rows].map(row => row.join(',')).join('\n')
  }

  private saveOrders(orders: Order[]): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.storageKey, JSON.stringify(orders))
    }
  }
}

export const orderManager = new OrderManager() 