"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, Gift, CheckCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      toast({
        title: "Hata",
        description: "Lütfen e-posta adresinizi girin.",
        variant: "destructive"
      })
      return
    }

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true)
      setIsLoading(false)
      setEmail('')
      toast({
        title: "Başarılı!",
        description: "Bültenimize başarıyla abone oldunuz. İlk e-postanızı yakında alacaksınız.",
      })
    }, 2000)
  }

  if (isSubscribed) {
    return (
      <section className="py-20 bg-gradient-to-r from-minecraft-green/10 to-minecraft-brown/10">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-background/80 backdrop-blur-sm rounded-2xl p-12 shadow-lg border border-border/50">
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-full bg-green-100 dark:bg-green-900/20">
                  <CheckCircle className="h-12 w-12 text-green-500" />
                </div>
              </div>
              
              <h2 className="text-3xl font-bold mb-4 text-green-600 dark:text-green-400">
                Abone Oldunuz!
              </h2>
              
              <p className="text-muted-foreground text-lg mb-6">
                Bültenimize başarıyla abone oldunuz. Yeni pluginler, kampanyalar ve 
                rehberler hakkında bilgilendirileceksiniz.
              </p>
              
              <Button 
                variant="minecraft-outline"
                onClick={() => setIsSubscribed(false)}
              >
                Yeni E-posta Ekle
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-r from-minecraft-green/10 to-minecraft-brown/10">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-background/80 backdrop-blur-sm rounded-2xl p-12 shadow-lg border border-border/50">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-minecraft-green/10">
                <Mail className="h-12 w-12 text-minecraft-green" />
              </div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-minecraft-green">Bültenimize</span> Abone Olun
            </h2>
            
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Yeni pluginler, özel kampanyalar, rehberler ve Minecraft dünyasından 
              güncel haberler için bültenimize abone olun.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/20 w-fit mx-auto mb-3">
                  <Gift className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="font-semibold mb-2">Özel İndirimler</h3>
                <p className="text-sm text-muted-foreground">
                  Sadece aboneler için özel fiyatlar ve kampanyalar
                </p>
              </div>
              
              <div className="text-center">
                <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/20 w-fit mx-auto mb-3">
                  <Mail className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="font-semibold mb-2">Haftalık Güncellemeler</h3>
                <p className="text-sm text-muted-foreground">
                  Yeni pluginler ve güncellemeler hakkında bilgi
                </p>
              </div>
              
              <div className="text-center">
                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/20 w-fit mx-auto mb-3">
                  <CheckCircle className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="font-semibold mb-2">İstediğiniz Zaman Çıkın</h3>
                <p className="text-sm text-muted-foreground">
                  Tek tıkla abonelikten çıkabilirsiniz
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    type="email"
                    placeholder="E-posta adresiniz"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 text-center sm:text-left"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="h-12 px-8 minecraft-button"
                  disabled={isLoading}
                >
                  {isLoading ? 'Abone Olunuyor...' : 'Abone Ol'}
                </Button>
              </div>
              
              <p className="text-xs text-muted-foreground mt-4">
                E-posta adresinizi paylaşarak{' '}
                <a href="/privacy" className="text-minecraft-green hover:underline">
                  Gizlilik Politikamızı
                </a>{' '}
                kabul etmiş olursunuz.
              </p>
            </form>

            <div className="mt-8 p-4 bg-minecraft-green/5 rounded-lg border border-minecraft-green/20">
              <p className="text-sm text-minecraft-green font-medium">
                🎉 İlk abonelerimize özel: İlk alışverişinizde %10 indirim kazanın!
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
