'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, MapPin, Calendar, Users, Book } from 'lucide-react';

interface Jorong {
  id: string;
  name: string;
  description: string;
  area?: number;
  population: number;
  kepalaJorong?: string;
  createdAt: string;
}

interface AdatIstiadat {
  id: string;
  jorongId: string;
  title: string;
  description: string;
  content: string;
  category: string;
  images?: string;
  createdAt: string;
}

interface AdatWithJorong extends AdatIstiadat {
  jorong: Jorong;
}

export default function AdatIstiadatPage() {
  const [adatData, setAdatData] = useState<AdatWithJorong[]>([]);
  const [jorongs, setJorongs] = useState<Jorong[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJorong, setSelectedJorong] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch Jorongs
      const jorongsResponse = await fetch('/api/admin/jorongs');
      if (jorongsResponse.ok) {
        const jorongsData = await jorongsResponse.json();
        setJorongs(jorongsData);
      }

      // Fetch Adat Istiadat - we'll need to create this API
      const adatResponse = await fetch('/api/admin/adat-istiadat');
      if (adatResponse.ok) {
        const adatData = await adatResponse.json();
        setAdatData(adatData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAdat = selectedJorong 
    ? adatData.filter(item => item.jorongId === selectedJorong)
    : adatData;

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
      <div className="bg-gradient-to-r from-traditional-red to-traditional-gold text-white">
        <div className="container-custom section-padding">
          <div className="flex items-center mb-6">
            <Link href="/" className="flex items-center text-white hover:text-orange-200 transition-colors mr-4">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Kembali
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Adat Istiadat Nagari
            </h1>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto">
              Warisan budaya dan tradisi yang dilestarikan turun temurun
            </p>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-6">
          <div className="max-w-md mx-auto">
            <select
              value={selectedJorong}
              onChange={(e) => setSelectedJorong(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Semua Jorong</option>
              {jorongs.map(jorong => (
                <option key={jorong.id} value={jorong.id}>{jorong.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom section-padding">
        {filteredAdat.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Book className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {selectedJorong ? 'Tidak ada data adat istiadat untuk jorong ini' : 'Belum ada data adat istiadat'}
            </h3>
            <p className="text-gray-500">
              Data adat istiadat akan segera tersedia
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredAdat.map((adat) => (
              <div key={adat.id} className="card-traditional">
                {/* Traditional Pattern Overlay */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                  <div className="hero-pattern w-full h-full"></div>
                </div>
                
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <h2 className="text-3xl font-display font-bold text-traditional mb-3">
                        {adat.title}
                      </h2>
                      <div className="flex items-center text-traditional-brown">
                        <MapPin className="w-5 h-5 mr-2" />
                        <span className="font-medium">Jorong {adat.jorong?.name || 'Unknown'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-8">
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {adat.description}
                    </p>
                  </div>

                  {/* Content */}
                  <div className="mb-8">
                    <div className="bg-traditional-gold/10 rounded-lg p-6 border border-traditional-gold/20">
                      <div className="flex items-center mb-4">
                        <Book className="w-6 h-6 text-traditional-gold mr-3" />
                        <h3 className="text-xl font-display font-bold text-gray-900">Deskripsi Adat</h3>
                      </div>
                      <div className="prose prose-lg max-w-none text-gray-700">
                        {adat.content.split('\n').map((paragraph: string, index: number) => (
                          <p key={index} className="mb-4">{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="mb-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-traditional-red/10 text-traditional-red border border-traditional-red/20">
                      {adat.category}
                    </span>
                  </div>

                  {/* Images */}
                  {adat.images && (
                    <div className="mb-8">
                      <h3 className="text-xl font-display font-bold text-gray-900 mb-4">Galeri</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {JSON.parse(adat.images).map((imageUrl: string, index: number) => (
                          <div key={index} className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                            <img
                              src={imageUrl}
                              alt={`${adat.title} - ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Jorongs Overview */}
        {!selectedJorong && jorongs.length > 0 && (
          <div className="mt-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
                Jorong di Nagari
              </h2>
              <p className="text-lg text-gray-600">
                Terdapat {jorongs.length} jorong dengan keunikan adat istiadat masing-masing
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jorongs.map((jorong) => (
                <div key={jorong.id} className="card group hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-display font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {jorong.name}
                    </h3>
                    <button
                      onClick={() => setSelectedJorong(jorong.id)}
                      className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Lihat Adat →
                    </button>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {jorong.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {jorong.area || 0} km²
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {jorong.population.toLocaleString('id-ID')} jiwa
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Kepala Jorong:</span> {jorong.kepalaJorong || 'Belum diisi'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
