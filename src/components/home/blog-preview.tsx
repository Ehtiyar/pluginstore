"use client"

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { formatDate, calculateReadingTime } from '@/lib/utils'

const blogPosts = [
  {
    id: 1,
    title: 'Minecraft Sunucu Kurulumu: Başlangıç Rehberi',
    excerpt: 'Minecraft sunucunuzu sıfırdan nasıl kurarsınız? Bu detaylı rehberde adım adım öğreneceksiniz.',
    content: 'Detaylı içerik...',
    featured_image: '/blog/sunucu-kurulum.jpg',
    author: 'Admin',
    category: 'Rehber',
    tags: ['sunucu', 'kurulum', 'başlangıç'],
    published_at: '2024-01-20T10:00:00Z',
    reading_time: 8
  },
  {
    id: 2,
    title: 'En İyi Ekonomi Pluginleri 2024',
    excerpt: 'Sunucunuz için en popüler ve güvenilir ekonomi pluginlerini keşfedin.',
    content: 'Detaylı içerik...',
    featured_image: '/blog/ekonomi-pluginleri.jpg',
    author: 'Plugin Uzmanı',
    category: 'Liste',
    tags: ['ekonomi', 'plugin', '2024'],
    published_at: '2024-01-18T14:30:00Z',
    reading_time: 6
  },
  {
    id: 3,
    title: 'Sunucu Performansını Artırmanın 10 Yolu',
    excerpt: 'Minecraft sunucunuzun performansını optimize etmek için pratik ipuçları.',
    content: 'Detaylı içerik...',
    featured_image: '/blog/performans.jpg',
    author: 'Teknik Uzman',
    category: 'Optimizasyon',
    tags: ['performans', 'optimizasyon', 'sunucu'],
    published_at: '2024-01-15T09:15:00Z',
    reading_time: 12
  }
]

export function BlogPreview() {
  const router = useRouter()

  const handlePostClick = (slug: string) => {
    router.push(`/blog/${slug}`)
  }

  const handleViewAll = () => {
    router.push('/blog')
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
            <span className="text-minecraft-green">Blog</span> & Rehberler
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Minecraft sunucu yönetimi, plugin kullanımı ve daha fazlası hakkında güncel içerikler
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card 
                className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                onClick={() => handlePostClick(`post-${post.id}`)}
              >
                <div className="relative overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-minecraft-green/20 to-minecraft-brown/20 flex items-center justify-center">
                    <div className="text-6xl opacity-30">
                      📝
                    </div>
                  </div>
                  <Badge 
                    variant="secondary" 
                    className="absolute top-4 left-4"
                  >
                    {post.category}
                  </Badge>
                </div>

                <CardHeader className="p-6 pb-4">
                  <CardTitle className="text-lg line-clamp-2 group-hover:text-minecraft-green transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-6 pt-0">
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(post.published_at)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{post.reading_time} dk</span>
                      </div>
                    </div>
                    <span>@{post.author}</span>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="w-full group-hover:bg-minecraft-green/10 group-hover:text-minecraft-green transition-colors"
                  >
                    Devamını Oku
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
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
            onClick={handleViewAll}
          >
            Tüm Blog Yazılarını Görüntüle
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
