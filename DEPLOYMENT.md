# Deployment Guide - Minecraft Plugin Store

Bu rehber, Minecraft Plugin Store'u Netlify'da nasıl deploy edeceğinizi adım adım açıklar.

## 🚀 Netlify Deployment

### 1. Projeyi GitHub'a Yükleyin

```bash
# Git repository oluşturun
git init
git add .
git commit -m "Initial commit"

# GitHub'da yeni repository oluşturun ve bağlayın
git remote add origin https://github.com/your-username/minecraft-plugin-store.git
git branch -M main
git push -u origin main
```

### 2. Netlify Hesabı Oluşturun

1. [Netlify](https://netlify.com) sitesine gidin
2. "Sign up" butonuna tıklayın
3. GitHub hesabınızla giriş yapın

### 3. Yeni Site Oluşturun

1. Netlify dashboard'da "New site from Git" butonuna tıklayın
2. "GitHub" seçeneğini seçin
3. Repository'nizi seçin
4. Build ayarlarını yapılandırın:

```
Build command: npm run build
Publish directory: .next
```

### 4. Environment Variables Ayarlayın

Netlify dashboard > Site settings > Environment variables bölümünde şu değişkenleri ekleyin:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# İyzico
IYZICO_API_KEY=your_iyzico_api_key
IYZICO_SECRET_KEY=your_iyzico_secret_key
IYZICO_BASE_URL=https://sandbox-api.iyzipay.com

# Site
NEXT_PUBLIC_SITE_URL=https://your-site-name.netlify.app
```

### 5. Supabase Kurulumu

#### 5.1 Supabase Projesi Oluşturun

1. [Supabase](https://supabase.com) hesabı oluşturun
2. "New project" butonuna tıklayın
3. Proje adı ve şifre belirleyin
4. Region olarak "Europe West (Ireland)" seçin

#### 5.2 Database Schema'yı Yükleyin

1. Supabase dashboard'da "SQL Editor" sekmesine gidin
2. `supabase-schema.sql` dosyasının içeriğini kopyalayın
3. SQL Editor'de çalıştırın

#### 5.3 API Keys'i Alın

1. "Settings" > "API" sekmesine gidin
2. "Project URL" ve "anon public" key'i kopyalayın
3. Netlify environment variables'a ekleyin

### 6. Ödeme Sistemleri Kurulumu

#### 6.1 Stripe Kurulumu

1. [Stripe](https://stripe.com) hesabı oluşturun
2. Dashboard'da "Developers" > "API keys" sekmesine gidin
3. Publishable key ve Secret key'i alın
4. Netlify environment variables'a ekleyin

#### 6.2 İyzico Kurulumu

1. [İyzico](https://iyzico.com) hesabı oluşturun
2. Sandbox API key'lerinizi alın
3. Netlify environment variables'a ekleyin

### 7. Domain Ayarları (Opsiyonel)

#### 7.1 Custom Domain Ekleme

1. Netlify dashboard'da "Domain settings" sekmesine gidin
2. "Add custom domain" butonuna tıklayın
3. Domain adınızı girin
4. DNS ayarlarını yapın

#### 7.2 SSL Sertifikası

Netlify otomatik olarak SSL sertifikası sağlar. Custom domain eklediğinizde otomatik olarak aktif olur.

### 8. Build ve Deploy

1. Netlify'da "Deploys" sekmesine gidin
2. "Trigger deploy" > "Deploy site" butonuna tıklayın
3. Build sürecini takip edin
4. Site başarıyla deploy olduğunda URL'yi alın

## 🔧 Geliştirme Ortamı

### Local Development

```bash
# Bağımlılıkları yükleyin
npm install

# Environment variables ayarlayın
cp .env.local.example .env.local

# Geliştirme sunucusunu başlatın
npm run dev
```

### Environment Variables (.env.local)

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_local_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_local_service_role_key

# Stripe (Test keys)
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# İyzico (Sandbox)
IYZICO_API_KEY=sandbox-...
IYZICO_SECRET_KEY=sandbox-...
IYZICO_BASE_URL=https://sandbox-api.iyzipay.com

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 📊 Monitoring ve Analytics

### 1. Netlify Analytics

Netlify dashboard'da "Analytics" sekmesinden site istatistiklerini görüntüleyebilirsiniz.

### 2. Google Analytics

1. [Google Analytics](https://analytics.google.com) hesabı oluşturun
2. Tracking ID'yi alın
3. `_app.tsx` dosyasına Google Analytics kodunu ekleyin

### 3. Error Tracking

Netlify'da "Functions" sekmesinden serverless function loglarını görüntüleyebilirsiniz.

## 🔒 Güvenlik

### 1. Environment Variables

- Hassas bilgileri asla kod içinde saklamayın
- Environment variables'ları Netlify dashboard'da güvenli şekilde saklayın
- Production ve development için farklı API key'leri kullanın

### 2. CORS Ayarları

Supabase'de CORS ayarlarını yapılandırın:

```sql
-- Supabase SQL Editor'de çalıştırın
UPDATE auth.config 
SET site_url = 'https://your-site-name.netlify.app',
    additional_redirect_urls = '["https://your-site-name.netlify.app/**"]'
WHERE id = 1;
```

### 3. Rate Limiting

Netlify'da rate limiting ayarlarını yapılandırın:

```toml
# netlify.toml
[[headers]]
  for = "/api/*"
  [headers.values]
    X-RateLimit-Limit = "100"
    X-RateLimit-Remaining = "99"
```

## 🚀 Performance Optimizasyonu

### 1. Build Optimizasyonu

```bash
# Production build
npm run build

# Build analizi
npm run analyze
```

### 2. Image Optimization

```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['your-domain.com'],
    formats: ['image/webp', 'image/avif'],
  },
}
```

### 3. Caching

Netlify otomatik olarak static dosyalar için caching sağlar. `netlify.toml` dosyasında cache ayarlarını özelleştirebilirsiniz.

## 🔄 CI/CD Pipeline

### 1. Automatic Deploys

Netlify otomatik olarak GitHub'daki değişiklikleri deploy eder:

- `main` branch'e push → Production deploy
- Diğer branch'lere push → Preview deploy

### 2. Build Hooks

```bash
# Manual deploy için build hook URL'i
curl -X POST -d {} https://api.netlify.com/build_hooks/YOUR_BUILD_HOOK_ID
```

## 📱 Mobile Optimization

### 1. PWA Support

```javascript
// next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
})

module.exports = withPWA({
  // your config
})
```

### 2. Responsive Images

```javascript
import Image from 'next/image'

<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  priority
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

## 🐛 Troubleshooting

### Common Issues

1. **Build Failures**
   - Node.js version'ını kontrol edin (18+)
   - Environment variables'ları kontrol edin
   - Dependencies'leri güncelleyin

2. **Database Connection Issues**
   - Supabase URL ve key'leri kontrol edin
   - CORS ayarlarını kontrol edin
   - Database schema'sını kontrol edin

3. **Payment Issues**
   - API key'leri kontrol edin
   - Webhook URL'lerini ayarlayın
   - Test mode'da olduğunuzdan emin olun

### Debug Mode

```bash
# Debug mode'da çalıştırın
DEBUG=* npm run dev
```

## 📞 Support

- **Netlify Support:** [Netlify Support](https://support.netlify.com)
- **Supabase Support:** [Supabase Support](https://supabase.com/support)
- **Next.js Support:** [Next.js Documentation](https://nextjs.org/docs)

---

**Başarılı deployment için bu adımları sırasıyla takip edin!** 🚀
