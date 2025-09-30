import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number, currency: string = 'TRY'): string {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: currency,
  }).format(price)
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

export function formatDateTime(date: string | Date): string {
  return new Intl.DateTimeFormat('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

export function generateRandomId(): string {
  return Math.random().toString(36).substr(2, 9)
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

export function calculateDiscount(originalPrice: number, discountValue: number, discountType: 'percentage' | 'fixed'): number {
  if (discountType === 'percentage') {
    return originalPrice * (1 - discountValue / 100)
  }
  return Math.max(0, originalPrice - discountValue)
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidPassword(password: string): boolean {
  // Minimum 8 characters, at least one letter and one number
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/
  return passwordRegex.test(password)
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function getFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export function getMinecraftVersionColor(version: string): string {
  const versionColors: { [key: string]: string } = {
    '1.8': 'bg-red-500',
    '1.9': 'bg-orange-500',
    '1.10': 'bg-yellow-500',
    '1.11': 'bg-lime-500',
    '1.12': 'bg-green-500',
    '1.13': 'bg-emerald-500',
    '1.14': 'bg-teal-500',
    '1.15': 'bg-cyan-500',
    '1.16': 'bg-blue-500',
    '1.17': 'bg-indigo-500',
    '1.18': 'bg-purple-500',
    '1.19': 'bg-pink-500',
    '1.20': 'bg-rose-500',
  }
  
  const majorVersion = version.split('.')[0] + '.' + version.split('.')[1]
  return versionColors[majorVersion] || 'bg-gray-500'
}

export function getCategoryIcon(category: string): string {
  const categoryIcons: { [key: string]: string } = {
    'economy': '💰',
    'minigames': '🎮',
    'admin': '⚙️',
    'survival': '🏕️',
    'pvp': '⚔️',
    'creative': '🎨',
    'utility': '🔧',
    'world': '🌍',
    'chat': '💬',
    'security': '🔒',
    'performance': '⚡',
    'api': '🔌',
  }
  
  return categoryIcons[category.toLowerCase()] || '📦'
}

export function getLicenseTypeText(licenseType: string): string {
  const licenseTypes: { [key: string]: string } = {
    'single': 'Tek Sunucu',
    'multi': 'Çoklu Sunucu',
    'lifetime': 'Yaşam Boyu',
    'unlimited': 'Sınırsız',
  }
  
  return licenseTypes[licenseType] || licenseType
}

export function getOrderStatusText(status: string): string {
  const statusTexts: { [key: string]: string } = {
    'pending': 'Beklemede',
    'processing': 'İşleniyor',
    'completed': 'Tamamlandı',
    'cancelled': 'İptal Edildi',
    'refunded': 'İade Edildi',
  }
  
  return statusTexts[status] || status
}

export function getOrderStatusColor(status: string): string {
  const statusColors: { [key: string]: string } = {
    'pending': 'bg-yellow-500',
    'processing': 'bg-blue-500',
    'completed': 'bg-green-500',
    'cancelled': 'bg-red-500',
    'refunded': 'bg-gray-500',
  }
  
  return statusColors[status] || 'bg-gray-500'
}

export function generateCouponCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200
  const words = text.split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

export function getTimeAgo(date: string | Date): string {
  const now = new Date()
  const past = new Date(date)
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000)
  
  if (diffInSeconds < 60) return 'Az önce'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} dakika önce`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} saat önce`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} gün önce`
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} ay önce`
  return `${Math.floor(diffInSeconds / 31536000)} yıl önce`
}
