import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User, Plugin, CartItem, Order, WishlistItem } from '@/types'

interface AuthState {
  user: User | null
  isLoading: boolean
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
}

interface CartState {
  items: CartItem[]
  addItem: (plugin: Plugin, quantity?: number) => void
  removeItem: (pluginId: string) => void
  updateQuantity: (pluginId: string, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
}

interface WishlistState {
  items: WishlistItem[]
  addItem: (plugin: Plugin) => void
  removeItem: (pluginId: string) => void
  isInWishlist: (pluginId: string) => boolean
  clearWishlist: () => void
}

interface UIState {
  sidebarOpen: boolean
  theme: 'light' | 'dark' | 'system'
  setSidebarOpen: (open: boolean) => void
  setTheme: (theme: 'light' | 'dark' | 'system') => void
}

interface NotificationState {
  notifications: Array<{
    id: string
    type: 'success' | 'error' | 'warning' | 'info'
    title: string
    message: string
    duration?: number
  }>
  addNotification: (notification: Omit<NotificationState['notifications'][0], 'id'>) => void
  removeNotification: (id: string) => void
  clearNotifications: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      setUser: (user) => set({ user }),
      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }),
    }
  )
)

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (plugin, quantity = 1) => {
        const items = get().items
        const existingItem = items.find(item => item.plugin.id === plugin.id)
        
        if (existingItem) {
          set({
            items: items.map(item =>
              item.plugin.id === plugin.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          })
        } else {
          set({
            items: [...items, { plugin, quantity }]
          })
        }
      },
      removeItem: (pluginId) => {
        set({
          items: get().items.filter(item => item.plugin.id !== pluginId)
        })
      },
      updateQuantity: (pluginId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(pluginId)
          return
        }
        
        set({
          items: get().items.map(item =>
            item.plugin.id === pluginId
              ? { ...item, quantity }
              : item
          )
        })
      },
      clearCart: () => set({ items: [] }),
      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          return total + (item.plugin.price * item.quantity)
        }, 0)
      },
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
    }),
    {
      name: 'cart-storage',
    }
  )
)

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (plugin) => {
        const items = get().items
        const exists = items.some(item => item.plugin_id === plugin.id)
        
        if (!exists) {
          set({
            items: [...items, {
              id: `wishlist-${plugin.id}`,
              user_id: '',
              plugin_id: plugin.id,
              plugin,
              created_at: new Date().toISOString()
            }]
          })
        }
      },
      removeItem: (pluginId) => {
        set({
          items: get().items.filter(item => item.plugin_id !== pluginId)
        })
      },
      isInWishlist: (pluginId) => {
        return get().items.some(item => item.plugin_id === pluginId)
      },
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'wishlist-storage',
    }
  )
)

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: false,
      theme: 'system',
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'ui-storage',
    }
  )
)

export const useNotificationStore = create<NotificationState>()((set, get) => ({
  notifications: [],
  addNotification: (notification) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newNotification = { ...notification, id }
    
    set({
      notifications: [...get().notifications, newNotification]
    })
    
    // Auto remove notification after duration
    const duration = notification.duration || 5000
    setTimeout(() => {
      get().removeNotification(id)
    }, duration)
  },
  removeNotification: (id) => {
    set({
      notifications: get().notifications.filter(notification => notification.id !== id)
    })
  },
  clearNotifications: () => set({ notifications: [] }),
}))

// Combined store for easy access
export const useAppStore = () => ({
  auth: useAuthStore(),
  cart: useCartStore(),
  wishlist: useWishlistStore(),
  ui: useUIStore(),
  notifications: useNotificationStore(),
})
