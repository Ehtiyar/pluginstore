"use client"

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const testimonials = [
  {
    id: 1,
    name: 'Ahmet Yılmaz',
    role: 'Sunucu Sahibi',
    avatar: '/avatars/ahmet.jpg',
    content: 'Bu platform sayesinde sunucum için mükemmel pluginleri buldum. Ödeme sistemi çok güvenli ve destek ekibi çok yardımcı.',
    rating: 5,
    server: 'MinecraftTR'
  },
  {
    id: 2,
    name: 'Elif Kaya',
    role: 'Admin',
    avatar: '/avatars/elif.jpg',
    content: 'Plugin kalitesi gerçekten yüksek. Kurulum rehberleri çok detaylı ve sorun yaşadığımda hemen çözüm buldum.',
    rating: 5,
    server: 'SurvivalCraft'
  },
  {
    id: 3,
    name: 'Mehmet Demir',
    role: 'Geliştirici',
    avatar: '/avatars/mehmet.jpg',
    content: 'API dokümantasyonu çok iyi hazırlanmış. Kendi pluginlerimi burada satmaya başladım ve çok memnunum.',
    rating: 5,
    server: 'DevCraft'
  },
  {
    id: 4,
    name: 'Zeynep Özkan',
    role: 'Sunucu Sahibi',
    avatar: '/avatars/zeynep.jpg',
    content: 'Fiyatlar çok uygun ve kalite çok yüksek. Özellikle ekonomi pluginleri harika çalışıyor.',
    rating: 5,
    server: 'EconomyCraft'
  },
  {
    id: 5,
    name: 'Can Arslan',
    role: 'Moderator',
    avatar: '/avatars/can.jpg',
    content: 'Admin araçları gerçekten profesyonel. Sunucu yönetimim çok kolaylaştı.',
    rating: 5,
    server: 'AdminCraft'
  },
  {
    id: 6,
    name: 'Selin Yıldız',
    role: 'Sunucu Sahibi',
    avatar: '/avatars/selin.jpg',
    content: 'Minigame pluginleri oyuncularımı çok eğlendiriyor. Sürekli güncellemeler geliyor.',
    rating: 5,
    server: 'GameCraft'
  }
]

export function TestimonialsSection() {
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
            <span className="text-minecraft-green">Müşteri</span> Yorumları
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Topluluğumuzun bizim hakkımızda söyledikleri
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Quote className="h-8 w-8 text-minecraft-green/30" />
                  </div>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback>
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-sm">{testimonial.name}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                        <p className="text-xs text-minecraft-green font-medium">{testimonial.server}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
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
          <div className="bg-minecraft-green/10 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-minecraft-green">
              Siz de Deneyimlerinizi Paylaşın!
            </h3>
            <p className="text-muted-foreground mb-6">
              Pluginlerimizi kullandıktan sonra deneyimlerinizi bizimle paylaşın. 
              Yorumlarınız diğer kullanıcılar için çok değerli.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="minecraft-button px-6 py-3">
                Yorum Yaz
              </button>
              <button className="minecraft-outline px-6 py-3">
                Discord'a Katıl
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
