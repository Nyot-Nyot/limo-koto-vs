'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, MapPin, Navigation, Home, Phone, Mail } from 'lucide-react';

interface NagariProfile {
  name: string;
  address: string;
  phone?: string;
  email?: string;
  latitude?: number;
  longitude?: number;
}

export default function PetaPage() {
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

  const defaultLat = profile?.latitude || -0.7893;
  const defaultLng = profile?.longitude || 100.6517;

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
              Peta Lokasi Nagari
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Lokasi geografis dan petunjuk arah menuju nagari
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map */}
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">Peta Interaktif</h2>
              
              {/* Embedded Map */}
              <div className="aspect-video rounded-lg overflow-hidden border-2 border-gray-200">
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.817!2d${defaultLng}!3d${defaultLat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwNDcnMjEuNSJTIDEwMMKwMzknMDYuMSJF!5e0!3m2!1sen!2sid!4v1600000000000!5m2!1sen!2sid`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              {/* Quick Actions */}
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={`https://www.google.com/maps?q=${defaultLat},${defaultLng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Buka di Google Maps
                </a>
                <a
                  href={`https://maps.google.com/maps?daddr=${defaultLat},${defaultLng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Dapatkan Petunjuk Arah
                </a>
              </div>
            </div>
          </div>

          {/* Info Sidebar */}
          <div className="space-y-6">
            {/* Location Info */}
            <div className="card">
              <h3 className="text-xl font-display font-bold text-gray-900 mb-4">Informasi Lokasi</h3>
              
              {profile && (
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Home className="w-5 h-5 text-primary-600 mr-3 mt-1" />
                    <div>
                      <div className="text-sm text-gray-500">Alamat Lengkap</div>
                      <div className="text-gray-700">{profile.address}</div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-primary-600 mr-3" />
                    <div>
                      <div className="text-sm text-gray-500">Koordinat</div>
                      <div className="text-gray-700 font-mono text-sm">
                        {defaultLat.toFixed(6)}, {defaultLng.toFixed(6)}
                      </div>
                    </div>
                  </div>

                  {profile.phone && (
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 text-primary-600 mr-3" />
                      <div>
                        <div className="text-sm text-gray-500">Telepon</div>
                        <div className="text-gray-700">{profile.phone}</div>
                      </div>
                    </div>
                  )}

                  {profile.email && (
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 text-primary-600 mr-3" />
                      <div>
                        <div className="text-sm text-gray-500">Email</div>
                        <div className="text-gray-700">{profile.email}</div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Transportation Info */}
            <div className="card">
              <h3 className="text-xl font-display font-bold text-gray-900 mb-4">Akses Transportasi</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Kendaraan Pribadi</h4>
                  <p className="text-sm text-gray-600">
                    Akses melalui jalan raya utama Sumatera Barat. Tersedia area parkir di kantor nagari.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Transportasi Umum</h4>
                  <p className="text-sm text-gray-600">
                    Angkutan umum tersedia dari pusat kota dengan rute reguler menuju nagari.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Ojek Online</h4>
                  <p className="text-sm text-gray-600">
                    Layanan ojek online tersedia untuk kemudahan akses menuju lokasi.
                  </p>
                </div>
              </div>
            </div>

            {/* Landmarks */}
            <div className="card">
              <h3 className="text-xl font-display font-bold text-gray-900 mb-4">Penanda Lokasi</h3>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-700">Kantor Wali Nagari</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-700">Masjid Nagari</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-700">Sekolah Dasar</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-700">Puskesmas</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-700">Pasar Tradisional</span>
                </div>
              </div>
            </div>

            {/* Weather Info */}
            <div className="card">
              <h3 className="text-xl font-display font-bold text-gray-900 mb-4">Informasi Cuaca</h3>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600 mb-1">28°C</div>
                <div className="text-sm text-gray-600 mb-3">Cerah Berawan</div>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                  <div>Kelembaban: 75%</div>
                  <div>Angin: 5 km/h</div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  Data cuaca diperbarui setiap hari
                </p>
              </div>
            </div>
          </div>
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
