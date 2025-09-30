export interface User {
  id: string
  email: string
  username: string
  full_name?: string
  avatar_url?: string
  minecraft_username?: string
  bio?: string
  website?: string
  location?: string
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  icon?: string
  color?: string
  created_at: string
  updated_at: string
}

export interface Plugin {
  id: string
  name: string
  slug: string
  description: string
  long_description?: string
  price: number
  currency: string
  category_id: string
  category?: Category
  developer_id: string
  developer?: User
  version: string
  minecraft_versions: string[]
  dependencies: string[]
  commands: string[]
  permissions: string[]
  installation_guide?: string
  configuration_example?: string
  changelog?: string
  license_type: string
  file_url?: string
  demo_file_url?: string
  screenshots: string[]
  video_url?: string
  download_count: number
  rating: number
  review_count: number
  is_featured: boolean
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Review {
  id: string
  plugin_id: string
  plugin?: Plugin
  user_id: string
  user?: User
  rating: number
  title: string
  content: string
  is_verified_purchase: boolean
  helpful_count: number
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  user_id: string
  user?: User
  total_amount: number
  currency: string
  status: 'pending' | 'processing' | 'completed' | 'cancelled' | 'refunded'
  payment_method: string
  payment_id?: string
  billing_info: any
  items?: OrderItem[]
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  plugin_id: string
  plugin?: Plugin
  quantity: number
  price: number
  created_at: string
}

export interface Download {
  id: string
  user_id: string
  plugin_id: string
  plugin?: Plugin
  order_id: string
  download_count: number
  last_downloaded_at: string
  created_at: string
}

export interface WishlistItem {
  id: string
  user_id: string
  plugin_id: string
  plugin?: Plugin
  created_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featured_image?: string
  author_id: string
  author?: User
  category: string
  tags: string[]
  is_published: boolean
  published_at?: string
  created_at: string
  updated_at: string
}

export interface Discount {
  id: string
  code: string
  type: 'percentage' | 'fixed'
  value: number
  min_amount?: number
  max_uses?: number
  used_count: number
  is_active: boolean
  starts_at?: string
  expires_at?: string
  created_at: string
  updated_at: string
}

export interface CartItem {
  plugin: Plugin
  quantity: number
}

export interface SearchFilters {
  category?: string
  minPrice?: number
  maxPrice?: number
  minecraftVersions?: string[]
  licenseType?: string
  rating?: number
  sortBy?: 'relevance' | 'popularity' | 'rating' | 'price_low' | 'price_high' | 'newest' | 'updated'
}

export interface ApiResponse<T> {
  data: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface NotificationSettings {
  email_notifications: boolean
  order_updates: boolean
  plugin_updates: boolean
  newsletter: boolean
  marketing: boolean
}

export interface UserProfile extends User {
  notification_settings: NotificationSettings
  api_key?: string
  referral_code?: string
  total_spent: number
  total_orders: number
}

export interface PluginStats {
  total_downloads: number
  total_revenue: number
  average_rating: number
  total_reviews: number
  conversion_rate: number
}

export interface DashboardStats {
  total_plugins: number
  total_users: number
  total_orders: number
  total_revenue: number
  monthly_revenue: number
  top_plugins: Plugin[]
  recent_orders: Order[]
}

export interface PaymentMethod {
  id: string
  type: 'card' | 'bank_transfer' | 'papara' | 'payfix' | 'iyzico' | 'paypal' | 'crypto'
  name: string
  is_active: boolean
  icon: string
}

export interface MinecraftVersion {
  version: string
  name: string
  release_date: string
  is_supported: boolean
}

export interface PluginCategory {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  color: string
  plugin_count: number
}

export interface ServerInfo {
  name: string
  ip: string
  port: number
  version: string
  players: {
    online: number
    max: number
  }
  motd: string
  plugins: string[]
}

export interface SupportTicket {
  id: string
  user_id: string
  user?: User
  subject: string
  message: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'open' | 'in_progress' | 'resolved' | 'closed'
  attachments: string[]
  created_at: string
  updated_at: string
}

export interface NewsletterSubscription {
  id: string
  email: string
  is_active: boolean
  preferences: {
    plugin_updates: boolean
    blog_posts: boolean
    promotions: boolean
    news: boolean
  }
  created_at: string
  updated_at: string
}

export interface ReferralProgram {
  id: string
  referrer_id: string
  referred_id: string
  reward_amount: number
  status: 'pending' | 'completed' | 'cancelled'
  created_at: string
  completed_at?: string
}

export interface ApiKey {
  id: string
  user_id: string
  name: string
  key: string
  permissions: string[]
  last_used?: string
  is_active: boolean
  created_at: string
  expires_at?: string
}

export interface FileUpload {
  id: string
  filename: string
  original_name: string
  size: number
  mime_type: string
  url: string
  uploaded_by: string
  created_at: string
}

export interface SystemSettings {
  site_name: string
  site_description: string
  site_logo: string
  site_favicon: string
  contact_email: string
  support_email: string
  social_links: {
    discord?: string
    twitter?: string
    youtube?: string
    instagram?: string
  }
  payment_settings: {
    default_currency: string
    supported_currencies: string[]
    tax_rate: number
  }
  email_settings: {
    from_name: string
    from_email: string
    smtp_host: string
    smtp_port: number
    smtp_user: string
    smtp_pass: string
  }
}
