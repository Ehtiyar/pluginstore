"use client"

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Star, Download, Heart, ShoppingCart, Eye, Search, Filter } from 'lucide-react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useWishlistStore, useCartStore } from '@/store/useStore'
import { formatPrice, getTimeAgo } from '@/lib/utils'
import { Plugin } from '@/types'

// Mock data for plugins
const mockPlugins: Plugin[] = [
  {
    id: '1',
    name: 'Advanced Economy',
    slug: 'advanced-economy',
    description: 'Gelişmiş ekonomi sistemi ile sunucunuzu zenginleştirin',
    price: 25.99,
    currency: 'TRY',
    category_id: 'economy',
    developer_id: 'dev1',
    version: '2.1.0',
    minecraft_versions: ['1.19', '1.20'],
    dependencies: ['Vault'],
    commands: ['/balance', '/pay', '/economy'],
    permissions: ['economy.balance', 'economy.pay'],
    license_type: 'multi',
    screenshots: ['/images/plugin1-1.jpg', '/images/plugin1-2.jpg'],
    download_count: 15420,
    rating: 4.8,
    review_count: 324,
    is_featured: true,
    is_active: true,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-20T15:30:00Z'
  },
  {
    id: '2',
    name: 'Epic Minigames',
    slug: 'epic-minigames',
    description: '20+ farklı minigame ile oyuncularınızı eğlendirin',
    price: 45.99,
    currency: 'TRY',
    category_id: 'minigames',
    developer_id: 'dev2',
    version: '1.5.2',
    minecraft_versions: ['1.18', '1.19', '1.20'],
    dependencies: ['WorldEdit'],
    commands: ['/minigame', '/mg'],
    permissions: ['minigame.play', 'minigame.admin'],
    license_type: 'lifetime',
    screenshots: ['/images/plugin2-1.jpg'],
    download_count: 8930,
    rating: 4.9,
    review_count: 156,
    is_featured: true,
    is_active: true,
    created_at: '2024-01-10T08:00:00Z',
    updated_at: '2024-01-18T12:00:00Z'
  },
  {
    id: '3',
    name: 'Admin Tools Pro',
    slug: 'admin-tools-pro',
    description: 'Profesyonel admin araçları ile sunucunuzu yönetin',
    price: 35.99,
    currency: 'TRY',
    category_id: 'admin',
    developer_id: 'dev3',
    version: '3.0.1',
    minecraft_versions: ['1.19', '1.20'],
    dependencies: ['Vault', 'PlaceholderAPI'],
    commands: ['/admin', '/atools'],
    permissions: ['admin.tools', 'admin.manage'],
    license_type: 'multi',
    screenshots: ['/images/plugin3-1.jpg'],
    download_count: 12300,
    rating: 4.7,
    review_count: 89,
    is_featured: true,
    is_active: true,
    created_at: '2024-01-05T14:00:00Z',
    updated_at: '2024-01-22T09:15:00Z'
  },
  {
    id: '4',
    name: 'Survival Plus',
    slug: 'survival-plus',
    description: 'Survival deneyimini geliştiren özellikler',
    price: 19.99,
    currency: 'TRY',
    category_id: 'survival',
    developer_id: 'dev4',
    version: '1.2.3',
    minecraft_versions: ['1.18', '1.19', '1.20'],
    dependencies: [],
    commands: ['/survival', '/splus'],
    permissions: ['survival.use'],
    license_type: 'single',
    screenshots: ['/images/plugin4-1.jpg'],
    download_count: 6780,
    rating: 4.6,
    review_count: 45,
    is_featured: true,
    is_active: true,
    created_at: '2024-01-12T16:00:00Z',
    updated_at: '2024-01-19T11:30:00Z'
  },
  {
    id: '5',
    name: 'PvP Arena',
    slug: 'pvp-arena',
    description: 'Profesyonel PvP arena sistemi',
    price: 29.99,
    currency: 'TRY',
    category_id: 'pvp',
    developer_id: 'dev5',
    version: '2.0.0',
    minecraft_versions: ['1.19', '1.20'],
    dependencies: ['WorldGuard'],
    commands: ['/arena', '/pvp'],
    permissions: ['pvp.arena', 'pvp.admin'],
    license_type: 'multi',
    screenshots: ['/images/plugin5-1.jpg'],
    download_count: 11200,
    rating: 4.5,
    review_count: 78,
    is_featured: false,
    is_active: true,
    created_at: '2024-01-08T13:00:00Z',
    updated_at: '2024-01-21T16:45:00Z'
  },
  {
    id: '6',
    name: 'Creative Tools',
    slug: 'creative-tools',
    description: 'Yaratıcılık için gelişmiş araçlar',
    price: 15.99,
    currency: 'TRY',
    category_id: 'creative',
    developer_id: 'dev6',
    version: '1.8.5',
    minecraft_versions: ['1.18', '1.19', '1.20'],
    dependencies: ['WorldEdit'],
    commands: ['/creative', '/ctools'],
    permissions: ['creative.tools'],
    license_type: 'single',
    screenshots: ['/images/plugin6-1.jpg'],
    download_count: 5430,
    rating: 4.4,
    review_count: 32,
    is_featured: false,
    is_active: true,
    created_at: '2024-01-14T09:00:00Z',
    updated_at: '2024-01-17T14:20:00Z'
  }
]

const categories = [
  { id: 'all', name: 'Tümü', icon: '📦' },
  { id: 'economy', name: 'Ekonomi', icon: '💰' },
  { id: 'minigames', name: 'Minigame', icon: '🎮' },
  { id: 'admin', name: 'Admin', icon: '⚙️' },
  { id: 'survival', name: 'Survival', icon: '🏕️' },
  { id: 'pvp', name: 'PvP', icon: '⚔️' },
  { id: 'creative', name: 'Creative', icon: '🎨' },
]

const sortOptions = [
  { value: 'relevance', label: 'İlgililik' },
  { value: 'popularity', label: 'Popülerlik' },
  { value: 'rating', label: 'Puan' },
  { value: 'price_low', label: 'Fiyat (Düşük-Yüksek)' },
  { value: 'price_high', label: 'Fiyat (Yüksek-Düşük)' },
  { value: 'newest', label: 'En Yeni' },
  { value: 'updated', label: 'Son Güncellenen' },
]

export default function PluginsPage() {
  const [plugins, setPlugins] = useState<Plugin[]>([])
  const [filteredPlugins, setFilteredPlugins] = useState<Plugin[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('relevance')
  const [priceRange, setPriceRange] = useState([0, 100])
  
  const searchParams = useSearchParams()
  const router = useRouter()
  const { addItem: addToWishlist, isInWishlist } = useWishlistStore()
  const { addItem: addToCart } = useCartStore()

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPlugins(mockPlugins)
      setFilteredPlugins(mockPlugins)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    // Get search query from URL
    const search = searchParams.get('search')
    if (search) {
      setSearchQuery(search)
    }
  }, [searchParams])

  useEffect(() => {
    // Filter and sort plugins
    let filtered = [...plugins]

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(plugin =>
        plugin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plugin.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(plugin => plugin.category_id === selectedCategory)
    }

    // Price filter
    filtered = filtered.filter(plugin => 
      plugin.price >= priceRange[0] && plugin.price <= priceRange[1]
    )

    // Sort
    switch (sortBy) {
      case 'popularity':
        filtered.sort((a, b) => b.download_count - a.download_count)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'price_low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price_high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
      case 'updated':
        filtered.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
        break
      default:
        // Keep original order for relevance
        break
    }

    setFilteredPlugins(filtered)
  }, [plugins, searchQuery, selectedCategory, sortBy, priceRange])

  const handleAddToCart = (plugin: Plugin) => {
    addToCart(plugin)
  }

  const handleAddToWishlist = (plugin: Plugin) => {
    addToWishlist(plugin)
  }

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId)
    return category?.icon || '📦'
  }

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId)
    return category?.name || categoryId
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="skeleton h-80 rounded-lg"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="text-minecraft-green">Pluginler</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          {filteredPlugins.length} plugin bulundu
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Plugin ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className={selectedCategory === category.id ? "minecraft-button" : ""}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </Button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center space-x-4">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sırala" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Plugins Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPlugins.map((plugin, index) => (
          <motion.div
            key={plugin.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {getCategoryIcon(plugin.category_id)} {getCategoryName(plugin.category_id)}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleAddToWishlist(plugin)}
                  >
                    <Heart 
                      className={`h-4 w-4 ${
                        isInWishlist(plugin.id) ? 'fill-red-500 text-red-500' : ''
                      }`} 
                    />
                  </Button>
                </div>
                
                <CardTitle className="text-lg line-clamp-2 group-hover:text-minecraft-green transition-colors">
                  {plugin.name}
                </CardTitle>
                
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {plugin.description}
                </p>
              </CardHeader>

              <CardContent className="p-4 pt-0">
                <div className="space-y-3">
                  {/* Rating */}
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(plugin.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {plugin.rating} ({plugin.review_count})
                    </span>
                  </div>

                  {/* Downloads */}
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Download className="h-4 w-4" />
                    <span>{plugin.download_count.toLocaleString()} indirme</span>
                  </div>

                  {/* Version & Last Update */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>v{plugin.version}</span>
                    <span>{getTimeAgo(plugin.updated_at)}</span>
                  </div>

                  {/* Minecraft Versions */}
                  <div className="flex flex-wrap gap-1">
                    {plugin.minecraft_versions.slice(0, 3).map((version) => (
                      <Badge key={version} variant="outline" className="text-xs">
                        {version}
                      </Badge>
                    ))}
                    {plugin.minecraft_versions.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{plugin.minecraft_versions.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0 flex flex-col space-y-3">
                <div className="flex items-center justify-between w-full">
                  <span className="text-2xl font-bold text-minecraft-green">
                    {formatPrice(plugin.price, plugin.currency)}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.push(`/plugins/${plugin.slug}`)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Detay
                  </Button>
                </div>
                
                <Button 
                  className="w-full minecraft-button"
                  onClick={() => handleAddToCart(plugin)}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Sepete Ekle
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* No Results */}
      {filteredPlugins.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">Plugin bulunamadı</h3>
          <p className="text-muted-foreground mb-4">
            Arama kriterlerinize uygun plugin bulunamadı. Filtreleri değiştirmeyi deneyin.
          </p>
          <Button 
            variant="minecraft-outline"
            onClick={() => {
              setSearchQuery('')
              setSelectedCategory('all')
              setSortBy('relevance')
            }}
          >
            Filtreleri Temizle
          </Button>
        </div>
      )}
    </div>
  )
}
