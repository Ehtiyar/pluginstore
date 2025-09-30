"use client"

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  DollarSign, 
  Gamepad2, 
  Settings, 
  TreePine, 
  Sword, 
  Palette,
  Wrench,
  Globe,
  MessageSquare,
  Shield,
  Zap,
  Plug
} from 'lucide-react'

const categories = [
  {
    id: 'economy',
    name: 'Ekonomi',
    description: 'Para sistemi, bankacılık ve ticaret pluginleri',
    icon: DollarSign,
    color: 'bg-green-500',
    pluginCount: 45,
    popular: true
  },
  {
    id: 'minigames',
    name: 'Minigame',
    description: 'Eğlenceli oyunlar ve aktiviteler',
    icon: Gamepad2,
    color: 'bg-blue-500',
    pluginCount: 32,
    popular: true
  },
  {
    id: 'admin',
    name: 'Admin Araçları',
    description: 'Sunucu yönetimi ve moderasyon',
    icon: Settings,
    color: 'bg-purple-500',
    pluginCount: 28,
    popular: false
  },
  {
    id: 'survival',
    name: 'Survival',
    description: 'Hayatta kalma deneyimini geliştiren eklentiler',
    icon: TreePine,
    color: 'bg-emerald-500',
    pluginCount: 23,
    popular: false
  },
  {
    id: 'pvp',
    name: 'PvP',
    description: 'Oyuncu vs oyuncu savaş sistemleri',
    icon: Sword,
    color: 'bg-red-500',
    pluginCount: 19,
    popular: true
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Yaratıcılık ve inşaat araçları',
    icon: Palette,
    color: 'bg-pink-500',
    pluginCount: 15,
    popular: false
  },
  {
    id: 'utility',
    name: 'Utility',
    description: 'Genel amaçlı yardımcı araçlar',
    icon: Wrench,
    color: 'bg-orange-500',
    pluginCount: 41,
    popular: false
  },
  {
    id: 'world',
    name: 'World',
    description: 'Dünya yönetimi ve düzenleme',
    icon: Globe,
    color: 'bg-cyan-500',
    pluginCount: 12,
    popular: false
  },
  {
    id: 'chat',
    name: 'Chat',
    description: 'Sohbet ve iletişim sistemleri',
    icon: MessageSquare,
    color: 'bg-indigo-500',
    pluginCount: 18,
    popular: false
  },
  {
    id: 'security',
    name: 'Security',
    description: 'Güvenlik ve koruma araçları',
    icon: Shield,
    color: 'bg-gray-500',
    pluginCount: 14,
    popular: false
  },
  {
    id: 'performance',
    name: 'Performance',
    description: 'Sunucu performans optimizasyonu',
    icon: Zap,
    color: 'bg-yellow-500',
    pluginCount: 8,
    popular: false
  },
  {
    id: 'api',
    name: 'API',
    description: 'Geliştirici araçları ve API\'ler',
    icon: Plug,
    color: 'bg-teal-500',
    pluginCount: 6,
    popular: false
  }
]

export function CategoriesSection() {
  const router = useRouter()

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/categories/${categoryId}`)
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-minecraft-green">Kategoriler</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            İhtiyacınıza uygun pluginleri kategorilere göre keşfedin
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card 
                className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-minecraft-green/20"
                onClick={() => handleCategoryClick(category.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg ${category.color} text-white`}>
                      <category.icon className="h-6 w-6" />
                    </div>
                    {category.popular && (
                      <Badge variant="minecraft" className="text-xs">
                        Popüler
                      </Badge>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-minecraft-green transition-colors">
                    {category.name}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {category.pluginCount} plugin
                    </span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Keşfet →
                    </Button>
                  </div>
                </CardContent>
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
            onClick={() => router.push('/categories')}
          >
            Tüm Kategorileri Görüntüle
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
