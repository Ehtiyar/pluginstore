"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  User, 
  Menu, 
  X,
  Sun,
  Moon,
  Monitor
} from 'lucide-react'
import { useCartStore, useWishlistStore, useUIStore } from '@/store/useStore'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const { items: cartItems, getTotalItems } = useCartStore()
  const { items: wishlistItems } = useWishlistStore()
  const { sidebarOpen, setSidebarOpen } = useUIStore()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/plugins?search=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
    }
  }

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('system')
    } else {
      setTheme('light')
    }
  }

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-4 w-4" />
      case 'dark':
        return <Moon className="h-4 w-4" />
      default:
        return <Monitor className="h-4 w-4" />
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-minecraft-green rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="font-bold text-xl minecraft-text text-minecraft-green">
                Plugin Store
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/plugins" 
              className="text-sm font-medium transition-colors hover:text-minecraft-green"
            >
              Pluginler
            </Link>
            <Link 
              href="/categories" 
              className="text-sm font-medium transition-colors hover:text-minecraft-green"
            >
              Kategoriler
            </Link>
            <Link 
              href="/blog" 
              className="text-sm font-medium transition-colors hover:text-minecraft-green"
            >
              Blog
            </Link>
            <Link 
              href="/about" 
              className="text-sm font-medium transition-colors hover:text-minecraft-green"
            >
              Hakkımızda
            </Link>
            <Link 
              href="/contact" 
              className="text-sm font-medium transition-colors hover:text-minecraft-green"
            >
              İletişim
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Plugin ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4"
              />
            </form>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hidden md:flex"
            >
              {getThemeIcon()}
            </Button>

            {/* Wishlist */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push('/wishlist')}
              className="relative"
            >
              <Heart className="h-5 w-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push('/cart')}
              className="relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-minecraft-green text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Button>

            {/* User Menu */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push('/auth/login')}
            >
              <User className="h-5 w-5" />
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4">
            <div className="flex flex-col space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Plugin ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4"
                />
              </form>

              {/* Mobile Navigation */}
              <nav className="flex flex-col space-y-2">
                <Link 
                  href="/plugins" 
                  className="text-sm font-medium transition-colors hover:text-minecraft-green py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pluginler
                </Link>
                <Link 
                  href="/categories" 
                  className="text-sm font-medium transition-colors hover:text-minecraft-green py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Kategoriler
                </Link>
                <Link 
                  href="/blog" 
                  className="text-sm font-medium transition-colors hover:text-minecraft-green py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link 
                  href="/about" 
                  className="text-sm font-medium transition-colors hover:text-minecraft-green py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Hakkımızda
                </Link>
                <Link 
                  href="/contact" 
                  className="text-sm font-medium transition-colors hover:text-minecraft-green py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  İletişim
                </Link>
              </nav>

              {/* Mobile Actions */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleTheme}
                  >
                    {getThemeIcon()}
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    {theme === 'light' ? 'Açık' : theme === 'dark' ? 'Koyu' : 'Sistem'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      router.push('/wishlist')
                      setIsMenuOpen(false)
                    }}
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    İstek Listesi ({wishlistItems.length})
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      router.push('/cart')
                      setIsMenuOpen(false)
                    }}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Sepet ({getTotalItems()})
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
