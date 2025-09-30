import { HeroSection } from '@/components/home/hero-section'
import { FeaturedPlugins } from '@/components/home/featured-plugins'
import { CategoriesSection } from '@/components/home/categories-section'
import { StatsSection } from '@/components/home/stats-section'
import { TestimonialsSection } from '@/components/home/testimonials-section'
import { BlogPreview } from '@/components/home/blog-preview'
import { NewsletterSection } from '@/components/home/newsletter-section'
import { FlashSaleBanner } from '@/components/home/flash-sale-banner'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Flash Sale Banner */}
      <FlashSaleBanner />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Featured Plugins */}
      <FeaturedPlugins />
      
      {/* Categories Section */}
      <CategoriesSection />
      
      {/* Stats Section */}
      <StatsSection />
      
      {/* Testimonials */}
      <TestimonialsSection />
      
      {/* Blog Preview */}
      <BlogPreview />
      
      {/* Newsletter Signup */}
      <NewsletterSection />
    </div>
  )
}
