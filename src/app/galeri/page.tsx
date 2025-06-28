'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, Search, Image as ImageIcon, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  createdAt: string;
}

export default function GaleriPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredGallery, setFilteredGallery] = useState<GalleryItem[]>([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchGallery();
  }, []);

  useEffect(() => {
    const filtered = gallery.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === '' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredGallery(filtered);
  }, [gallery, searchTerm, selectedCategory]);

  const fetchGallery = async () => {
    try {
      const response = await fetch('/api/admin/gallery');
      if (response.ok) {
        const data = await response.json();
        setGallery(data);
      }
    } catch (error) {
      console.error('Error fetching gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [...new Set(gallery.map(item => item.category))];

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredGallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredGallery.length) % filteredGallery.length);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (lightboxOpen) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen]);

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
              Galeri Nagari
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Dokumentasi kegiatan dan momen bersejarah nagari
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Cari foto..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            
            {/* Category Filter */}
            <div className="lg:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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

      {/* Content */}
      <div className="container-custom section-padding">
        {filteredGallery.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <ImageIcon className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {searchTerm || selectedCategory ? 'Tidak ada foto yang ditemukan' : 'Belum ada foto'}
            </h3>
            <p className="text-gray-500">
              {searchTerm || selectedCategory ? 'Coba ubah kata kunci atau kategori' : 'Foto akan segera tersedia'}
            </p>
          </div>
        ) : (
          <>
            {/* Results Info */}
            <div className="mb-6">
              <p className="text-gray-600">
                Menampilkan {filteredGallery.length} foto
                {selectedCategory && ` dalam kategori "${selectedCategory}"`}
                {searchTerm && ` dengan kata kunci "${searchTerm}"`}
              </p>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredGallery.map((item, index) => (
                <div key={item.id} className="group cursor-pointer" onClick={() => openLightbox(index)}>
                  <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-end">
                      <div className="p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                        <p className="text-xs opacity-90">{item.category}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">{item.title}</h3>
                    <p className="text-xs text-gray-500 mb-1">{item.category}</p>
                    <p className="text-xs text-gray-400">
                      {format(new Date(item.createdAt), 'dd MMM yyyy', { locale: id })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative max-w-7xl max-h-full p-4">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Navigation Buttons */}
            {filteredGallery.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}

            {/* Image */}
            <div className="flex items-center justify-center">
              <img
                src={filteredGallery[currentImageIndex]?.imageUrl}
                alt={filteredGallery[currentImageIndex]?.title}
                className="max-w-full max-h-[80vh] object-contain"
              />
            </div>

            {/* Image Info */}
            <div className="absolute bottom-4 left-4 right-4 text-white bg-black bg-opacity-50 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-1">
                {filteredGallery[currentImageIndex]?.title}
              </h3>
              <p className="text-sm opacity-90 mb-2">
                {filteredGallery[currentImageIndex]?.description}
              </p>
              <div className="flex items-center justify-between text-xs">
                <span>{filteredGallery[currentImageIndex]?.category}</span>
                <span>
                  {format(new Date(filteredGallery[currentImageIndex]?.createdAt), 'dd MMMM yyyy', { locale: id })}
                </span>
                <span>
                  {currentImageIndex + 1} / {filteredGallery.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container-custom text-center">
          <p>&copy; 2024 Website Nagari. Semua hak dilindungi.</p>
        </div>
      </footer>
    </div>
  );
}
