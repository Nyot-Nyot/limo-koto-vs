"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  LogOut,
  Plus,
  Eye,
  Edit,
  Trash2,
  Mountain,
  Calendar,
  BarChart3,
  Camera,
  HelpCircle,
  MapPin,
  Book,
  Upload,
  Save,
  X
} from "lucide-react";
import Link from "next/link";

interface NewsItem {
  id: string
  title: string
  excerpt: string
  author: string
  published: boolean
  createdAt: string
  views: number
}

interface GalleryItem {
  id: string
  title: string
  description?: string
  imageUrl: string
  category: string
  createdAt: string
}

interface WaliNagari {
  id: string
  name: string
  startYear: number
  endYear?: number
  photo?: string
  biography?: string
  achievements?: string
  order: number
}

interface FAQ {
  id: string
  question: string
  answer: string
  category?: string
  order: number
  published: boolean
}

interface AdatIstiadat {
  id: string
  title: string
  description: string
  content: string
  category: string
  images?: string
  jorongId: string
  jorong: {
    id: string
    name: string
  }
  createdAt: string
}

interface Statistic {
  id: string
  jorongId: string
  year: number
  population: number
  maleCount: number
  femaleCount: number
  childCount?: number
  adultCount?: number
  elderlyCount?: number
  households?: number
  jorong: {
    id: string
    name: string
  }
}

interface Jorong {
  id: string
  name: string
  description?: string
  kepalaJorong?: string
  population?: number
  area?: number
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [adminData, setAdminData] = useState<any>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [waliNagaris, setWaliNagaris] = useState<WaliNagari[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [adatIstiadata, setAdatIstiadata] = useState<AdatIstiadat[]>([]);
  const [statistics, setStatistics] = useState<Statistic[]>([]);
  const [jorongs, setJorongs] = useState<Jorong[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [showNewsForm, setShowNewsForm] = useState(false);
  const [showGalleryForm, setShowGalleryForm] = useState(false);
  const [showWaliForm, setShowWaliForm] = useState(false);
  const [showFaqForm, setShowFaqForm] = useState(false);
  const [showAdatForm, setShowAdatForm] = useState(false);
  const [showStatForm, setShowStatForm] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [showJorongForm, setShowJorongForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Form states
  const [newsForm, setNewsForm] = useState({
    title: '',
    content: '',
    excerpt: '',
    author: 'Admin Nagari',
    coverImage: '',
    tags: ''
  });

  const [galleryForm, setGalleryForm] = useState({
    title: '',
    description: '',
    imageUrl: '',
    category: 'kegiatan',
    eventDate: ''
  });

  const [waliForm, setWaliForm] = useState({
    name: '',
    startYear: new Date().getFullYear(),
    endYear: '',
    photo: '',
    biography: '',
    achievements: '',
    order: 1
  });

  const [faqForm, setFaqForm] = useState({
    question: '',
    answer: '',
    category: 'umum',
    order: 0,
    published: true
  });

  const [adatForm, setAdatForm] = useState({
    jorongId: '',
    title: '',
    description: '',
    content: '',
    category: 'tradisi',
    images: ''
  });

  const [statForm, setStatForm] = useState({
    jorongId: '',
    year: new Date().getFullYear(),
    population: 0,
    maleCount: 0,
    femaleCount: 0,
    childCount: 0,
    adultCount: 0,
    elderlyCount: 0,
    households: 0
  });

  const [profileForm, setProfileForm] = useState({
    name: '',
    description: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    logo: '',
    vision: '',
    mission: '',
    history: ''
  });

  const [jorongForm, setJorongForm] = useState({
    name: '',
    description: '',
    kepalaJorong: '',
    population: 0,
    area: 0
  });

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin");
      return;
    }

    // Load admin data (in production, verify token with backend)
    setAdminData({ name: "Administrator Nagari" });
  }, [router]);

  // Fetch data when tabs change
  useEffect(() => {
    if (activeTab === 'berita') {
      fetchNews();
    } else if (activeTab === 'galeri') {
      fetchGallery();
    } else if (activeTab === 'wali-nagari') {
      fetchWaliNagaris();
    } else if (activeTab === 'faq') {
      fetchFaqs();
    } else if (activeTab === 'adat-istiadat') {
      fetchAdatIstiadat();
      fetchJorongs();
    } else if (activeTab === 'statistik') {
      fetchStatistics();
      fetchJorongs();
    } else if (activeTab === 'profil') {
      fetchProfile();
    } else if (activeTab === 'jorong') {
      fetchJorongs();
    } else if (activeTab === 'dashboard') {
      fetchJorongs(); // For quick stats
    }
  }, [activeTab]);

  const fetchNews = async () => {
    try {
      const response = await fetch('/api/admin/news');
      if (response.ok) {
        const data = await response.json();
        setNews(data);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const fetchGallery = async () => {
    try {
      const response = await fetch('/api/admin/gallery');
      if (response.ok) {
        const data = await response.json();
        setGallery(data);
      }
    } catch (error) {
      console.error('Error fetching gallery:', error);
    }
  };

  const fetchWaliNagaris = async () => {
    try {
      const response = await fetch('/api/admin/wali-nagari');
      if (response.ok) {
        const data = await response.json();
        setWaliNagaris(data);
      }
    } catch (error) {
      console.error('Error fetching wali nagari:', error);
    }
  };

  const fetchFaqs = async () => {
    try {
      const response = await fetch('/api/admin/faq');
      if (response.ok) {
        const data = await response.json();
        setFaqs(data);
      }
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    }
  };

  const fetchAdatIstiadat = async () => {
    try {
      const response = await fetch('/api/admin/adat-istiadat');
      if (response.ok) {
        const data = await response.json();
        setAdatIstiadata(data);
      }
    } catch (error) {
      console.error('Error fetching adat istiadat:', error);
    }
  };

  const fetchStatistics = async () => {
    try {
      const response = await fetch('/api/admin/statistics');
      if (response.ok) {
        const data = await response.json();
        setStatistics(data);
      }
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  const fetchJorongs = async () => {
    try {
      const response = await fetch('/api/admin/jorongs');
      if (response.ok) {
        const data = await response.json();
        setJorongs(data);
      }
    } catch (error) {
      console.error('Error fetching jorongs:', error);
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/admin/profile');
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleCreateNews = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newsForm)
      });

      if (response.ok) {
        setShowNewsForm(false);
        setNewsForm({
          title: '',
          content: '',
          excerpt: '',
          author: 'Admin Nagari',
          coverImage: '',
          tags: ''
        });
        fetchNews();
        alert('Berita berhasil ditambahkan!');
      } else {
        alert('Gagal menambahkan berita');
      }
    } catch (error) {
      alert('Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(galleryForm)
      });

      if (response.ok) {
        setShowGalleryForm(false);
        setGalleryForm({
          title: '',
          description: '',
          imageUrl: '',
          category: 'kegiatan',
          eventDate: ''
        });
        fetchGallery();
        alert('Foto berhasil ditambahkan!');
      } else {
        alert('Gagal menambahkan foto');
      }
    } catch (error) {
      alert('Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateWali = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/wali-nagari', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(waliForm)
      });

      if (response.ok) {
        setShowWaliForm(false);
        setWaliForm({
          name: '',
          startYear: new Date().getFullYear(),
          endYear: '',
          photo: '',
          biography: '',
          achievements: '',
          order: 1
        });
        fetchWaliNagaris();
        alert('Data Wali Nagari berhasil ditambahkan!');
      } else {
        alert('Gagal menambahkan data Wali Nagari');
      }
    } catch (error) {
      alert('Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/faq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(faqForm)
      });

      if (response.ok) {
        setShowFaqForm(false);
        setFaqForm({
          question: '',
          answer: '',
          category: 'umum',
          order: 0,
          published: true
        });
        fetchFaqs();
        alert('FAQ berhasil ditambahkan!');
      } else {
        alert('Gagal menambahkan FAQ');
      }
    } catch (error) {
      alert('Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNews = async (id: string) => {
    if (!confirm('Yakin ingin menghapus berita ini?')) return;

    try {
      const response = await fetch(`/api/admin/news/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchNews();
        alert('Berita berhasil dihapus!');
      } else {
        alert('Gagal menghapus berita');
      }
    } catch (error) {
      alert('Terjadi kesalahan');
    }
  };

  const handleDeleteGallery = async (id: string) => {
    if (!confirm('Yakin ingin menghapus foto ini?')) return;

    try {
      const response = await fetch(`/api/admin/gallery/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchGallery();
        alert('Foto berhasil dihapus!');
      } else {
        alert('Gagal menghapus foto');
      }
    } catch (error) {
      alert('Terjadi kesalahan');
    }
  };

  // Adat Istiadat CRUD
  const handleCreateAdat = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/adat-istiadat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adatForm)
      });

      if (response.ok) {
        setShowAdatForm(false);
        setAdatForm({
          jorongId: '',
          title: '',
          description: '',
          content: '',
          category: 'tradisi',
          images: ''
        });
        fetchAdatIstiadat();
        alert('Adat istiadat berhasil ditambahkan!');
      } else {
        alert('Gagal menambahkan adat istiadat');
      }
    } catch (error) {
      alert('Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  // Statistics CRUD
  const handleCreateStatistic = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/statistics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(statForm)
      });

      if (response.ok) {
        setShowStatForm(false);
        setStatForm({
          jorongId: '',
          year: new Date().getFullYear(),
          population: 0,
          maleCount: 0,
          femaleCount: 0,
          childCount: 0,
          adultCount: 0,
          elderlyCount: 0,
          households: 0
        });
        fetchStatistics();
        alert('Statistik berhasil ditambahkan!');
      } else {
        alert('Gagal menambahkan statistik');
      }
    } catch (error) {
      alert('Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  // Profile CRUD
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileForm)
      });

      if (response.ok) {
        setShowProfileForm(false);
        fetchProfile();
        alert('Profil nagari berhasil diperbarui!');
      } else {
        alert('Gagal memperbarui profil nagari');
      }
    } catch (error) {
      alert('Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  // Jorong CRUD
  const handleCreateJorong = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/jorongs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jorongForm)
      });

      if (response.ok) {
        setShowJorongForm(false);
        setJorongForm({
          name: '',
          description: '',
          kepalaJorong: '',
          population: 0,
          area: 0
        });
        fetchJorongs();
        alert('Jorong berhasil ditambahkan!');
      } else {
        alert('Gagal menambahkan jorong');
      }
    } catch (error) {
      alert('Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    router.push("/admin");
  };

  const menuItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "profil", icon: Mountain, label: "Profil Nagari" },
    { id: "jorong", icon: MapPin, label: "Kelola Jorong" },
    { id: "berita", icon: FileText, label: "Portal Berita" },
    { id: "adat-istiadat", icon: Book, label: "Adat Istiadat" },
    { id: "galeri", icon: Camera, label: "Galeri" },
    { id: "wali-nagari", icon: Users, label: "Wali Nagari" },
    { id: "statistik", icon: BarChart3, label: "Statistik" },
    { id: "faq", icon: HelpCircle, label: "FAQ" },
    { id: "settings", icon: Settings, label: "Pengaturan" },
  ];

  const quickStats = [
    { label: "Total Berita", value: news.length.toString(), color: "bg-blue-500" },
    { label: "Foto Galeri", value: gallery.length.toString(), color: "bg-green-500" },
    { label: "Total Jorong", value: jorongs.length.toString(), color: "bg-purple-500" },
    { label: "Wali Nagari", value: waliNagaris.length.toString(), color: "bg-indigo-500" },
    { label: "FAQ Aktif", value: faqs.filter(faq => faq.published).length.toString(), color: "bg-orange-500" },
    { label: "Adat Istiadat", value: adatIstiadata.length.toString(), color: "bg-red-500" },
  ];

  if (!adminData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm">
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-green-700 rounded-lg flex items-center justify-center">
              <Mountain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Admin Panel</h1>
              <p className="text-sm text-gray-600">Nagari Digital</p>
            </div>
          </div>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === item.id
                        ? "bg-green-50 text-green-700 border-r-2 border-green-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
        
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-600">Masuk sebagai:</p>
            <p className="font-medium text-gray-900">{adminData.name}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Keluar</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {menuItems.find(item => item.id === activeTab)?.label || "Dashboard"}
              </h1>
              <p className="text-gray-600">Kelola konten website Nagari dengan mudah</p>
            </div>
            <Link 
              href="/" 
              target="_blank"
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span>Lihat Website</span>
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {quickStats.map((stat, index) => (
                  <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="flex items-center">
                      <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                        <BarChart3 className="w-6 h-6 text-white" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-gray-600">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Aksi Cepat</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button 
                    onClick={() => setActiveTab("berita")}
                    className="flex items-center space-x-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
                  >
                    <Plus className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-gray-700">Tambah Berita Baru</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab("galeri")}
                    className="flex items-center space-x-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
                  >
                    <Upload className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-gray-700">Upload Foto Galeri</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab("faq")}
                    className="flex items-center space-x-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
                  >
                    <Plus className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-gray-700">Tambah FAQ</span>
                  </button>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Berita Terbaru</h2>
                <div className="space-y-3">
                  {news.slice(0, 5).map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-2 border-b">
                      <div>
                        <p className="font-medium text-sm">{item.title}</p>
                        <p className="text-xs text-gray-500">{new Date(item.createdAt).toLocaleDateString('id-ID')}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded ${
                        item.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {item.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                  ))}
                  {news.length === 0 && (
                    <p className="text-gray-500 text-sm text-center py-4">Belum ada berita</p>
                  )}
                </div>
              </div>

              {/* Tips for Users */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">
                  💡 Tips Penggunaan Admin Panel
                </h3>
                <ul className="space-y-2 text-blue-800">
                  <li>• Gunakan menu di sebelah kiri untuk navigasi ke berbagai fitur</li>
                  <li>• Semua perubahan akan tersimpan otomatis</li>
                  <li>• Klik "Lihat Website" untuk melihat hasil perubahan</li>
                  <li>• Gunakan tombol "Aksi Cepat" untuk menambah konten baru dengan mudah</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === "berita" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Kelola Portal Berita</h2>
                <button 
                  onClick={() => setShowNewsForm(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tulis Berita Baru</span>
                </button>
              </div>

              {/* News Form Modal */}
              {showNewsForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Tambah Berita Baru</h3>
                      <button
                        onClick={() => setShowNewsForm(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>

                    <form onSubmit={handleCreateNews} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Judul Berita</label>
                        <input
                          type="text"
                          required
                          value={newsForm.title}
                          onChange={(e) => setNewsForm({...newsForm, title: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="Masukkan judul berita..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ringkasan</label>
                        <textarea
                          value={newsForm.excerpt}
                          onChange={(e) => setNewsForm({...newsForm, excerpt: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                          rows={2}
                          placeholder="Ringkasan singkat berita (opsional)..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Isi Berita</label>
                        <textarea
                          required
                          value={newsForm.content}
                          onChange={(e) => setNewsForm({...newsForm, content: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                          rows={8}
                          placeholder="Tulis isi berita lengkap di sini..."
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">URL Gambar</label>
                          <input
                            type="url"
                            value={newsForm.coverImage}
                            onChange={(e) => setNewsForm({...newsForm, coverImage: e.target.value})}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="https://example.com/gambar.jpg"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Penulis</label>
                          <input
                            type="text"
                            value={newsForm.author}
                            onChange={(e) => setNewsForm({...newsForm, author: e.target.value})}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                        <input
                          type="text"
                          value={newsForm.tags}
                          onChange={(e) => setNewsForm({...newsForm, tags: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="berita, kegiatan, nagari"
                        />
                      </div>

                      <div className="flex justify-end space-x-3 pt-4 border-t">
                        <button
                          type="button"
                          onClick={() => setShowNewsForm(false)}
                          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                          Batal
                        </button>
                        <button
                          type="submit"
                          disabled={loading}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center"
                        >
                          {loading ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          ) : (
                            <Save className="w-4 h-4 mr-2" />
                          )}
                          {loading ? 'Menyimpan...' : 'Publikasikan Berita'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* News List */}
              <div className="bg-white rounded-lg shadow-sm">
                {news.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Penulis</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {news.map((item) => (
                          <tr key={item.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div>
                                <div className="text-sm font-medium text-gray-900">{item.title}</div>
                                <div className="text-sm text-gray-500">{item.excerpt || 'Tidak ada ringkasan'}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">{item.author}</td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                item.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {item.published ? 'Dipublikasi' : 'Draft'}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                              {new Date(item.createdAt).toLocaleDateString('id-ID')}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">{item.views || 0}</td>
                            <td className="px-6 py-4 text-sm font-medium">
                              <button
                                onClick={() => handleDeleteNews(item.id)}
                                className="text-red-600 hover:text-red-900 p-1"
                                title="Hapus berita"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">Belum ada berita yang dipublikasikan</p>
                    <button 
                      onClick={() => setShowNewsForm(true)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Tulis Berita Pertama
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "galeri" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Kelola Galeri Foto</h2>
                <button 
                  onClick={() => setShowGalleryForm(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Foto</span>
                </button>
              </div>

              {/* Gallery Form Modal */}
              {showGalleryForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded-lg max-w-lg w-full mx-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Upload Foto Baru</h3>
                      <button
                        onClick={() => setShowGalleryForm(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>

                    <form onSubmit={handleCreateGallery} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Judul Foto</label>
                        <input
                          type="text"
                          required
                          value={galleryForm.title}
                          onChange={(e) => setGalleryForm({...galleryForm, title: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Masukkan judul foto..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                        <textarea
                          value={galleryForm.description}
                          onChange={(e) => setGalleryForm({...galleryForm, description: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows={3}
                          placeholder="Deskripsi atau keterangan foto..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">URL Foto</label>
                        <input
                          type="url"
                          required
                          value={galleryForm.imageUrl}
                          onChange={(e) => setGalleryForm({...galleryForm, imageUrl: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="https://example.com/foto.jpg"
                        />
                        <p className="text-xs text-gray-500 mt-1">Salin link foto dari Google Drive, Dropbox, atau hosting gambar lainnya</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                          <select
                            value={galleryForm.category}
                            onChange={(e) => setGalleryForm({...galleryForm, category: e.target.value})}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="kegiatan">Kegiatan</option>
                            <option value="wisata">Wisata</option>
                            <option value="budaya">Budaya</option>
                            <option value="pembangunan">Pembangunan</option>
                            <option value="lainnya">Lainnya</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Acara</label>
                          <input
                            type="date"
                            value={galleryForm.eventDate}
                            onChange={(e) => setGalleryForm({...galleryForm, eventDate: e.target.value})}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end space-x-3 pt-4 border-t">
                        <button
                          type="button"
                          onClick={() => setShowGalleryForm(false)}
                          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                          Batal
                        </button>
                        <button
                          type="submit"
                          disabled={loading}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
                        >
                          {loading ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          ) : (
                            <Upload className="w-4 h-4 mr-2" />
                          )}
                          {loading ? 'Mengupload...' : 'Upload Foto'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Gallery Grid */}
              {gallery.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {gallery.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden group">
                      <div className="aspect-video bg-gray-200 relative">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found'
                          }}
                        />
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleDeleteGallery(item.id)}
                            className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                            title="Hapus foto"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                        {item.description && (
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                        )}
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span className="bg-gray-100 px-2 py-1 rounded-full">{item.category}</span>
                          <span>{new Date(item.createdAt).toLocaleDateString('id-ID')}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                  <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Galeri Masih Kosong</h3>
                  <p className="text-gray-500 mb-6">Upload foto pertama untuk mengisi galeri nagari</p>
                  <button 
                    onClick={() => setShowGalleryForm(true)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Upload Foto Pertama
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === "wali-nagari" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Kelola Wali Nagari</h2>
                <button 
                  onClick={() => setShowWaliForm(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Wali Nagari</span>
                </button>
              </div>

              {/* Wali Form Modal */}
              {showWaliForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Tambah Wali Nagari</h3>
                      <button
                        onClick={() => setShowWaliForm(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>

                    <form onSubmit={handleCreateWali} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                        <input
                          type="text"
                          required
                          value={waliForm.name}
                          onChange={(e) => setWaliForm({...waliForm, name: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="Masukkan nama lengkap..."
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Tahun Mulai</label>
                          <input
                            type="number"
                            required
                            value={waliForm.startYear}
                            onChange={(e) => setWaliForm({...waliForm, startYear: parseInt(e.target.value)})}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Tahun Berakhir (kosongkan jika masih aktif)</label>
                          <input
                            type="number"
                            value={waliForm.endYear}
                            onChange={(e) => setWaliForm({...waliForm, endYear: e.target.value})}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">URL Foto</label>
                        <input
                          type="url"
                          value={waliForm.photo}
                          onChange={(e) => setWaliForm({...waliForm, photo: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="https://example.com/photo.jpg"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Biografi</label>
                        <textarea
                          value={waliForm.biography}
                          onChange={(e) => setWaliForm({...waliForm, biography: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                          rows={4}
                          placeholder="Ceritakan tentang latar belakang..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Prestasi & Pencapaian</label>
                        <textarea
                          value={waliForm.achievements}
                          onChange={(e) => setWaliForm({...waliForm, achievements: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                          rows={3}
                          placeholder="Capaian selama menjabat..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Urutan</label>
                        <input
                          type="number"
                          required
                          value={waliForm.order}
                          onChange={(e) => setWaliForm({...waliForm, order: parseInt(e.target.value)})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                          min="1"
                        />
                      </div>

                      <div className="flex gap-2 pt-4">
                        <button
                          type="submit"
                          disabled={loading}
                          className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                        >
                          {loading ? 'Menyimpan...' : 'Simpan'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowWaliForm(false)}
                          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Batal
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Wali Nagari List */}
              {waliNagaris.length > 0 ? (
                <div className="space-y-4">
                  {waliNagaris.map((wali) => (
                    <div key={wali.id} className="bg-white rounded-lg shadow-sm p-4 border">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{wali.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {wali.startYear} - {wali.endYear || 'Sekarang'} (Periode ke-{wali.order})
                          </p>
                          {wali.biography && (
                            <p className="text-sm text-gray-700 line-clamp-2 mb-2">{wali.biography}</p>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                  <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Data Wali Nagari Kosong</h3>
                  <p className="text-gray-500 mb-6">Tambahkan data wali nagari pertama</p>
                  <button 
                    onClick={() => setShowWaliForm(true)}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Tambah Wali Nagari
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === "faq" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Kelola FAQ</h2>
                <button 
                  onClick={() => setShowFaqForm(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah FAQ</span>
                </button>
              </div>

              {/* FAQ Form Modal */}
              {showFaqForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Tambah FAQ Baru</h3>
                      <button
                        onClick={() => setShowFaqForm(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>

                    <form onSubmit={handleCreateFaq} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pertanyaan</label>
                        <input
                          type="text"
                          required
                          value={faqForm.question}
                          onChange={(e) => setFaqForm({...faqForm, question: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="Masukkan pertanyaan..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Jawaban</label>
                        <textarea
                          required
                          value={faqForm.answer}
                          onChange={(e) => setFaqForm({...faqForm, answer: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                          rows={4}
                          placeholder="Masukkan jawaban lengkap..."
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                          <select
                            value={faqForm.category}
                            onChange={(e) => setFaqForm({...faqForm, category: e.target.value})}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                          >
                            <option value="umum">Umum</option>
                            <option value="pelayanan">Pelayanan</option>
                            <option value="adat">Adat Istiadat</option>
                            <option value="administrasi">Administrasi</option>
                            <option value="lainnya">Lainnya</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Urutan</label>
                          <input
                            type="number"
                            value={faqForm.order}
                            onChange={(e) => setFaqForm({...faqForm, order: parseInt(e.target.value)})}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            min="0"
                          />
                        </div>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="published"
                          checked={faqForm.published}
                          onChange={(e) => setFaqForm({...faqForm, published: e.target.checked})}
                          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <label htmlFor="published" className="ml-2 text-sm text-gray-700">
                          Tampilkan di halaman publik
                        </label>
                      </div>

                      <div className="flex gap-2 pt-4">
                        <button
                          type="submit"
                          disabled={loading}
                          className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                        >
                          {loading ? 'Menyimpan...' : 'Simpan'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowFaqForm(false)}
                          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Batal
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* FAQ List */}
              {faqs.length > 0 ? (
                <div className="space-y-4">
                  {faqs.map((faq) => (
                    <div key={faq.id} className="bg-white rounded-lg shadow-sm p-4 border">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              faq.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {faq.published ? 'Published' : 'Draft'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 line-clamp-2 mb-2">{faq.answer}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="bg-gray-100 px-2 py-1 rounded-full">{faq.category}</span>
                            <span>Urutan: {faq.order}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                  <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">FAQ Masih Kosong</h3>
                  <p className="text-gray-500 mb-6">Tambahkan FAQ pertama untuk membantu masyarakat</p>
                  <button 
                    onClick={() => setShowFaqForm(true)}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Tambah FAQ Pertama
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Profil Nagari Tab */}
          {activeTab === "profil" && (
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">Profil Nagari</h2>
                  <button
                    onClick={() => {
                      if (profile) {
                        setProfileForm({
                          name: profile.name || '',
                          description: profile.description || '',
                          address: profile.address || '',
                          phone: profile.phone || '',
                          email: profile.email || '',
                          website: profile.website || '',
                          logo: profile.logo || '',
                          vision: profile.vision || '',
                          mission: profile.mission || '',
                          history: profile.history || ''
                        });
                      }
                      setShowProfileForm(true);
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit Profil</span>
                  </button>
                </div>
              </div>

              <div className="p-6">
                {profile ? (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Nama Nagari</h3>
                        <p className="text-gray-600">{profile.name}</p>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Email</h3>
                        <p className="text-gray-600">{profile.email || '-'}</p>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Telepon</h3>
                        <p className="text-gray-600">{profile.phone || '-'}</p>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Website</h3>
                        <p className="text-gray-600">{profile.website || '-'}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Alamat</h3>
                      <p className="text-gray-600">{profile.address}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Deskripsi</h3>
                      <p className="text-gray-600">{profile.description}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Visi</h3>
                      <p className="text-gray-600">{profile.vision}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Misi</h3>
                      <p className="text-gray-600">{profile.mission}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Belum ada data profil nagari</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Adat Istiadat Tab */}
          {activeTab === "adat-istiadat" && (
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">Adat Istiadat</h2>
                  <button
                    onClick={() => setShowAdatForm(true)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Adat Istiadat</span>
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid gap-4">
                  {adatIstiadata.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{item.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{item.jorong.name} • {item.category}</p>
                          <p className="text-gray-600 mt-2 line-clamp-2">{item.description}</p>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-green-600 hover:bg-green-50 rounded">
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {adatIstiadata.length === 0 && (
                    <div className="text-center py-8">
                      <Book className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">Belum ada adat istiadat</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Statistik Tab */}
          {activeTab === "statistik" && (
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">Statistik Populasi</h2>
                  <button
                    onClick={() => setShowStatForm(true)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Data Statistik</span>
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid gap-4">
                  {statistics.map((stat) => (
                    <div key={stat.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{stat.jorong.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">Tahun {stat.year}</p>
                          <div className="grid grid-cols-3 gap-4 mt-3 text-sm">
                            <div>
                              <span className="text-gray-500">Total Populasi:</span>
                              <span className="font-medium ml-1">{stat.population.toLocaleString()}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Laki-laki:</span>
                              <span className="font-medium ml-1">{stat.maleCount.toLocaleString()}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Perempuan:</span>
                              <span className="font-medium ml-1">{stat.femaleCount.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <button className="p-2 text-green-600 hover:bg-green-50 rounded">
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {statistics.length === 0 && (
                    <div className="text-center py-8">
                      <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">Belum ada data statistik</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Jorong Management Tab */}
          {activeTab === "jorong" && (
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">Kelola Jorong</h2>
                  <button
                    onClick={() => setShowJorongForm(true)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Jorong</span>
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid gap-4">
                  {jorongs.map((jorong) => (
                    <div key={jorong.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{jorong.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{jorong.description}</p>
                          <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                            <div>
                              <span className="text-gray-500">Kepala Jorong:</span>
                              <span className="font-medium ml-1">{jorong.kepalaJorong || '-'}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Populasi:</span>
                              <span className="font-medium ml-1">{jorong.population?.toLocaleString() || '-'}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <button className="p-2 text-green-600 hover:bg-green-50 rounded">
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {jorongs.length === 0 && (
                    <div className="text-center py-8">
                      <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">Belum ada data jorong</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Pengaturan Sistem</h2>
              </div>

              <div className="p-6">
                <div className="space-y-6">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-2">Pengaturan Umum</h3>
                    <div className="grid gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Website</label>
                        <input
                          type="text"
                          defaultValue="Website Nagari"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Website</label>
                        <textarea
                          defaultValue="Portal informasi resmi Nagari di Sumatera Barat"
                          rows={3}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-2">Backup & Import</h3>
                    <div className="grid gap-4">
                      <div className="flex gap-2">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                          Export Data
                        </button>
                        <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50">
                          Import Data
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-2">Maintenance</h3>
                    <div className="grid gap-4">
                      <div className="flex gap-2">
                        <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700">
                          Clear Cache
                        </button>
                        <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50">
                          Reset Statistics
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Add more tab content as needed */}
          {!["dashboard", "berita", "galeri", "wali-nagari", "faq", "profil", "adat-istiadat", "statistik", "jorong", "settings"].includes(activeTab) && (
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                {menuItems.find(item => item.id === activeTab)?.label}
              </h2>
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Fitur ini sedang dalam pengembangan</p>
              </div>
            </div>
          )}
        </main>

        {/* Modals */}
        {/* Profile Form Modal */}
        {showProfileForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-semibold mb-4">Edit Profil Nagari</h3>
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Nagari</label>
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Telepon</label>
                    <input
                      type="text"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                    <input
                      type="url"
                      value={profileForm.website}
                      onChange={(e) => setProfileForm({...profileForm, website: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
                  <textarea
                    value={profileForm.address}
                    onChange={(e) => setProfileForm({...profileForm, address: e.target.value})}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                  <textarea
                    value={profileForm.description}
                    onChange={(e) => setProfileForm({...profileForm, description: e.target.value})}
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Visi</label>
                  <textarea
                    value={profileForm.vision}
                    onChange={(e) => setProfileForm({...profileForm, vision: e.target.value})}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Misi</label>
                  <textarea
                    value={profileForm.mission}
                    onChange={(e) => setProfileForm({...profileForm, mission: e.target.value})}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Menyimpan...' : 'Simpan'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowProfileForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Adat Istiadat Form Modal */}
        {showAdatForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-semibold mb-4">Tambah Adat Istiadat</h3>
              <form onSubmit={handleCreateAdat} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Jorong</label>
                    <select
                      value={adatForm.jorongId}
                      onChange={(e) => setAdatForm({...adatForm, jorongId: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    >
                      <option value="">Pilih Jorong</option>
                      {jorongs.map(jorong => (
                        <option key={jorong.id} value={jorong.id}>{jorong.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                    <select
                      value={adatForm.category}
                      onChange={(e) => setAdatForm({...adatForm, category: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="tradisi">Tradisi</option>
                      <option value="upacara">Upacara</option>
                      <option value="budaya">Budaya</option>
                      <option value="ritual">Ritual</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Judul</label>
                  <input
                    type="text"
                    value={adatForm.title}
                    onChange={(e) => setAdatForm({...adatForm, title: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Singkat</label>
                  <textarea
                    value={adatForm.description}
                    onChange={(e) => setAdatForm({...adatForm, description: e.target.value})}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Konten Lengkap</label>
                  <textarea
                    value={adatForm.content}
                    onChange={(e) => setAdatForm({...adatForm, content: e.target.value})}
                    rows={6}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL Gambar (opsional)</label>
                  <input
                    type="url"
                    value={adatForm.images}
                    onChange={(e) => setAdatForm({...adatForm, images: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Menyimpan...' : 'Simpan'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAdatForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Statistics Form Modal */}
        {showStatForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-semibold mb-4">Tambah Data Statistik</h3>
              <form onSubmit={handleCreateStatistic} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Jorong</label>
                    <select
                      value={statForm.jorongId}
                      onChange={(e) => setStatForm({...statForm, jorongId: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    >
                      <option value="">Pilih Jorong</option>
                      {jorongs.map(jorong => (
                        <option key={jorong.id} value={jorong.id}>{jorong.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tahun</label>
                    <input
                      type="number"
                      value={statForm.year}
                      onChange={(e) => setStatForm({...statForm, year: parseInt(e.target.value)})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Populasi</label>
                    <input
                      type="number"
                      value={statForm.population}
                      onChange={(e) => setStatForm({...statForm, population: parseInt(e.target.value)})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Laki-laki</label>
                    <input
                      type="number"
                      value={statForm.maleCount}
                      onChange={(e) => setStatForm({...statForm, maleCount: parseInt(e.target.value)})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Perempuan</label>
                    <input
                      type="number"
                      value={statForm.femaleCount}
                      onChange={(e) => setStatForm({...statForm, femaleCount: parseInt(e.target.value)})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Anak-anak</label>
                    <input
                      type="number"
                      value={statForm.childCount}
                      onChange={(e) => setStatForm({...statForm, childCount: parseInt(e.target.value)})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dewasa</label>
                    <input
                      type="number"
                      value={statForm.adultCount}
                      onChange={(e) => setStatForm({...statForm, adultCount: parseInt(e.target.value)})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Lansia</label>
                    <input
                      type="number"
                      value={statForm.elderlyCount}
                      onChange={(e) => setStatForm({...statForm, elderlyCount: parseInt(e.target.value)})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kepala Keluarga</label>
                    <input
                      type="number"
                      value={statForm.households}
                      onChange={(e) => setStatForm({...statForm, households: parseInt(e.target.value)})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Menyimpan...' : 'Simpan'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowStatForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Jorong Form Modal */}
        {showJorongForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-lg w-full">
              <h3 className="text-lg font-semibold mb-4">Tambah Jorong</h3>
              <form onSubmit={handleCreateJorong} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Jorong</label>
                  <input
                    type="text"
                    value={jorongForm.name}
                    onChange={(e) => setJorongForm({...jorongForm, name: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                  <textarea
                    value={jorongForm.description}
                    onChange={(e) => setJorongForm({...jorongForm, description: e.target.value})}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kepala Jorong</label>
                  <input
                    type="text"
                    value={jorongForm.kepalaJorong}
                    onChange={(e) => setJorongForm({...jorongForm, kepalaJorong: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Populasi</label>
                    <input
                      type="number"
                      value={jorongForm.population}
                      onChange={(e) => setJorongForm({...jorongForm, population: parseInt(e.target.value)})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Luas (km²)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={jorongForm.area}
                      onChange={(e) => setJorongForm({...jorongForm, area: parseFloat(e.target.value)})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Menyimpan...' : 'Simpan'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowJorongForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
