import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create sample products
  const products = [
    {
      name: 'Panel Pterodactyl Premium',
      description: 'Panel Pterodactyl lengkap dengan fitur premium untuk mengelola game server Anda. Dilengkapi dengan dashboard modern, monitoring real-time, dan backup otomatis.',
      price: 150000,
      category: 'Panel',
      featured: true,
      image: '/images/pterodactyl-panel.jpg'
    },
    {
      name: 'Reseller Panel Pro',
      description: 'Panel reseller profesional untuk mengelola klien hosting Anda. Fitur lengkap termasuk billing system, client management, dan white-label branding.',
      price: 250000,
      category: 'Reseller',
      featured: true,
      image: '/images/reseller-panel.jpg'
    },
    {
      name: 'Admin Panel Custom',
      description: 'Admin panel kustom sesuai kebutuhan bisnis Anda. Dibuat dengan teknologi modern dan dapat disesuaikan dengan workflow perusahaan.',
      price: 500000,
      category: 'Custom',
      featured: true,
      image: '/images/admin-panel.jpg'
    },
    {
      name: 'Panel Pterodactyl Basic',
      description: 'Panel Pterodactyl versi basic untuk kebutuhan sederhana. Cocok untuk pemula yang ingin mencoba mengelola game server.',
      price: 75000,
      category: 'Panel',
      featured: false,
      image: '/images/pterodactyl-basic.jpg'
    },
    {
      name: 'Reseller Panel Starter',
      description: 'Panel reseller untuk pemula dengan fitur dasar yang mudah digunakan. Ideal untuk memulai bisnis hosting kecil.',
      price: 125000,
      category: 'Reseller',
      featured: false,
      image: '/images/reseller-starter.jpg'
    },
    {
      name: 'Monitoring Panel',
      description: 'Panel monitoring server dengan dashboard real-time, alert system, dan reporting lengkap untuk memantau performa server.',
      price: 200000,
      category: 'Monitoring',
      featured: false,
      image: '/images/monitoring-panel.jpg'
    }
  ]

  console.log('Seeding products...')
  for (const product of products) {
    await prisma.product.create({
      data: product
    })
  }

  // Create sample settings
  const settings = [
    { key: 'site_name', value: 'Batur Server' },
    { key: 'site_description', value: 'Solusi terpercaya untuk kebutuhan panel digital Anda' },
    { key: 'contact_email', value: 'contact@baturserver.com' },
    { key: 'support_phone', value: '+62 812-3456-7890' },
    { key: 'company_address', value: 'Jakarta, Indonesia' }
  ]

  console.log('Seeding settings...')
  for (const setting of settings) {
    await prisma.setting.create({
      data: setting
    })
  }

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

