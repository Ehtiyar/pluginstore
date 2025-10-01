import Link from 'next/link'
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Heart
} from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-minecraft-green rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="font-bold text-xl minecraft-text text-minecraft-green">
                Plugin Store
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Türkiye'nin en kapsamlı Minecraft plugin mağazası. 
              Sunucunuz için en kaliteli eklentileri keşfedin.
            </p>
            <div className="flex space-x-4">
              <Link 
                href="https://discord.gg/your-discord" 
                className="text-muted-foreground hover:text-minecraft-green transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-5 w-5" />
              </Link>
              <Link 
                href="https://twitter.com/your-twitter" 
                className="text-muted-foreground hover:text-minecraft-green transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link 
                href="https://instagram.com/your-instagram" 
                className="text-muted-foreground hover:text-minecraft-green transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link 
                href="https://youtube.com/your-youtube" 
                className="text-muted-foreground hover:text-minecraft-green transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Hızlı Linkler</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  href="/plugins" 
                  className="text-muted-foreground hover:text-minecraft-green transition-colors"
                >
                  Tüm Pluginler
                </Link>
              </li>
              <li>
                <Link 
                  href="/categories" 
                  className="text-muted-foreground hover:text-minecraft-green transition-colors"
                >
                  Kategoriler
                </Link>
              </li>
              <li>
                <Link 
                  href="/blog" 
                  className="text-muted-foreground hover:text-minecraft-green transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link 
                  href="/faq" 
                  className="text-muted-foreground hover:text-minecraft-green transition-colors"
                >
                  Sık Sorulan Sorular
                </Link>
              </li>
              <li>
                <Link 
                  href="/support" 
                  className="text-muted-foreground hover:text-minecraft-green transition-colors"
                >
                  Destek
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Kategoriler</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  href="/categories/economy" 
                  className="text-muted-foreground hover:text-minecraft-green transition-colors"
                >
                  💰 Ekonomi
                </Link>
              </li>
              <li>
                <Link 
                  href="/categories/minigames" 
                  className="text-muted-foreground hover:text-minecraft-green transition-colors"
                >
                  🎮 Minigame
                </Link>
              </li>
              <li>
                <Link 
                  href="/categories/admin" 
                  className="text-muted-foreground hover:text-minecraft-green transition-colors"
                >
                  ⚙️ Admin Araçları
                </Link>
              </li>
              <li>
                <Link 
                  href="/categories/survival" 
                  className="text-muted-foreground hover:text-minecraft-green transition-colors"
                >
                  🏕️ Survival
                </Link>
              </li>
              <li>
                <Link 
                  href="/categories/pvp" 
                  className="text-muted-foreground hover:text-minecraft-green transition-colors"
                >
                  ⚔️ PvP
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">İletişim</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-minecraft-green" />
                <span className="text-muted-foreground">info@pluginstore.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-minecraft-green" />
                <span className="text-muted-foreground">+90 (555) 123 45 67</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-minecraft-green" />
                <span className="text-muted-foreground">İstanbul, Türkiye</span>
              </div>
            </div>
            
            {/* Newsletter Signup */}
            <div className="pt-4">
              <h4 className="font-medium mb-2">Bülten</h4>
              <p className="text-xs text-muted-foreground mb-2">
                Yeni pluginler ve kampanyalardan haberdar olun
              </p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="E-posta adresiniz"
                  className="flex-1 px-3 py-2 text-sm border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-minecraft-green"
                />
                <button className="px-4 py-2 bg-minecraft-green text-white text-sm rounded-md hover:bg-minecraft-green/90 transition-colors">
                  Abone Ol
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-muted-foreground">
              <p>&copy; 2024 Minecraft Plugin Store. Tüm hakları saklıdır.</p>
              <div className="flex space-x-4">
                <Link 
                  href="/privacy" 
                  className="hover:text-minecraft-green transition-colors"
                >
                  Gizlilik Politikası
                </Link>
                <Link 
                  href="/terms" 
                  className="hover:text-minecraft-green transition-colors"
                >
                  Kullanım Şartları
                </Link>
                <Link 
                  href="/refund" 
                  className="hover:text-minecraft-green transition-colors"
                >
                  İade Politikası
                </Link>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>in Turkey</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
