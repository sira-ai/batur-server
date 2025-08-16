# Deployment Guide - Batur Server

Panduan lengkap untuk deploy website Batur Server ke production.

## 📋 Prerequisites

Sebelum deploy, pastikan Anda memiliki:

1. **Akun GitHub** - untuk version control
2. **Akun Vercel** - untuk hosting frontend
3. **Akun Supabase** - untuk database dan auth
4. **Domain (opsional)** - untuk custom domain

## 🗄️ Setup Database (Supabase)

### 1. Buat Project Supabase

1. Kunjungi [supabase.com](https://supabase.com)
2. Sign up / Login dengan GitHub
3. Klik "New Project"
4. Isi detail project:
   - **Name**: batur-server
   - **Database Password**: [password yang kuat]
   - **Region**: Southeast Asia (Singapore)
5. Tunggu project selesai dibuat (~2 menit)

### 2. Setup Database Schema

1. Buka project Supabase Anda
2. Pergi ke **SQL Editor**
3. Jalankan query berikut untuk membuat tables:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'USER' CHECK (role IN ('USER', 'ADMIN')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table
CREATE TABLE public.products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  image TEXT,
  category TEXT,
  featured BOOLEAN DEFAULT FALSE,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE public.orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) NOT NULL,
  product_id UUID REFERENCES public.products(id) NOT NULL,
  status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'PAID', 'COMPLETED', 'CANCELLED')),
  quantity INTEGER DEFAULT 1,
  total DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Settings table
CREATE TABLE public.settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for products (public read, admin write)
CREATE POLICY "Products are viewable by everyone" ON public.products
  FOR SELECT USING (active = true);

CREATE POLICY "Products are editable by admins" ON public.products
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE users.id = auth.uid() AND users.role = 'ADMIN'
    )
  );

-- RLS Policies for orders (users can see their own, admins see all)
CREATE POLICY "Users can view their own orders" ON public.orders
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admins can view all orders" ON public.orders
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE users.id = auth.uid() AND users.role = 'ADMIN'
    )
  );

CREATE POLICY "Users can create orders" ON public.orders
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can update orders" ON public.orders
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE users.id = auth.uid() AND users.role = 'ADMIN'
    )
  );

-- RLS Policies for users
CREATE POLICY "Users can view their own profile" ON public.users
  FOR SELECT USING (id = auth.uid());

CREATE POLICY "Admins can view all users" ON public.users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE users.id = auth.uid() AND users.role = 'ADMIN'
    )
  );

-- RLS Policies for settings (public read, admin write)
CREATE POLICY "Settings are viewable by everyone" ON public.settings
  FOR SELECT USING (true);

CREATE POLICY "Settings are editable by admins" ON public.settings
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE users.id = auth.uid() AND users.role = 'ADMIN'
    )
  );
```

### 3. Seed Database

Jalankan query berikut untuk menambahkan data sample:

```sql
-- Insert sample products
INSERT INTO public.products (name, description, price, category, featured) VALUES
('Panel Pterodactyl Premium', 'Panel Pterodactyl lengkap dengan fitur premium untuk mengelola game server Anda. Dilengkapi dengan dashboard modern, monitoring real-time, dan backup otomatis.', 150000, 'Panel', true),
('Reseller Panel Pro', 'Panel reseller profesional untuk mengelola klien hosting Anda. Fitur lengkap termasuk billing system, client management, dan white-label branding.', 250000, 'Reseller', true),
('Admin Panel Custom', 'Admin panel kustom sesuai kebutuhan bisnis Anda. Dibuat dengan teknologi modern dan dapat disesuaikan dengan workflow perusahaan.', 500000, 'Custom', true),
('Panel Pterodactyl Basic', 'Panel Pterodactyl versi basic untuk kebutuhan sederhana. Cocok untuk pemula yang ingin mencoba mengelola game server.', 75000, 'Panel', false),
('Reseller Panel Starter', 'Panel reseller untuk pemula dengan fitur dasar yang mudah digunakan. Ideal untuk memulai bisnis hosting kecil.', 125000, 'Reseller', false),
('Monitoring Panel', 'Panel monitoring server dengan dashboard real-time, alert system, dan reporting lengkap untuk memantau performa server.', 200000, 'Monitoring', false);

-- Insert sample settings
INSERT INTO public.settings (key, value) VALUES
('site_name', 'Batur Server'),
('site_description', 'Solusi terpercaya untuk kebutuhan panel digital Anda'),
('contact_email', 'contact@baturserver.com'),
('support_phone', '+62 812-3456-7890'),
('company_address', 'Jakarta, Indonesia');
```

### 4. Setup Authentication

1. Pergi ke **Authentication > Settings**
2. Konfigurasi **Site URL**: `http://localhost:3000` (untuk development)
3. Tambahkan **Redirect URLs**:
   - `http://localhost:3000/auth/callback`
   - `https://yourdomain.com/auth/callback` (untuk production)
4. Enable **Email Auth** di **Authentication > Providers**

### 5. Get API Keys

1. Pergi ke **Settings > API**
2. Copy **Project URL** dan **anon public key**
3. Simpan untuk digunakan di environment variables

## 🚀 Deploy ke Vercel

### 1. Push ke GitHub

```bash
# Initialize git (jika belum)
git init
git add .
git commit -m "Initial commit"

# Create repository di GitHub, lalu:
git remote add origin https://github.com/username/batur-server.git
git branch -M main
git push -u origin main
```

### 2. Connect ke Vercel

1. Kunjungi [vercel.com](https://vercel.com)
2. Sign up / Login dengan GitHub
3. Klik **"New Project"**
4. Import repository `batur-server`
5. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

### 3. Environment Variables

Di Vercel dashboard, tambahkan environment variables berikut:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Database
DATABASE_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres

# Next.js
NEXTAUTH_SECRET=your-random-secret-key
NEXTAUTH_URL=https://your-vercel-domain.vercel.app

# Admin
ADMIN_EMAIL=admin@baturserver.com
ADMIN_PASSWORD=your-admin-password
```

### 4. Deploy

1. Klik **"Deploy"**
2. Tunggu build process selesai (~2-3 menit)
3. Website akan tersedia di `https://your-project.vercel.app`

### 5. Custom Domain (Opsional)

1. Beli domain di provider seperti Namecheap, GoDaddy, dll
2. Di Vercel dashboard, pergi ke **Settings > Domains**
3. Tambahkan domain Anda
4. Update DNS records sesuai instruksi Vercel
5. Update `NEXTAUTH_URL` di environment variables

## 📱 Mobile App (Capacitor)

### 1. Install Capacitor

```bash
npm install @capacitor/core @capacitor/cli
npx cap init batur-server com.baturserver.app
```

### 2. Add Platforms

```bash
# iOS
npx cap add ios

# Android
npx cap add android
```

### 3. Build & Sync

```bash
npm run build
npx cap sync
```

### 4. Open in IDE

```bash
# iOS (requires Xcode)
npx cap open ios

# Android (requires Android Studio)
npx cap open android
```

## 🔧 Maintenance

### Update Dependencies

```bash
npm update
npm audit fix
```

### Database Migrations

Untuk perubahan schema database:

1. Buat migration di Supabase SQL Editor
2. Test di staging environment
3. Apply ke production

### Monitoring

1. **Vercel Analytics**: Monitor performance dan usage
2. **Supabase Dashboard**: Monitor database dan auth
3. **Error Tracking**: Setup Sentry untuk error monitoring

### Backup

1. **Database**: Supabase otomatis backup daily
2. **Code**: GitHub sebagai version control
3. **Assets**: Store di Supabase Storage atau CDN

## 🚨 Troubleshooting

### Build Errors

```bash
# Clear cache
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### Database Connection Issues

1. Check DATABASE_URL format
2. Verify Supabase project status
3. Check RLS policies

### Authentication Issues

1. Verify redirect URLs
2. Check NEXTAUTH_URL
3. Verify Supabase auth settings

## 📞 Support

Jika mengalami masalah:

1. Check [Vercel Documentation](https://vercel.com/docs)
2. Check [Supabase Documentation](https://supabase.com/docs)
3. Contact: support@baturserver.com

---

**Happy Deploying! 🚀**

