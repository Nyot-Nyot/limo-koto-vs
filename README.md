# Website Nagari - Sumatera Barat

Portal informasi resmi Nagari di Sumatera Barat yang dibangun dengan Next.js 15, TypeScript, Tailwind CSS, dan Prisma/SQLite.

## 🚀 Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/website-nagari&env=DATABASE_URL,NEXTAUTH_SECRET,JWT_SECRET&envDescription=Required%20environment%20variables&envLink=https://github.com/your-username/website-nagari/blob/main/.env.example)

**For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)**

## 🎯 Fitur Utama

### Portal Publik
- ✅ **Homepage** - Dashboard utama dengan statistik dan preview konten
- ✅ **Profil Nagari** - Informasi lengkap tentang nagari
- ✅ **Portal Berita** - Sistem berita dengan list dan detail halaman
- ✅ **Galeri Foto** - Galeri foto kegiatan dan dokumentasi
- ✅ **Adat Istiadat** - Dokumentasi adat istiadat per jorong
- ✅ **Statistik Penduduk** - Data populasi per jorong dengan visualisasi
- ✅ **Wali Nagari** - Riwayat kepemimpinan wali nagari
- ✅ **FAQ** - Pertanyaan yang sering diajukan
- ✅ **Peta Nagari** - Peta lokasi nagari (embed Google Maps)
- ✅ **Navigasi** - Navbar responsif untuk semua halaman

### Panel Admin (CRUD)
- ✅ **Dashboard Admin** - Overview dan statistik cepat
- ✅ **Login System** - Autentikasi admin sederhana
- ✅ **Kelola Berita** - CRUD berita dengan editor
- ✅ **Kelola Galeri** - CRUD foto galeri
- ✅ **Kelola Profil Nagari** - Edit informasi nagari
- ✅ **Kelola Jorong** - CRUD data jorong
- ✅ **Kelola Adat Istiadat** - CRUD adat istiadat per jorong
- ✅ **Kelola Wali Nagari** - CRUD riwayat wali nagari
- ✅ **Kelola Statistik** - CRUD data populasi per jorong
- ✅ **Kelola FAQ** - CRUD pertanyaan dan jawaban
- ✅ **Pengaturan** - Konfigurasi sistem dan maintenance

## 🛠️ Teknologi yang Digunakan

### Frontend
- **Next.js 15** - Framework React dengan App Router
- **TypeScript** - Type safety dan developer experience
- **Tailwind CSS** - Styling yang responsif dan modern
- **Lucide React** - Icon library yang konsisten
- **Framer Motion** - Animasi yang smooth (untuk pengembangan lanjutan)

### Backend
- **Prisma** - ORM untuk database
- **SQLite** - Database lokal yang mudah di-deploy
- **Next.js API Routes** - Backend API terintegrasi

### Database Schema
- Admin (login system)
- NagariProfile (profil nagari)
- Jorong (10 jorong dalam nagari)
- AdatIstiadat (per jorong)
- News (berita)
- Gallery (galeri foto)
- WaliNagari (riwayat kepemimpinan)
- FAQ (pertanyaan umum)
- JorongStatistic (data populasi per jorong per tahun)

## 🚀 Cara Menjalankan

### Prerequisites
- Node.js 18+ 
- npm atau yarn

### Installation
1. Clone project dan masuk ke direktori:
   ```bash
   cd website-nagari
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup database:
   ```bash
   npx prisma generate
   npx prisma migrate dev
   npx prisma db seed
   ```

4. Jalankan development server:
   ```bash
   npm run dev
   ```

5. Buka browser di `http://localhost:3000`

## 🔐 Login Admin

**Default Admin Account:**
- Username: `admin`
- Password: `admin123`

**Admin Panel:** `http://localhost:3000/admin`

## 📝 Data Default

Setelah menjalankan `prisma db seed`, system akan memiliki:
- 1 akun admin default
- 10 jorong sample (Jorong I - Jorong X)
- Profil nagari sample
- Berita sample
- FAQ sample
- Data wali nagari sample
- Statistik populasi sample

## 🎯 Keunggulan untuk Admin Gaptek

### User Experience
- **Interface sederhana** - Tidak banyak tombol membingungkan
- **Bahasa Indonesia** - Semua teks dalam bahasa lokal
- **Form yang jelas** - Label yang mudah dipahami
- **Feedback langsung** - Alert sukses/error yang informatif
- **Konfirmasi aksi** - Mencegah penghapusan tidak disengaja

### Kemudahan Penggunaan
- **One-click actions** - Tombol aksi yang jelas
- **Modal forms** - Edit dalam popup tanpa pindah halaman
- **Auto-save friendly** - Form yang mudah disimpan
- **Visual feedback** - Loading states dan indikator status

## 🔮 Pengembangan Selanjutnya

### Prioritas Tinggi
- [ ] **Upload gambar langsung** (bukan hanya URL)
- [ ] **Rich text editor** untuk konten berita/adat istiadat
- [ ] **Peta interaktif** dengan Leaflet/React-Leaflet
- [ ] **SEO optimization** (meta tags, sitemap)
- [ ] **Responsive mobile** enhancement

### Prioritas Menengah
- [ ] **Search & filter** di halaman publik
- [ ] **Pagination** untuk list data
- [ ] **Export/Import** data (Excel/CSV)
- [ ] **Email notifications** untuk berita baru
- [ ] **User roles** (admin, editor, viewer)

---

**Developed with ❤️ for Nagari Sumatera Barat**
