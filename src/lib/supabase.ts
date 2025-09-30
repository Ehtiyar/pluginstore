import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Database types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          full_name: string | null
          avatar_url: string | null
          minecraft_username: string | null
          bio: string | null
          website: string | null
          location: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          full_name?: string | null
          avatar_url?: string | null
          minecraft_username?: string | null
          bio?: string | null
          website?: string | null
          location?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          full_name?: string | null
          avatar_url?: string | null
          minecraft_username?: string | null
          bio?: string | null
          website?: string | null
          location?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          icon: string | null
          color: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          icon?: string | null
          color?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          icon?: string | null
          color?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      plugins: {
        Row: {
          id: string
          name: string
          slug: string
          description: string
          long_description: string | null
          price: number
          currency: string
          category_id: string
          developer_id: string
          version: string
          minecraft_versions: string[]
          dependencies: string[]
          commands: string[]
          permissions: string[]
          installation_guide: string | null
          configuration_example: string | null
          changelog: string | null
          license_type: string
          file_url: string | null
          demo_file_url: string | null
          screenshots: string[]
          video_url: string | null
          download_count: number
          rating: number
          review_count: number
          is_featured: boolean
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description: string
          long_description?: string | null
          price: number
          currency?: string
          category_id: string
          developer_id: string
          version: string
          minecraft_versions: string[]
          dependencies?: string[]
          commands?: string[]
          permissions?: string[]
          installation_guide?: string | null
          configuration_example?: string | null
          changelog?: string | null
          license_type: string
          file_url?: string | null
          demo_file_url?: string | null
          screenshots?: string[]
          video_url?: string | null
          download_count?: number
          rating?: number
          review_count?: number
          is_featured?: boolean
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string
          long_description?: string | null
          price?: number
          currency?: string
          category_id?: string
          developer_id?: string
          version?: string
          minecraft_versions?: string[]
          dependencies?: string[]
          commands?: string[]
          permissions?: string[]
          installation_guide?: string | null
          configuration_example?: string | null
          changelog?: string | null
          license_type?: string
          file_url?: string | null
          demo_file_url?: string | null
          screenshots?: string[]
          video_url?: string | null
          download_count?: number
          rating?: number
          review_count?: number
          is_featured?: boolean
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          plugin_id: string
          user_id: string
          rating: number
          title: string
          content: string
          is_verified_purchase: boolean
          helpful_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          plugin_id: string
          user_id: string
          rating: number
          title: string
          content: string
          is_verified_purchase?: boolean
          helpful_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          plugin_id?: string
          user_id?: string
          rating?: number
          title?: string
          content?: string
          is_verified_purchase?: boolean
          helpful_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          total_amount: number
          currency: string
          status: string
          payment_method: string
          payment_id: string | null
          billing_info: any
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          total_amount: number
          currency?: string
          status?: string
          payment_method: string
          payment_id?: string | null
          billing_info?: any
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          total_amount?: number
          currency?: string
          status?: string
          payment_method?: string
          payment_id?: string | null
          billing_info?: any
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          plugin_id: string
          quantity: number
          price: number
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          plugin_id: string
          quantity?: number
          price: number
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          plugin_id?: string
          quantity?: number
          price?: number
          created_at?: string
        }
      }
      downloads: {
        Row: {
          id: string
          user_id: string
          plugin_id: string
          order_id: string
          download_count: number
          last_downloaded_at: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          plugin_id: string
          order_id: string
          download_count?: number
          last_downloaded_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          plugin_id?: string
          order_id?: string
          download_count?: number
          last_downloaded_at?: string
          created_at?: string
        }
      }
      wishlist: {
        Row: {
          id: string
          user_id: string
          plugin_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          plugin_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          plugin_id?: string
          created_at?: string
        }
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string
          content: string
          featured_image: string | null
          author_id: string
          category: string
          tags: string[]
          is_published: boolean
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt: string
          content: string
          featured_image?: string | null
          author_id: string
          category: string
          tags?: string[]
          is_published?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          excerpt?: string
          content?: string
          featured_image?: string | null
          author_id?: string
          category?: string
          tags?: string[]
          is_published?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      discounts: {
        Row: {
          id: string
          code: string
          type: string
          value: number
          min_amount: number | null
          max_uses: number | null
          used_count: number
          is_active: boolean
          starts_at: string | null
          expires_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          code: string
          type: string
          value: number
          min_amount?: number | null
          max_uses?: number | null
          used_count?: number
          is_active?: boolean
          starts_at?: string | null
          expires_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          code?: string
          type?: string
          value?: number
          min_amount?: number | null
          max_uses?: number | null
          used_count?: number
          is_active?: boolean
          starts_at?: string | null
          expires_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
