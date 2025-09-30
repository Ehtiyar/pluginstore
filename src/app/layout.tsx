import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/components/auth/auth-provider'
import { Toaster } from '@/components/ui/toaster'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Minecraft Plugin Store - Türkiye\'nin En İyi Plugin Mağazası',
  description: 'Minecraft sunucunuz için en kaliteli pluginleri keşfedin. Ekonomi, minigame, admin araçları ve daha fazlası. Güvenli ödeme, hızlı teslimat.',
  keywords: 'minecraft plugin, minecraft sunucu, plugin mağazası, minecraft türkiye, sunucu eklentileri',
  authors: [{ name: 'Minecraft Plugin Store' }],
  creator: 'Minecraft Plugin Store',
  publisher: 'Minecraft Plugin Store',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    title: 'Minecraft Plugin Store - Türkiye\'nin En İyi Plugin Mağazası',
    description: 'Minecraft sunucunuz için en kaliteli pluginleri keşfedin. Ekonomi, minigame, admin araçları ve daha fazlası.',
    siteName: 'Minecraft Plugin Store',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Minecraft Plugin Store - Türkiye\'nin En İyi Plugin Mağazası',
    description: 'Minecraft sunucunuz için en kaliteli pluginleri keşfedin. Ekonomi, minigame, admin araçları ve daha fazlası.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#5E9A4D" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <div className="min-h-screen bg-background flex flex-col">
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
