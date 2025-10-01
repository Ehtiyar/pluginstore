"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { User as SupabaseUser } from '@supabase/supabase-js'
import { User } from '@/types'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/store/useStore'

interface AuthContextType {
  user: User | null
  loading: boolean
  signUp: (email: string, password: string, username: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Helper function to convert SupabaseUser to our custom User type
const convertSupabaseUserToUser = async (supabaseUser: SupabaseUser | null): Promise<User | null> => {
  if (!supabaseUser) return null

  try {
    // Try to get the user profile from our database
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', supabaseUser.id)
      .single()

    if (profile && !error) {
      return {
        id: profile.id,
        email: supabaseUser.email || '',
        username: profile.username,
        full_name: profile.full_name,
        avatar_url: profile.avatar_url,
        minecraft_username: profile.minecraft_username,
        bio: profile.bio,
        website: profile.website,
        location: profile.location,
        created_at: profile.created_at,
        updated_at: profile.updated_at,
      }
    }

    // If no profile exists, create a basic user object
    return {
      id: supabaseUser.id,
      email: supabaseUser.email || '',
      username: supabaseUser.email?.split('@')[0] || 'user',
      full_name: supabaseUser.user_metadata?.full_name,
      avatar_url: supabaseUser.user_metadata?.avatar_url,
      minecraft_username: supabaseUser.user_metadata?.minecraft_username,
      bio: undefined,
      website: undefined,
      location: undefined,
      created_at: supabaseUser.created_at,
      updated_at: supabaseUser.updated_at || supabaseUser.created_at,
    }
  } catch (error) {
    console.error('Error converting Supabase user:', error)
    return null
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const { setUser: setStoreUser, setLoading: setStoreLoading } = useAuthStore()

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      const convertedUser = await convertSupabaseUserToUser(session?.user ?? null)
      setUser(convertedUser)
      setStoreUser(convertedUser)
      setLoading(false)
      setStoreLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const convertedUser = await convertSupabaseUserToUser(session?.user ?? null)
        setUser(convertedUser)
        setStoreUser(convertedUser)
        setLoading(false)
        setStoreLoading(false)

        if (event === 'SIGNED_IN' && session?.user) {
          // Create or update user profile
          await createOrUpdateProfile(session.user)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [setStoreUser, setStoreLoading])

  const createOrUpdateProfile = async (user: SupabaseUser) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error && error.code === 'PGRST116') {
        // Profile doesn't exist, create it
        const { error: insertError } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            username: user.email?.split('@')[0] || 'user',
            full_name: user.user_metadata?.full_name || null,
            avatar_url: user.user_metadata?.avatar_url || null,
          })

        if (insertError) {
          console.error('Error creating profile:', insertError)
        }
      } else if (error) {
        console.error('Error fetching profile:', error)
      }
    } catch (error) {
      console.error('Error in createOrUpdateProfile:', error)
    }
  }

  const signUp = async (email: string, password: string, username: string) => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          }
        }
      })

      if (error) throw error
    } catch (error) {
      console.error('Error signing up:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error
    } catch (error) {
      console.error('Error signing in:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      if (error) throw error
    } catch (error) {
      console.error('Error resetting password:', error)
      throw error
    }
  }

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
