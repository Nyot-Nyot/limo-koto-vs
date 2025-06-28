import { Mountain, Users, Calendar, MapPin, Book, Camera, HelpCircle, BarChart3 } from "lucide-react";
import Link from "next/link";
import SafeDate from "../components/SafeDate";

export default function HomePage() {
  const features = [
    {
      icon: Mountain,
      title: "Profil Nagari",
      description: "Informasi lengkap tentang sejarah, visi, misi, dan profil Nagari",
      href: "/profil",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: Book,
      title: "Adat Istiadat",
      description: "Tradisi dan budaya dari 10 Jorong yang ada di Nagari",
      href: "/adat-istiadat",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50"
    },
    {
      icon: Calendar,
      title: "Portal Berita",
      description: "Berita terkini dan informasi penting seputar Nagari",
      href: "/berita",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: Camera,
      title: "Galeri",
      description: "Dokumentasi kegiatan dan keindahan alam Nagari",
      href: "/galeri",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: MapPin,
      title: "Peta Lokasi",
      description: "Lokasi geografis dan peta interaktif Nagari",
      href: "/peta",
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      icon: Users,
      title: "Wali Nagari",
      description: "Sejarah kepemimpinan Wali Nagari dari masa ke masa",
      href: "/wali-nagari",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50"
    },
    {
      icon: BarChart3,
      title: "Statistik",
      description: "Data demografis dan statistik penduduk per Jorong",
      href: "/statistik",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50"
    },
    {
      icon: HelpCircle,
      title: "FAQ",
      description: "Pertanyaan yang sering diajukan seputar layanan Nagari",
      href: "/faq",
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Selamat Datang di
              <span className="block text-yellow-300">Website Nagari</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Portal Digital Resmi untuk Informasi Lengkap tentang Profil, Budaya, 
              Berita, dan Data Statistik Nagari di Sumatera Barat
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/profil" className="bg-yellow-500 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-colors transform hover:scale-105">
                Jelajahi Profil Nagari
              </Link>
              <Link href="/berita" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-green-800 transition-colors">
                Baca Berita Terkini
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">10</div>
              <div className="text-gray-600">Jorong</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">15,000+</div>
              <div className="text-gray-600">Penduduk</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">25+</div>
              <div className="text-gray-600">Tradisi Budaya</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">100+</div>
              <div className="text-gray-600">Foto Dokumentasi</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Fitur-Fitur Website
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Akses mudah ke berbagai informasi dan layanan digital Nagari yang dirancang 
              khusus untuk kemudahan masyarakat
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Link 
                  key={index} 
                  href={feature.href}
                  className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest News Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Berita Terkini
              </h2>
              <p className="text-xl text-gray-600">
                Update terbaru seputar kegiatan dan perkembangan Nagari
              </p>
            </div>
            <Link href="/berita" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
              Lihat Semua Berita
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <article key={item} className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                <div className="w-full h-48 bg-gradient-to-r from-green-400 to-green-600"></div>
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2">
                    <SafeDate />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Contoh Berita Kegiatan Nagari {item}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Sed do eiusmod tempor incididunt ut labore...
                  </p>
                  <Link href={`/berita/${item}`} className="text-green-600 font-medium hover:text-green-700">
                    Baca Selengkapnya →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-green-700 rounded-lg flex items-center justify-center">
                  <Mountain className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">Nagari Digital</span>
              </div>
              <p className="text-gray-400">
                Portal Digital Resmi Nagari di Sumatera Barat
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Menu Utama</h3>
              <ul className="space-y-2">
                <li><Link href="/profil" className="text-gray-400 hover:text-white">Profil Nagari</Link></li>
                <li><Link href="/adat-istiadat" className="text-gray-400 hover:text-white">Adat Istiadat</Link></li>
                <li><Link href="/berita" className="text-gray-400 hover:text-white">Portal Berita</Link></li>
                <li><Link href="/galeri" className="text-gray-400 hover:text-white">Galeri</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Informasi</h3>
              <ul className="space-y-2">
                <li><Link href="/peta" className="text-gray-400 hover:text-white">Peta Lokasi</Link></li>
                <li><Link href="/wali-nagari" className="text-gray-400 hover:text-white">Wali Nagari</Link></li>
                <li><Link href="/statistik" className="text-gray-400 hover:text-white">Statistik</Link></li>
                <li><Link href="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Kontak</h3>
              <div className="space-y-2 text-gray-400">
                <p>Alamat: Jl. Raya Nagari</p>
                <p>Telepon: (0751) 123456</p>
                <p>Email: info@nagari.sumbar.go.id</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Website Nagari - Sumatera Barat. Seluruh hak cipta dilindungi.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
