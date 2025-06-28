'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, HelpCircle, ChevronDown, ChevronUp, Search, Filter } from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
  order: number;
  published: boolean;
  createdAt: string;
}

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const response = await fetch('/api/admin/faq');
      if (response.ok) {
        const data = await response.json();
        // Filter only published FAQs
        const publishedFAQs = data.filter((faq: FAQ) => faq.published);
        setFaqs(publishedFAQs);
      }
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [...new Set(faqs.map(faq => faq.category).filter(Boolean))];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => a.order - b.order);

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container-custom section-padding">
          <div className="flex items-center mb-6">
            <Link href="/" className="flex items-center text-white hover:text-primary-200 transition-colors mr-4">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Kembali
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Pertanyaan yang Sering Diajukan
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Temukan jawaban atas pertanyaan umum seputar nagari
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Cari pertanyaan atau jawaban..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            
            {/* Category Filter */}
            <div className="lg:w-64">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
                >
                  <option value="">Semua Kategori</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom section-padding">
        {filteredFAQs.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <HelpCircle className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {searchTerm || selectedCategory ? 'Tidak ada FAQ yang ditemukan' : 'Belum ada FAQ'}
            </h3>
            <p className="text-gray-500">
              {searchTerm || selectedCategory ? 'Coba ubah kata kunci atau kategori pencarian' : 'FAQ akan segera tersedia'}
            </p>
          </div>
        ) : (
          <>
            {/* Results Info */}
            <div className="mb-6">
              <p className="text-gray-600">
                Menampilkan {filteredFAQs.length} pertanyaan
                {selectedCategory && ` dalam kategori "${selectedCategory}"`}
                {searchTerm && ` dengan kata kunci "${searchTerm}"`}
              </p>
            </div>

            {/* FAQ List */}
            <div className="max-w-4xl mx-auto space-y-4">
              {filteredFAQs.map((faq) => (
                <div key={faq.id} className="card">
                  <button
                    onClick={() => toggleExpanded(faq.id)}
                    className="w-full text-left focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 pr-4">
                          {faq.question}
                        </h3>
                        {faq.category && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                            {faq.category}
                          </span>
                        )}
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        {expandedItems.has(faq.id) ? (
                          <ChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        )}
                      </div>
                    </div>
                  </button>
                  
                  {expandedItems.has(faq.id) && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="prose prose-gray max-w-none">
                        {faq.answer.split('\n').map((paragraph, index) => (
                          <p key={index} className="mb-3 text-gray-700 leading-relaxed">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Categories Overview */}
            {categories.length > 0 && !selectedCategory && (
              <div className="mt-16">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">
                    Kategori FAQ
                  </h2>
                  <p className="text-gray-600">
                    Jelajahi pertanyaan berdasarkan kategori
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categories.map(category => {
                    const categoryCount = faqs.filter(faq => faq.category === category).length;
                    return (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category || '')}
                        className="card group hover:shadow-xl transition-all duration-300 text-left"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                              {category}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                              {categoryCount} pertanyaan
                            </p>
                          </div>
                          <HelpCircle className="w-8 h-8 text-primary-600 group-hover:scale-110 transition-transform" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Help Text */}
            <div className="mt-16 text-center">
              <div className="card max-w-2xl mx-auto bg-primary-50 border-primary-200">
                <HelpCircle className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Tidak menemukan jawaban yang Anda cari?
                </h3>
                <p className="text-gray-600 mb-4">
                  Kami siap membantu Anda! Hubungi kantor nagari untuk informasi lebih lanjut.
                </p>
                <Link href="/profil" className="btn-primary">
                  Hubungi Kami
                </Link>
              </div>
            </div>
          </>
        )}
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
