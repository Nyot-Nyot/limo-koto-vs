'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Calendar, User, Share2, Facebook, Twitter, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface News {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  imageUrl?: string;
  published: boolean;
  publishedAt?: string;
  createdAt: string;
}

export default function DetailBeritaPage() {
  const params = useParams();
  const [news, setNews] = useState<News | null>(null);
  const [relatedNews, setRelatedNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchNews(params.id as string);
      fetchRelatedNews();
    }
  }, [params.id]);

  const fetchNews = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/news/${id}`);
      if (response.ok) {
        const data = await response.json();
        if (data.published) {
          setNews(data);
        }
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedNews = async () => {
    try {
      const response = await fetch('/api/admin/news');
      if (response.ok) {
        const data = await response.json();
        const publishedNews = data
          .filter((item: News) => item.published && item.id !== params.id)
          .slice(0, 3);
        setRelatedNews(publishedNews);
      }
    } catch (error) {
      console.error('Error fetching related news:', error);
    }
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = news ? `${news.title} - ${news.excerpt}` : '';

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Berita Tidak Ditemukan</h1>
          <Link href="/berita" className="btn-primary">
            Kembali ke Daftar Berita
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-6">
          <Link href="/berita" className="flex items-center text-primary-600 hover:text-primary-700 transition-colors mb-4">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Kembali ke Berita
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Article */}
          <article className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-8">
              {/* Article Header */}
              <div className="mb-6">
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  {format(new Date(news.publishedAt || news.createdAt), 'dd MMMM yyyy, HH:mm', { locale: id })}
                  <User className="w-4 h-4 ml-6 mr-2" />
                  {news.author}
                </div>
                <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
                  {news.title}
                </h1>
                <p className="text-xl text-gray-600">
                  {news.excerpt}
                </p>
              </div>

              {/* Featured Image */}
              {news.imageUrl && (
                <div className="aspect-video bg-gray-200 rounded-lg mb-8 overflow-hidden">
                  <img
                    src={news.imageUrl}
                    alt={news.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                {news.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Share Buttons */}
              <div className="border-t border-gray-200 pt-6 mt-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Share2 className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="text-gray-600 font-medium">Bagikan:</span>
                  </div>
                  <div className="flex space-x-3">
                    <a
                      href={shareLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a
                      href={shareLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a
                      href={shareLinks.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
                    >
                      <MessageSquare className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Related News */}
            {relatedNews.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-display font-bold text-gray-900 mb-4">
                  Berita Terkait
                </h3>
                <div className="space-y-4">
                  {relatedNews.map((item) => (
                    <Link
                      key={item.id}
                      href={`/berita/${item.id}`}
                      className="block group"
                    >
                      <div className="flex space-x-3">
                        {item.imageUrl && (
                          <div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-lg overflow-hidden">
                            <img
                              src={item.imageUrl}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2 mb-1">
                            {item.title}
                          </h4>
                          <p className="text-xs text-gray-500">
                            {format(new Date(item.publishedAt || item.createdAt), 'dd MMM yyyy', { locale: id })}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Link
                    href="/berita"
                    className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
                  >
                    Lihat Semua Berita →
                  </Link>
                </div>
              </div>
            )}

            {/* Quick Links */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-display font-bold text-gray-900 mb-4">
                Menu Utama
              </h3>
              <div className="space-y-3">
                <Link href="/profil" className="block text-gray-600 hover:text-primary-600 transition-colors">
                  Profil Nagari
                </Link>
                <Link href="/adat-istiadat" className="block text-gray-600 hover:text-primary-600 transition-colors">
                  Adat Istiadat
                </Link>
                <Link href="/galeri" className="block text-gray-600 hover:text-primary-600 transition-colors">
                  Galeri
                </Link>
                <Link href="/wali-nagari" className="block text-gray-600 hover:text-primary-600 transition-colors">
                  Riwayat Wali Nagari
                </Link>
                <Link href="/statistik" className="block text-gray-600 hover:text-primary-600 transition-colors">
                  Statistik Penduduk
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container-custom text-center">
          <p>&copy; 2024 Website Nagari. Semua hak dilindungi.</p>
        </div>
      </footer>
    </div>
  );
}
