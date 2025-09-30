-- Minecraft Plugin Store Database Schema
-- This file contains all the necessary tables and relationships for the plugin store

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Create custom types
CREATE TYPE order_status AS ENUM ('pending', 'processing', 'completed', 'cancelled', 'refunded');
CREATE TYPE license_type AS ENUM ('single', 'multi', 'lifetime', 'unlimited');
CREATE TYPE discount_type AS ENUM ('percentage', 'fixed');
CREATE TYPE payment_method AS ENUM ('card', 'bank_transfer', 'papara', 'payfix', 'iyzico', 'paypal', 'crypto');

-- Users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    minecraft_username TEXT,
    bio TEXT,
    website TEXT,
    location TEXT,
    notification_settings JSONB DEFAULT '{
        "email_notifications": true,
        "order_updates": true,
        "plugin_updates": true,
        "newsletter": true,
        "marketing": false
    }'::jsonb,
    api_key TEXT UNIQUE,
    referral_code TEXT UNIQUE,
    total_spent DECIMAL(10,2) DEFAULT 0,
    total_orders INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Categories table
CREATE TABLE public.categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    icon TEXT,
    color TEXT,
    plugin_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Plugins table
CREATE TABLE public.plugins (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    long_description TEXT,
    price DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'TRY',
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    developer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    version TEXT NOT NULL,
    minecraft_versions TEXT[] DEFAULT '{}',
    dependencies TEXT[] DEFAULT '{}',
    commands TEXT[] DEFAULT '{}',
    permissions TEXT[] DEFAULT '{}',
    installation_guide TEXT,
    configuration_example TEXT,
    changelog TEXT,
    license_type license_type NOT NULL,
    file_url TEXT,
    demo_file_url TEXT,
    screenshots TEXT[] DEFAULT '{}',
    video_url TEXT,
    download_count INTEGER DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table
CREATE TABLE public.reviews (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    plugin_id UUID REFERENCES public.plugins(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    is_verified_purchase BOOLEAN DEFAULT false,
    helpful_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(plugin_id, user_id)
);

-- Orders table
CREATE TABLE public.orders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    total_amount DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'TRY',
    status order_status DEFAULT 'pending',
    payment_method payment_method NOT NULL,
    payment_id TEXT,
    billing_info JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order items table
CREATE TABLE public.order_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    plugin_id UUID REFERENCES public.plugins(id) ON DELETE CASCADE,
    quantity INTEGER DEFAULT 1,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Downloads table
CREATE TABLE public.downloads (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    plugin_id UUID REFERENCES public.plugins(id) ON DELETE CASCADE,
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    download_count INTEGER DEFAULT 0,
    last_downloaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Wishlist table
CREATE TABLE public.wishlist (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    plugin_id UUID REFERENCES public.plugins(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, plugin_id)
);

-- Blog posts table
CREATE TABLE public.blog_posts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    featured_image TEXT,
    author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    category TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Discounts table
CREATE TABLE public.discounts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    code TEXT UNIQUE NOT NULL,
    type discount_type NOT NULL,
    value DECIMAL(10,2) NOT NULL,
    min_amount DECIMAL(10,2),
    max_uses INTEGER,
    used_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    starts_at TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Support tickets table
CREATE TABLE public.support_tickets (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
    attachments TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Newsletter subscriptions table
CREATE TABLE public.newsletter_subscriptions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    preferences JSONB DEFAULT '{
        "plugin_updates": true,
        "blog_posts": true,
        "promotions": true,
        "news": true
    }'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- File uploads table
CREATE TABLE public.file_uploads (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    filename TEXT NOT NULL,
    original_name TEXT NOT NULL,
    size BIGINT NOT NULL,
    mime_type TEXT NOT NULL,
    url TEXT NOT NULL,
    uploaded_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- System settings table
CREATE TABLE public.system_settings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    key TEXT UNIQUE NOT NULL,
    value JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_plugins_category_id ON public.plugins(category_id);
CREATE INDEX idx_plugins_developer_id ON public.plugins(developer_id);
CREATE INDEX idx_plugins_is_featured ON public.plugins(is_featured);
CREATE INDEX idx_plugins_is_active ON public.plugins(is_active);
CREATE INDEX idx_plugins_rating ON public.plugins(rating);
CREATE INDEX idx_plugins_download_count ON public.plugins(download_count);
CREATE INDEX idx_plugins_created_at ON public.plugins(created_at);

CREATE INDEX idx_reviews_plugin_id ON public.reviews(plugin_id);
CREATE INDEX idx_reviews_user_id ON public.reviews(user_id);
CREATE INDEX idx_reviews_rating ON public.reviews(rating);

CREATE INDEX idx_orders_user_id ON public.orders(user_id);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_orders_created_at ON public.orders(created_at);

CREATE INDEX idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX idx_order_items_plugin_id ON public.order_items(plugin_id);

CREATE INDEX idx_downloads_user_id ON public.downloads(user_id);
CREATE INDEX idx_downloads_plugin_id ON public.downloads(plugin_id);

CREATE INDEX idx_wishlist_user_id ON public.wishlist(user_id);
CREATE INDEX idx_wishlist_plugin_id ON public.wishlist(plugin_id);

CREATE INDEX idx_blog_posts_author_id ON public.blog_posts(author_id);
CREATE INDEX idx_blog_posts_is_published ON public.blog_posts(is_published);
CREATE INDEX idx_blog_posts_published_at ON public.blog_posts(published_at);

CREATE INDEX idx_discounts_code ON public.discounts(code);
CREATE INDEX idx_discounts_is_active ON public.discounts(is_active);

-- Create full-text search indexes
CREATE INDEX idx_plugins_search ON public.plugins USING gin(to_tsvector('turkish', name || ' ' || description));
CREATE INDEX idx_blog_posts_search ON public.blog_posts USING gin(to_tsvector('turkish', title || ' ' || content));

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_plugins_updated_at BEFORE UPDATE ON public.plugins FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON public.reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_discounts_updated_at BEFORE UPDATE ON public.discounts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_support_tickets_updated_at BEFORE UPDATE ON public.support_tickets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_newsletter_subscriptions_updated_at BEFORE UPDATE ON public.newsletter_subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_system_settings_updated_at BEFORE UPDATE ON public.system_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to update plugin statistics
CREATE OR REPLACE FUNCTION update_plugin_stats()
RETURNS TRIGGER AS $$
BEGIN
    -- Update plugin rating and review count
    UPDATE public.plugins 
    SET 
        rating = (
            SELECT COALESCE(AVG(rating), 0) 
            FROM public.reviews 
            WHERE plugin_id = NEW.plugin_id
        ),
        review_count = (
            SELECT COUNT(*) 
            FROM public.reviews 
            WHERE plugin_id = NEW.plugin_id
        )
    WHERE id = NEW.plugin_id;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updating plugin stats when reviews change
CREATE TRIGGER update_plugin_stats_on_review 
    AFTER INSERT OR UPDATE OR DELETE ON public.reviews 
    FOR EACH ROW EXECUTE FUNCTION update_plugin_stats();

-- Create function to update category plugin count
CREATE OR REPLACE FUNCTION update_category_plugin_count()
RETURNS TRIGGER AS $$
BEGIN
    -- Update category plugin count
    UPDATE public.categories 
    SET plugin_count = (
        SELECT COUNT(*) 
        FROM public.plugins 
        WHERE category_id = COALESCE(NEW.category_id, OLD.category_id)
        AND is_active = true
    )
    WHERE id = COALESCE(NEW.category_id, OLD.category_id);
    
    RETURN COALESCE(NEW, OLD);
END;
$$ language 'plpgsql';

-- Create trigger for updating category plugin count
CREATE TRIGGER update_category_plugin_count_on_plugin 
    AFTER INSERT OR UPDATE OR DELETE ON public.plugins 
    FOR EACH ROW EXECUTE FUNCTION update_category_plugin_count();

-- Create function to generate referral code
CREATE OR REPLACE FUNCTION generate_referral_code()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.referral_code IS NULL THEN
        NEW.referral_code = UPPER(SUBSTRING(MD5(NEW.id::text), 1, 8));
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for generating referral code
CREATE TRIGGER generate_referral_code_on_profile 
    BEFORE INSERT ON public.profiles 
    FOR EACH ROW EXECUTE FUNCTION generate_referral_code();

-- Create function to generate API key
CREATE OR REPLACE FUNCTION generate_api_key()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.api_key IS NULL THEN
        NEW.api_key = 'mp_' || UPPER(SUBSTRING(MD5(NEW.id::text || NOW()::text), 1, 32));
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for generating API key
CREATE TRIGGER generate_api_key_on_profile 
    BEFORE INSERT ON public.profiles 
    FOR EACH ROW EXECUTE FUNCTION generate_api_key();

-- Insert default categories
INSERT INTO public.categories (name, slug, description, icon, color) VALUES
('Ekonomi', 'economy', 'Para sistemi, bankacılık ve ticaret pluginleri', '💰', '#10B981'),
('Minigame', 'minigames', 'Eğlenceli oyunlar ve aktiviteler', '🎮', '#3B82F6'),
('Admin Araçları', 'admin', 'Sunucu yönetimi ve moderasyon', '⚙️', '#8B5CF6'),
('Survival', 'survival', 'Hayatta kalma deneyimini geliştiren eklentiler', '🏕️', '#059669'),
('PvP', 'pvp', 'Oyuncu vs oyuncu savaş sistemleri', '⚔️', '#EF4444'),
('Creative', 'creative', 'Yaratıcılık ve inşaat araçları', '🎨', '#EC4899'),
('Utility', 'utility', 'Genel amaçlı yardımcı araçlar', '🔧', '#F59E0B'),
('World', 'world', 'Dünya yönetimi ve düzenleme', '🌍', '#06B6D4'),
('Chat', 'chat', 'Sohbet ve iletişim sistemleri', '💬', '#6366F1'),
('Security', 'security', 'Güvenlik ve koruma araçları', '🔒', '#6B7280'),
('Performance', 'performance', 'Sunucu performans optimizasyonu', '⚡', '#EAB308'),
('API', 'api', 'Geliştirici araçları ve API''ler', '🔌', '#14B8A6');

-- Insert default system settings
INSERT INTO public.system_settings (key, value) VALUES
('site_name', '"Minecraft Plugin Store"'),
('site_description', '"Türkiye''nin en kapsamlı Minecraft plugin mağazası"'),
('contact_email', '"info@pluginstore.com"'),
('support_email', '"support@pluginstore.com"'),
('default_currency', '"TRY"'),
('tax_rate', '18'),
('payment_settings', '{
    "default_currency": "TRY",
    "supported_currencies": ["TRY", "USD", "EUR"],
    "tax_rate": 18
}'),
('email_settings', '{
    "from_name": "Minecraft Plugin Store",
    "from_email": "noreply@pluginstore.com"
}');

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plugins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.discounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.file_uploads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Categories policies
CREATE POLICY "Categories are viewable by everyone" ON public.categories FOR SELECT USING (true);

-- Plugins policies
CREATE POLICY "Active plugins are viewable by everyone" ON public.plugins FOR SELECT USING (is_active = true);
CREATE POLICY "Plugin developers can manage their plugins" ON public.plugins FOR ALL USING (auth.uid() = developer_id);

-- Reviews policies
CREATE POLICY "Reviews are viewable by everyone" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Users can insert their own reviews" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own reviews" ON public.reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own reviews" ON public.reviews FOR DELETE USING (auth.uid() = user_id);

-- Orders policies
CREATE POLICY "Users can view their own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Order items policies
CREATE POLICY "Users can view their own order items" ON public.order_items FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.orders WHERE id = order_id AND user_id = auth.uid())
);

-- Downloads policies
CREATE POLICY "Users can view their own downloads" ON public.downloads FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own downloads" ON public.downloads FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Wishlist policies
CREATE POLICY "Users can view their own wishlist" ON public.wishlist FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own wishlist" ON public.wishlist FOR ALL USING (auth.uid() = user_id);

-- Blog posts policies
CREATE POLICY "Published blog posts are viewable by everyone" ON public.blog_posts FOR SELECT USING (is_published = true);

-- Discounts policies
CREATE POLICY "Active discounts are viewable by everyone" ON public.discounts FOR SELECT USING (is_active = true);

-- Support tickets policies
CREATE POLICY "Users can view their own support tickets" ON public.support_tickets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own support tickets" ON public.support_tickets FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own support tickets" ON public.support_tickets FOR UPDATE USING (auth.uid() = user_id);

-- Newsletter subscriptions policies
CREATE POLICY "Newsletter subscriptions are viewable by everyone" ON public.newsletter_subscriptions FOR SELECT USING (true);
CREATE POLICY "Anyone can subscribe to newsletter" ON public.newsletter_subscriptions FOR INSERT WITH CHECK (true);

-- File uploads policies
CREATE POLICY "File uploads are viewable by everyone" ON public.file_uploads FOR SELECT USING (true);
CREATE POLICY "Users can upload files" ON public.file_uploads FOR INSERT WITH CHECK (auth.uid() = uploaded_by);

-- System settings policies
CREATE POLICY "System settings are viewable by everyone" ON public.system_settings FOR SELECT USING (true);
