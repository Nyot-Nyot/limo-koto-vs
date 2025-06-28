import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create default admin
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const admin = await prisma.admin.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: hashedPassword,
      name: 'Administrator Nagari',
    },
  })

  console.log('👤 Admin user created:', admin.username)

  // Create sample Nagari profile
  const nagariProfile = await prisma.nagariProfile.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      name: 'Nagari Contoh',
      description: 'Nagari yang terletak di Sumatera Barat dengan keindahan alam dan budaya yang kaya.',
      history: 'Nagari ini memiliki sejarah panjang sejak zaman kolonial...',
      vision: 'Menjadi Nagari yang maju, sejahtera, dan berbudaya.',
      mission: 'Meningkatkan kesejahteraan masyarakat melalui pembangunan berkelanjutan.',
      address: 'Jl. Raya Nagari, Sumatera Barat',
      phone: '(0751) 123456',
      email: 'info@nagari.sumbar.go.id',
      latitude: -0.9471,
      longitude: 100.4172,
    },
  })

  console.log('🏛️ Nagari profile created')

  // Create sample Jorongs
  const jorongNames = [
    'Jorong Satu', 'Jorong Dua', 'Jorong Tiga', 'Jorong Empat', 'Jorong Lima',
    'Jorong Enam', 'Jorong Tujuh', 'Jorong Delapan', 'Jorong Sembilan', 'Jorong Sepuluh'
  ]

  for (let i = 0; i < jorongNames.length; i++) {
    const existingJorong = await prisma.jorong.findFirst({
      where: { name: jorongNames[i] }
    })

    let jorong
    if (existingJorong) {
      jorong = existingJorong
    } else {
      jorong = await prisma.jorong.create({
        data: {
          name: jorongNames[i],
          description: `Deskripsi untuk ${jorongNames[i]}`,
          population: Math.floor(Math.random() * 2000) + 500,
          area: Math.floor(Math.random() * 10) + 1,
          kepalaJorong: `Kepala ${jorongNames[i]}`,
        },
      })
    }

    // Create sample statistics for each jorong
    const existingStat = await prisma.jorongStatistic.findUnique({
      where: {
        jorongId_year: {
          jorongId: jorong.id,
          year: 2024,
        },
      },
    })

    if (!existingStat) {
      await prisma.jorongStatistic.create({
        data: {
          jorongId: jorong.id,
          year: 2024,
          population: jorong.population,
          maleCount: Math.floor(jorong.population * 0.52),
          femaleCount: Math.floor(jorong.population * 0.48),
          childCount: Math.floor(jorong.population * 0.25),
          adultCount: Math.floor(jorong.population * 0.65),
          elderlyCount: Math.floor(jorong.population * 0.1),
          households: Math.floor(jorong.population / 4),
        },
      })
    }

    console.log(`📍 Created ${jorongNames[i]} with statistics`)
  }

  // Create sample news
  for (let i = 1; i <= 5; i++) {
    await prisma.news.create({
      data: {
        title: `Berita Contoh ${i}`,
        content: `<p>Ini adalah konten berita contoh ke-${i}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>`,
        excerpt: `Ringkasan berita contoh ke-${i}`,
        author: 'Admin Nagari',
        published: true,
        publishedAt: new Date(),
        tags: 'berita,nagari,contoh',
      },
    })
  }

  console.log('📰 Sample news created')

  // Create sample FAQ
  const faqs = [
    {
      question: 'Bagaimana cara mengurus surat keterangan domisili?',
      answer: 'Untuk mengurus surat keterangan domisili, Anda dapat datang langsung ke kantor Nagari dengan membawa KTP dan dokumen pendukung lainnya.',
      category: 'pelayanan',
    },
    {
      question: 'Kapan jadwal pelayanan kantor Nagari?',
      answer: 'Kantor Nagari buka setiap hari Senin-Jumat pukul 08.00-16.00 WIB.',
      category: 'umum',
    },
    {
      question: 'Apa saja tradisi budaya yang ada di Nagari ini?',
      answer: 'Nagari ini memiliki berbagai tradisi budaya seperti upacara adat, tarian tradisional, dan festival tahunan.',
      category: 'adat',
    },
  ]

  for (const faq of faqs) {
    await prisma.fAQ.create({
      data: faq,
    })
  }

  console.log('❓ Sample FAQ created')

  // Create sample Wali Nagari history
  const waliNagaris = [
    {
      name: 'Pak Satu',
      startYear: 2010,
      endYear: 2016,
      biography: 'Wali Nagari pertama yang memimpin dengan dedikasi tinggi.',
      order: 1,
    },
    {
      name: 'Pak Dua',
      startYear: 2016,
      endYear: 2022,
      biography: 'Melanjutkan pembangunan dan modernisasi Nagari.',
      order: 2,
    },
    {
      name: 'Pak Tiga',
      startYear: 2022,
      endYear: null,
      biography: 'Wali Nagari saat ini yang fokus pada digitalisasi.',
      order: 3,
    },
  ]

  for (const wali of waliNagaris) {
    await prisma.waliNagari.create({
      data: wali,
    })
  }

  console.log('👨‍💼 Wali Nagari history created')

  console.log('✅ Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
