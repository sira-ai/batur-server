# Batur Server - Panel Digital Store

Website store modern untuk menjual produk digital (Panel Pterodactyl, Reseller Panel, Admin Panel) dengan tampilan ala Vercel menggunakan Next.js + TailwindCSS.

## 🚀 Fitur

### Website (User)
- **Navbar**: Logo Batur Server, menu navigasi, dark/light mode toggle, cart, user menu
- **Hero Section**: Headline besar dengan animasi Framer Motion
- **Produk Page**: Grid produk dengan filter dan search
- **Keranjang & Checkout**: Sistem keranjang belanja dan checkout
- **Responsive Design**: Mobile-friendly dengan touch support
- **Dark/Light Mode**: Toggle tema dengan smooth transition

### Admin Panel
- **Dashboard**: Overview penjualan dan statistik
- **CRUD Produk**: Kelola produk (create, read, update, delete)
- **Order Management**: Kelola pesanan dengan status tracking
- **User Management**: Kelola user dan role
- **Settings**: Konfigurasi website

## 🛠️ Teknologi

- **Framework**: Next.js 15 (App Router)
- **Styling**: TailwindCSS + CSS Variables
- **Animasi**: Framer Motion
- **Database**: PostgreSQL via Supabase
- **ORM**: Prisma
- **Auth**: Supabase Auth
- **Icons**: Lucide React
- **Font**: Inter (Google Fonts)
- **Deployment**: Vercel

## 📦 Instalasi

### 1. Clone Repository
```bash
git clone <repository-url>
cd batur-server
npm install
```

### 2. Setup Environment Variables
Buat file `.env.local` dan isi dengan:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://yizmqpptrpbxzapkifox.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlpem1xcHB0cnBieHphcGtpZm94Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUzNjQ4MzEsImV4cCI6MjA3MDk0MDgzMX0.54yFr8MwJf9oVX4XVRXlZw_gmum1LP74E0vSZBZP4ZA
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlpem1xcHB0cnBieHphcGtpZm94Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTM2NDgzMSwiZXhwIjoyMDcwOTQwODMxfQ.NBQvUNG5-ZDpYMAa7v66tMPOfWriChfT5s587IhBL1k

# Database
DATABASE_URL=postgresql://postgres:JJ0LAbZuLHJb3Rk7@db.yizmqpptrpbxzapkifox.supabase.co:5432/postgres

# Next.js
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=https://batur-serve.vercel.app/

# Admin Credentials
ADMIN_EMAIL=ibradecode@gmail.com
ADMIN_PASSWORD=088103
```

### 3. Setup Database

#### A. Buat Project Supabase
1. Kunjungi [supabase.com](https://supabase.com)
2. Buat project baru
3. Copy URL dan API keys ke `.env.local`

#### B. Setup Prisma
```bash
# Generate Prisma client
npm run db:generate

# Push schema ke database
npm run db:push

# Seed database dengan sample data
npm run db:seed
```

### 4. Jalankan Development Server
```bash
npm run dev
```

Website akan berjalan di `http://localhost:3000`

## 🚀 Deployment

### Deploy ke Vercel

1. **Push ke GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect ke Vercel**
   - Kunjungi [vercel.com](https://vercel.com)
   - Import repository dari GitHub
   - Set environment variables di Vercel dashboard

3. **Environment Variables di Vercel**
   Tambahkan semua variables dari `.env.local` ke Vercel

4. **Deploy**
   - Vercel akan otomatis build dan deploy
   - Website akan tersedia di domain Vercel

### Mobile App Wrapper

Untuk membuat aplikasi mobile, gunakan Capacitor:

```bash
npm install @capacitor/core @capacitor/cli
npx cap init
npx cap add ios
npx cap add android
```

## 📞 Support

Untuk bantuan dan support:
- Email: contact@baturserver.com
- Phone: +62 812-3456-7890

---

Made with ❤️ in Indonesia
