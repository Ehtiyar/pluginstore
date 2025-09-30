"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Star, Download, Users, Zap } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/plugins?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  const stats = [
    { icon: Download, value: '50K+', label: 'İndirme' },
    { icon: Users, value: '10K+', label: 'Mutlu Müşteri' },
    { icon: Star, value: '4.9', label: 'Ortalama Puan' },
    { icon: Zap, value: '500+', label: 'Aktif Plugin' },
  ]

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-minecraft-green/10 via-background to-minecraft-brown/10">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="block-pattern h-full w-full"></div>
      </div>
      
      <div className="container mx-auto px-4 py-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.h1 
                className="text-4xl md:text-6xl font-bold leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="text-minecraft-green minecraft-text">
                  Türkiye'nin En İyi
                </span>
                <br />
                <span className="text-foreground">
                  Minecraft Plugin Mağazası
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-muted-foreground leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Sunucunuz için en kaliteli pluginleri keşfedin. Ekonomi, minigame, 
                admin araçları ve daha fazlası. Güvenli ödeme, hızlı teslimat.
              </motion.p>
            </div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <form onSubmit={handleSearch} className="relative max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Hangi plugin'i arıyorsunuz?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 h-14 text-lg border-2 border-minecraft-green/20 focus:border-minecraft-green"
                />
                <Button 
                  type="submit" 
                  className="absolute right-2 top-2 h-10 px-6 minecraft-button"
                >
                  Ara
                </Button>
              </form>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Button 
                size="lg" 
                className="minecraft-button text-lg px-8 py-6"
                onClick={() => router.push('/plugins')}
              >
                Pluginleri Keşfet
              </Button>
              <Button 
                variant="minecraft-outline" 
                size="lg" 
                className="text-lg px-8 py-6"
                onClick={() => router.push('/blog')}
              >
                Blog'u İncele
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <stat.icon className="h-6 w-6 text-minecraft-green mr-2" />
                    <span className="text-2xl font-bold text-minecraft-green">
                      {stat.value}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Hero Image/Animation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative">
              {/* Minecraft-style blocks animation */}
              <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
                {Array.from({ length: 16 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-16 bg-gradient-to-br from-minecraft-green to-minecraft-green/80 rounded border-2 border-minecraft-green/20"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 1.2 + (i * 0.05),
                      type: "spring",
                      stiffness: 200
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      rotate: [0, -5, 5, 0],
                      transition: { duration: 0.3 }
                    }}
                  />
                ))}
              </div>
              
              {/* Floating elements */}
              <motion.div
                className="absolute -top-4 -right-4 bg-minecraft-brown text-white p-3 rounded-lg shadow-lg"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="text-sm font-bold">💰 Ekonomi</div>
                <div className="text-xs opacity-80">En Popüler</div>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 bg-minecraft-green text-white p-3 rounded-lg shadow-lg"
                animate={{ 
                  y: [0, 10, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5
                }}
              >
                <div className="text-sm font-bold">🎮 Minigame</div>
                <div className="text-xs opacity-80">Yeni Eklendi</div>
              </motion.div>

              <motion.div
                className="absolute top-1/2 -right-8 bg-yellow-500 text-white p-2 rounded-full shadow-lg"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Star className="h-4 w-4" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
