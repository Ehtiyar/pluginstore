"use client"

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Download, Users, Star, Zap, TrendingUp, Award } from 'lucide-react'

const stats = [
  {
    icon: Download,
    value: 50000,
    suffix: '+',
    label: 'Toplam İndirme',
    color: 'text-blue-500'
  },
  {
    icon: Users,
    value: 10000,
    suffix: '+',
    label: 'Mutlu Müşteri',
    color: 'text-green-500'
  },
  {
    icon: Star,
    value: 4.9,
    suffix: '/5',
    label: 'Ortalama Puan',
    color: 'text-yellow-500'
  },
  {
    icon: Zap,
    value: 500,
    suffix: '+',
    label: 'Aktif Plugin',
    color: 'text-purple-500'
  },
  {
    icon: TrendingUp,
    value: 99,
    suffix: '%',
    label: 'Müşteri Memnuniyeti',
    color: 'text-emerald-500'
  },
  {
    icon: Award,
    value: 24,
    suffix: '/7',
    label: 'Destek Hizmeti',
    color: 'text-orange-500'
  }
]

export function StatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section className="py-20 bg-gradient-to-r from-minecraft-green/10 to-minecraft-brown/10">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-minecraft-green">Rakamlarla</span> Başarımız
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Topluluğumuzun güvenini kazandığımızı gösteren istatistikler
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-background/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-border/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-full bg-muted/50">
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </div>
                
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                  className="mb-2"
                >
                  <span className="text-4xl md:text-5xl font-bold text-foreground">
                    {typeof stat.value === 'number' && stat.value > 10 
                      ? stat.value.toLocaleString() 
                      : stat.value}
                  </span>
                  <span className="text-2xl md:text-3xl font-bold text-minecraft-green">
                    {stat.suffix}
                  </span>
                </motion.div>
                
                <p className="text-muted-foreground font-medium">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground mb-8">
            Güvenilir ödeme yöntemleri ve güvenlik sertifikaları
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <span className="text-sm font-semibold text-gray-600">SSL Güvenlik</span>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <span className="text-sm font-semibold text-gray-600">İyzico</span>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <span className="text-sm font-semibold text-gray-600">Stripe</span>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <span className="text-sm font-semibold text-gray-600">PayPal</span>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <span className="text-sm font-semibold text-gray-600">KVKK Uyumlu</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
