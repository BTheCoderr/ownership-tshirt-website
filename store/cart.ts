import { create } from 'zustand'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  color: 'black' | 'white'
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  total: number
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,
  total: 0,
  
  addItem: (newItem) => {
    const { items } = get()
    const existingItem = items.find(item => item.id === newItem.id)
    
    if (existingItem) {
      set({
        items: items.map(item =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      })
    } else {
      set({
        items: [...items, { ...newItem, quantity: 1 }]
      })
    }
    
    // Recalculate total
    const newItems = get().items
    const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    set({ total: newTotal })
  },
  
  removeItem: (id) => {
    const { items } = get()
    const newItems = items.filter(item => item.id !== id)
    const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    
    set({
      items: newItems,
      total: newTotal
    })
  },
  
  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      get().removeItem(id)
      return
    }
    
    const { items } = get()
    const newItems = items.map(item =>
      item.id === id ? { ...item, quantity } : item
    )
    const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    
    set({
      items: newItems,
      total: newTotal
    })
  },
  
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  clearCart: () => set({ items: [], total: 0 })
})) 