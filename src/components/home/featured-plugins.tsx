"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, Download, Heart, ShoppingCart, Eye } from 'lucide-react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useWishlistStore, useCartStore } from '@/store/useStore'
import { formatPrice, getTimeAgo } from '@/lib/utils'
import { Plugin } from '@/types'

// Mock data for featured plugins
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
  }
]

export function FeaturedPlugins() {
  const [plugins, setPlugins] = useState<Plugin[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { addItem: addToWishlist, isInWishlist } = useWishlistStore()
  const { addItem: addToCart } = useCartStore()

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPlugins(mockPlugins)
      setLoading(false)
    }, 1000)
  }, [])

  const handleAddToCart = (plugin: Plugin) => {
    addToCart(plugin)
    // Show success notification
  }

  const handleAddToWishlist = (plugin: Plugin) => {
    addToWishlist(plugin)
    // Show success notification
  }

  const getCategoryIcon = (categoryId: string) => {
    const icons: { [key: string]: string } = {
      economy: '💰',
      minigames: '🎮',
      admin: '⚙️',
      survival: '🏕️',
      pvp: '⚔️',
    }
    return icons[categoryId] || '📦'
  }

  const getCategoryName = (categoryId: string) => {
    const names: { [key: string]: string } = {
      economy: 'Ekonomi',
      minigames: 'Minigame',
      admin: 'Admin',
      survival: 'Survival',
      pvp: 'PvP',
    }
    return names[categoryId] || categoryId
  }

  if (loading) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Öne Çıkan Pluginler
            </h2>
            <p className="text-muted-foreground text-lg">
              En popüler ve en çok indirilen pluginler
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="skeleton h-80 rounded-lg"></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-minecraft-green">Öne Çıkan</span> Pluginler
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            En popüler ve en çok indirilen pluginler. Topluluğumuzun favorileri.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plugins.map((plugin, index) => (
            <motion.div
              key={plugin.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
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

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Button 
            size="lg" 
            variant="minecraft-outline"
            onClick={() => router.push('/plugins')}
          >
            Tüm Pluginleri Görüntüle
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
