'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, MapPin, Users, Calendar, Phone, Mail, Globe } from 'lucide-react';

interface NagariProfile {
  id: string;
  name: string;
  description: string;
  history: string;
  vision: string;
  mission: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  area: number;
  population: number;
  establishedYear: number;
  latitude: number;
  longitude: number;
  waliNagari: string;
  createdAt: string;
  updatedAt: string;
}

export default function ProfilNagariPage() {
  const [profile, setProfile] = useState<NagariProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/admin/profile');
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Profil Nagari Tidak Ditemukan</h1>
          <Link href="/" className="btn-primary">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  const missions = profile.mission.split('\n').filter(m => m.trim());

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
              {profile.name}
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              {profile.description}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Sejarah */}
            <div className="card">
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Sejarah Nagari</h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                {profile.history.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Visi */}
            <div className="card">
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Visi</h2>
              <div className="bg-primary-50 border-l-4 border-primary-600 p-6 rounded-r-lg">
                <p className="text-lg text-gray-800 italic">{profile.vision}</p>
              </div>
            </div>

            {/* Misi */}
            <div className="card">
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Misi</h2>
              <div className="space-y-3">
                {missions.map((mission, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed">{mission.trim()}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Info Umum */}
            <div className="card">
              <h3 className="text-xl font-display font-bold text-gray-900 mb-4">Informasi Umum</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-primary-600 mr-3" />
                  <div>
                    <div className="text-sm text-gray-500">Tahun Berdiri</div>
                    <div className="font-semibold">{profile.establishedYear}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-primary-600 mr-3" />
                  <div>
                    <div className="text-sm text-gray-500">Luas Wilayah</div>
                    <div className="font-semibold">{profile.area} km²</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-primary-600 mr-3" />
                  <div>
                    <div className="text-sm text-gray-500">Jumlah Penduduk</div>
                    <div className="font-semibold">{profile.population.toLocaleString('id-ID')} jiwa</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Kontak */}
            <div className="card">
              <h3 className="text-xl font-display font-bold text-gray-900 mb-4">Kontak</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-primary-600 mr-3 mt-1" />
                  <div>
                    <div className="text-sm text-gray-500">Alamat</div>
                    <div className="text-gray-700">{profile.address}</div>
                  </div>
                </div>
                {profile.phone && (
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-primary-600 mr-3" />
                    <div>
                      <div className="text-sm text-gray-500">Telepon</div>
                      <div className="font-semibold">{profile.phone}</div>
                    </div>
                  </div>
                )}
                {profile.email && (
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-primary-600 mr-3" />
                    <div>
                      <div className="text-sm text-gray-500">Email</div>
                      <div className="font-semibold">{profile.email}</div>
                    </div>
                  </div>
                )}
                {profile.website && (
                  <div className="flex items-center">
                    <Globe className="w-5 h-5 text-primary-600 mr-3" />
                    <div>
                      <div className="text-sm text-gray-500">Website</div>
                      <div className="font-semibold">{profile.website}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Wali Nagari */}
            <div className="card">
              <h3 className="text-xl font-display font-bold text-gray-900 mb-4">Wali Nagari</h3>
              <div className="text-center">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-10 h-10 text-primary-600" />
                </div>
                <div className="font-semibold text-lg">{profile.waliNagari}</div>
                <div className="text-sm text-gray-500">Wali Nagari</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container-custom text-center">
          <p>&copy; 2024 {profile.name}. Semua hak dilindungi.</p>
        </div>
      </footer>
    </div>
  );
}
