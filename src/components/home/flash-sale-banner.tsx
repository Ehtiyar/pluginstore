"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { X, Clock, Zap, Tag } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface FlashSale {
  id: string
  title: string
  discount: number
  endTime: Date
  pluginCount: number
}

const mockFlashSale: FlashSale = {
  id: '1',
  title: 'Kış İndirimi',
  discount: 50,
  endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
  pluginCount: 25
}

export function FlashSaleBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const router = useRouter()

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = mockFlashSale.endTime.getTime() - now

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
  }

  const handleShopNow = () => {
    router.push('/plugins?sale=true')
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5 }}
        className="relative bg-gradient-to-r from-red-500 to-orange-500 text-white"
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 animate-pulse" />
                <span className="font-bold text-sm md:text-base">
                  {mockFlashSale.title} - %{mockFlashSale.discount} İndirim!
                </span>
              </div>
              
              <div className="hidden md:flex items-center space-x-2 text-sm">
                <Clock className="h-4 w-4" />
                <span>Kalan Süre:</span>
                <div className="flex items-center space-x-1 font-mono">
                  {timeLeft.days > 0 && (
                    <>
                      <span className="bg-white/20 px-2 py-1 rounded text-xs">
                        {timeLeft.days}d
                      </span>
                      <span>:</span>
                    </>
                  )}
                  <span className="bg-white/20 px-2 py-1 rounded text-xs">
                    {timeLeft.hours.toString().padStart(2, '0')}h
                  </span>
                  <span>:</span>
                  <span className="bg-white/20 px-2 py-1 rounded text-xs">
                    {timeLeft.minutes.toString().padStart(2, '0')}m
                  </span>
                  <span>:</span>
                  <span className="bg-white/20 px-2 py-1 rounded text-xs">
                    {timeLeft.seconds.toString().padStart(2, '0')}s
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="hidden sm:flex items-center space-x-2 text-sm">
                <Tag className="h-4 w-4" />
                <span>{mockFlashSale.pluginCount} plugin indirimde</span>
              </div>
              
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                onClick={handleShopNow}
              >
                Hemen Al
              </Button>
              
              <Button
                size="sm"
                variant="ghost"
                className="text-white hover:bg-white/20 p-1"
                onClick={handleClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Mobile countdown */}
          <div className="md:hidden mt-2 text-center">
            <div className="flex items-center justify-center space-x-1 text-sm font-mono">
              <span>Kalan:</span>
              {timeLeft.days > 0 && (
                <>
                  <span className="bg-white/20 px-2 py-1 rounded text-xs">
                    {timeLeft.days}d
                  </span>
                  <span>:</span>
                </>
              )}
              <span className="bg-white/20 px-2 py-1 rounded text-xs">
                {timeLeft.hours.toString().padStart(2, '0')}h
              </span>
              <span>:</span>
              <span className="bg-white/20 px-2 py-1 rounded text-xs">
                {timeLeft.minutes.toString().padStart(2, '0')}m
              </span>
              <span>:</span>
              <span className="bg-white/20 px-2 py-1 rounded text-xs">
                {timeLeft.seconds.toString().padStart(2, '0')}s
              </span>
            </div>
          </div>
        </div>

        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1 -left-1 w-2 h-2 bg-white/30 rounded-full animate-ping"></div>
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-white/30 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white/30 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white/30 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
