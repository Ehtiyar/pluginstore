# Minecraft Plugin Store

Türkiye'nin en kapsamlı Minecraft plugin mağazası. Modern, güvenli ve kullanıcı dostu bir platform.

## 🚀 Özellikler

### 👥 Kullanıcı Yönetimi
- Email ve şifre ile kayıt/giriş
- Minecraft kullanıcı adı bağlama
- Profil yönetimi ve avatar yükleme
- İstek listesi ve favoriler
- İndirme geçmişi
- API anahtarı oluşturma

### 🛍️ E-ticaret Sistemi
- Plugin kategorileri ve filtreleme
- Gelişmiş arama sistemi
- Sepet ve ödeme sistemi
- İndirim kuponları
- Sipariş takibi
- İndirme yönetimi

### 💳 Ödeme Sistemleri
- İyzico (Türk ödeme sistemi)
- Stripe (Uluslararası)
- PayPal
- Papara
- Banka transferi
- Kripto para (opsiyonel)

### 📝 Blog Sistemi
- SEO optimizasyonlu blog yazıları
- Kategori ve etiket sistemi
- Yorum sistemi
- Sosyal medya paylaşımı

### 🎨 Minecraft Teması
- Pixelated tasarım
- Minecraft renk paleti
- Animasyonlar ve efektler
- Responsive tasarım

## 🛠️ Teknoloji Stack

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Framer Motion** - Animations
- **Zustand** - State management

### Backend
- **Supabase** - Database ve Authentication
- **PostgreSQL** - Database
- **Row Level Security** - Güvenlik

### Ödeme
- **İyzico** - Türk ödeme sistemi
- **Stripe** - Uluslararası ödeme
- **PayPal** - Alternatif ödeme

## 📦 Kurulum

### Gereksinimler
- Node.js 18+ 
- npm veya yarn
- Supabase hesabı

### 1. Projeyi Klonlayın
```bash
git clone <repository-url>
cd minecraft-plugin-store
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
# veya
yarn install
```

### 3. Environment Variables
`.env.local` dosyası oluşturun:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe Configuration
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# İyzico Configuration
IYZICO_API_KEY=your_iyzico_api_key
IYZICO_SECRET_KEY=your_iyzico_secret_key
IYZICO_BASE_URL=https://sandbox-api.iyzipay.com

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Supabase Kurulumu

1. [Supabase](https://supabase.com) hesabı oluşturun
2. Yeni proje oluşturun
3. `supabase-schema.sql` dosyasını çalıştırın
4. Environment variables'ları güncelleyin

### 5. Geliştirme Sunucusunu Başlatın
```bash
npm run dev
# veya
yarn dev
```

Site `http://localhost:3000` adresinde çalışacak.

## 🗄️ Veritabanı Şeması

### Ana Tablolar
- **profiles** - Kullanıcı profilleri
- **categories** - Plugin kategorileri
- **plugins** - Plugin bilgileri
- **reviews** - Kullanıcı yorumları
- **orders** - Siparişler
- **order_items** - Sipariş detayları
- **downloads** - İndirme kayıtları
- **wishlist** - İstek listesi
- **blog_posts** - Blog yazıları
- **discounts** - İndirim kuponları

### Güvenlik
- Row Level Security (RLS) aktif
- Kullanıcı bazlı erişim kontrolü
- API anahtarı sistemi

## 🚀 Deployment

### Netlify ile Deploy

1. **Netlify hesabı oluşturun**
2. **GitHub repository'yi bağlayın**
3. **Build ayarları:**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: `18`

4. **Environment variables ekleyin:**
   - Netlify dashboard > Site settings > Environment variables

5. **Deploy edin**

### Vercel ile Deploy

```bash
npm i -g vercel
vercel
```

## 📱 Responsive Tasarım

- **Mobile First** yaklaşım
- **Breakpoints:**
  - Mobile: 320px+
  - Tablet: 768px+
  - Desktop: 1024px+
  - Large: 1440px+

## 🎨 Tema Sistemi

- **Light/Dark mode** desteği
- **Minecraft renk paleti**
- **Custom CSS variables**
- **Tailwind CSS** entegrasyonu

## 🔒 Güvenlik

- **SSL/TLS** şifreleme
- **CSRF** koruması
- **XSS** koruması
- **SQL Injection** koruması
- **Rate limiting**
- **Input validation**

## 📊 SEO Optimizasyonu

- **Meta tags** optimizasyonu
- **Open Graph** desteği
- **Twitter Cards**
- **Sitemap** oluşturma
- **Schema markup**
- **Performance** optimizasyonu

## 🧪 Test

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Type checking
npm run type-check

# Linting
npm run lint
```

## 📈 Performance

- **Lighthouse Score:** 90+
- **Core Web Vitals** optimizasyonu
- **Image optimization**
- **Code splitting**
- **Lazy loading**

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakın.

## 📞 Destek

- **Email:** support@pluginstore.com
- **Discord:** [Discord Server](https://discord.gg/your-discord)
- **GitHub Issues:** [Issues](https://github.com/your-repo/issues)

## 🙏 Teşekkürler

- [Next.js](https://nextjs.org/) - React framework
- [Supabase](https://supabase.com/) - Backend as a Service
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Framer Motion](https://www.framer.com/motion/) - Animation library

---

**Minecraft Plugin Store** - Türkiye'nin en iyi plugin mağazası 🎮
