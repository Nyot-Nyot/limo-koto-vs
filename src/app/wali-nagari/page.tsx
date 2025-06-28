'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, Crown, Users, Award, MapPin } from 'lucide-react';

interface WaliNagari {
  id: string;
  name: string;
  startYear: number;
  endYear?: number;
  photo?: string;
  biography?: string;
  achievements?: string;
  order: number;
  createdAt: string;
}

export default function WaliNagariPage() {
  const [waliNagaris, setWaliNagaris] = useState<WaliNagari[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWaliNagaris();
  }, []);

  const fetchWaliNagaris = async () => {
    try {
      const response = await fetch('/api/admin/wali-nagari');
      if (response.ok) {
        const data = await response.json();
        setWaliNagaris(data);
      }
    } catch (error) {
      console.error('Error fetching wali nagari:', error);
    } finally {
      setLoading(false);
    }
  };

  const currentWali = waliNagaris.find(wali => !wali.endYear);
  const formerWalis = waliNagaris.filter(wali => wali.endYear).sort((a, b) => b.startYear - a.startYear);

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
              Riwayat Wali Nagari
            </h1>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto">
              Sejarah kepemimpinan nagari dari masa ke masa
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom section-padding">
        {waliNagaris.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Crown className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Belum ada data wali nagari
            </h3>
            <p className="text-gray-500">
              Data riwayat wali nagari akan segera tersedia
            </p>
          </div>
        ) : (
          <>
            {/* Current Wali Nagari */}
            {currentWali && (
              <div className="mb-12">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-display font-bold text-gray-900 mb-2">
                    Wali Nagari Saat Ini
                  </h2>
                  <div className="w-24 h-1 bg-traditional-gold mx-auto"></div>
                </div>
                
                <div className="card-traditional max-w-4xl mx-auto">
                  <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                    {/* Photo */}
                    <div className="flex-shrink-0">
                      <div className="w-48 h-48 bg-gradient-to-br from-traditional-gold to-traditional-red rounded-xl overflow-hidden shadow-lg">
                        {currentWali.photo ? (
                          <img
                            src={currentWali.photo}
                            alt={currentWali.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Crown className="w-20 h-20 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Info */}
                    <div className="flex-1 text-center lg:text-left">
                      <h3 className="text-3xl font-display font-bold text-traditional mb-3">
                        {currentWali.name}
                      </h3>
                      <div className="flex items-center justify-center lg:justify-start text-traditional-brown mb-4">
                        <Calendar className="w-5 h-5 mr-2" />
                        <span className="font-medium">
                          {currentWali.startYear} - Sekarang
                        </span>
                      </div>
                      
                      {currentWali.biography && (
                        <div className="mb-6">
                          <h4 className="text-lg font-semibold text-gray-900 mb-3">Biografi</h4>
                          <div className="prose prose-gray max-w-none">
                            {currentWali.biography.split('\n').map((paragraph, index) => (
                              <p key={index} className="mb-3 text-gray-700">{paragraph}</p>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {currentWali.achievements && (
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                            <Award className="w-5 h-5 mr-2 text-traditional-gold" />
                            Prestasi & Pencapaian
                          </h4>
                          <div className="prose prose-gray max-w-none">
                            {currentWali.achievements.split('\n').map((achievement, index) => (
                              <p key={index} className="mb-2 text-gray-700">• {achievement}</p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Former Wali Nagaris */}
            {formerWalis.length > 0 && (
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-display font-bold text-gray-900 mb-2">
                    Mantan Wali Nagari
                  </h2>
                  <div className="w-24 h-1 bg-traditional-gold mx-auto"></div>
                  <p className="text-gray-600 mt-4">
                    Sejarah kepemimpinan nagari sepanjang masa
                  </p>
                </div>

                <div className="space-y-8">
                  {formerWalis.map((wali, index) => (
                    <div key={wali.id} className="card group hover:shadow-xl transition-all duration-300">
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Photo */}
                        <div className="flex-shrink-0 mx-auto md:mx-0">
                          <div className="w-32 h-32 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg overflow-hidden">
                            {wali.photo ? (
                              <img
                                src={wali.photo}
                                alt={wali.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Crown className="w-12 h-12 text-primary-600" />
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Info */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-2xl font-display font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                                {wali.name}
                              </h3>
                              <div className="flex items-center text-gray-600 mt-1">
                                <Calendar className="w-4 h-4 mr-2" />
                                <span>
                                  {wali.startYear} - {wali.endYear}
                                  {' '}({(wali.endYear || 0) - wali.startYear} tahun)
                                </span>
                              </div>
                            </div>
                            <div className="hidden md:block text-right">
                              <div className="text-sm text-gray-500">Periode ke-</div>
                              <div className="text-2xl font-bold text-primary-600">{wali.order}</div>
                            </div>
                          </div>
                          
                          {wali.biography && (
                            <div className="mb-4">
                              <h4 className="text-lg font-semibold text-gray-900 mb-2">Biografi</h4>
                              <p className="text-gray-700 line-clamp-3">
                                {wali.biography}
                              </p>
                            </div>
                          )}
                          
                          {wali.achievements && (
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                                <Award className="w-4 h-4 mr-2 text-traditional-gold" />
                                Prestasi Utama
                              </h4>
                              <div className="text-gray-700">
                                {wali.achievements.split('\n').slice(0, 3).map((achievement, achievementIndex) => (
                                  <p key={achievementIndex} className="mb-1">• {achievement}</p>
                                ))}
                                {wali.achievements.split('\n').length > 3 && (
                                  <p className="text-gray-500 italic">...dan pencapaian lainnya</p>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Timeline Summary */}
            <div className="mt-16">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-display font-bold text-gray-900 mb-2">
                  Timeline Kepemimpinan
                </h2>
                <div className="w-24 h-1 bg-traditional-gold mx-auto"></div>
              </div>
              
              <div className="card">
                <div className="flex flex-wrap justify-center gap-4">
                  {waliNagaris.sort((a, b) => a.startYear - b.startYear).map((wali, index) => (
                    <div key={wali.id} className="text-center">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold ${
                        !wali.endYear ? 'bg-traditional-gold' : 'bg-primary-600'
                      }`}>
                        {wali.order}
                      </div>
                      <div className="mt-2 text-sm font-medium text-gray-900">
                        {wali.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {wali.startYear} - {wali.endYear || 'Sekarang'}
                      </div>
                    </div>
                  ))}
                </div>
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
