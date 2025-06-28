'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Users, TrendingUp, BarChart3, PieChart, Filter } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';

interface Jorong {
  id: string;
  name: string;
  description: string;
  area?: number;
  population: number;
  kepalaJorong?: string;
}

interface JorongStatistic {
  id: string;
  jorongId: string;
  jorong: Jorong;
  year: number;
  population: number;
  maleCount: number;
  femaleCount: number;
  childCount: number;
  adultCount: number;
  elderlyCount: number;
  households: number;
  createdAt: string;
}

const COLORS = ['#22c55e', '#eab308', '#ef4444', '#3b82f6', '#8b5cf6'];

export default function StatistikPage() {
  const [statistics, setStatistics] = useState<JorongStatistic[]>([]);
  const [jorongs, setJorongs] = useState<Jorong[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedJorong, setSelectedJorong] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch statistics
      const statsResponse = await fetch('/api/admin/statistics');
      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStatistics(statsData);
      }

      // Fetch jorongs
      const jorongsResponse = await fetch('/api/admin/jorongs');
      if (jorongsResponse.ok) {
        const jorongsData = await jorongsResponse.json();
        setJorongs(jorongsData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter data based on selected year and jorong
  const filteredStats = statistics.filter(stat => {
    const yearMatch = stat.year === selectedYear;
    const jorongMatch = selectedJorong === '' || stat.jorongId === selectedJorong;
    return yearMatch && jorongMatch;
  });

  // Get available years
  const availableYears = [...new Set(statistics.map(stat => stat.year))].sort((a, b) => b - a);

  // Calculate totals
  const totalPopulation = filteredStats.reduce((sum, stat) => sum + stat.population, 0);
  const totalMale = filteredStats.reduce((sum, stat) => sum + stat.maleCount, 0);
  const totalFemale = filteredStats.reduce((sum, stat) => sum + stat.femaleCount, 0);
  const totalHouseholds = filteredStats.reduce((sum, stat) => sum + stat.households, 0);

  // Prepare chart data
  const populationByJorong = filteredStats.map(stat => ({
    name: stat.jorong.name,
    population: stat.population,
    male: stat.maleCount,
    female: stat.femaleCount
  }));

  const ageGroupData = [
    {
      name: 'Anak (0-17)',
      value: filteredStats.reduce((sum, stat) => sum + stat.childCount, 0),
      percentage: filteredStats.reduce((sum, stat) => sum + stat.childCount, 0) / totalPopulation * 100
    },
    {
      name: 'Dewasa (18-59)',
      value: filteredStats.reduce((sum, stat) => sum + stat.adultCount, 0),
      percentage: filteredStats.reduce((sum, stat) => sum + stat.adultCount, 0) / totalPopulation * 100
    },
    {
      name: 'Lansia (60+)',
      value: filteredStats.reduce((sum, stat) => sum + stat.elderlyCount, 0),
      percentage: filteredStats.reduce((sum, stat) => sum + stat.elderlyCount, 0) / totalPopulation * 100
    }
  ].filter(item => item.value > 0);

  const genderData = [
    { name: 'Laki-laki', value: totalMale, percentage: totalMale / totalPopulation * 100 },
    { name: 'Perempuan', value: totalFemale, percentage: totalFemale / totalPopulation * 100 }
  ];

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
              Statistik Penduduk
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Data statistik kependudukan per jorong di nagari
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center">
              <Filter className="w-5 h-5 text-gray-400 mr-2" />
              <span className="text-gray-600 font-medium mr-4">Filter:</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {availableYears.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              <select
                value={selectedJorong}
                onChange={(e) => setSelectedJorong(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Semua Jorong</option>
                {jorongs.map(jorong => (
                  <option key={jorong.id} value={jorong.id}>{jorong.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom section-padding">
        {filteredStats.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <BarChart3 className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Tidak ada data statistik
            </h3>
            <p className="text-gray-500">
              Data untuk {selectedYear} {selectedJorong && 'pada jorong yang dipilih'} belum tersedia
            </p>
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="card">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Users className="w-8 h-8 text-primary-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-500">Total Penduduk</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {totalPopulation.toLocaleString('id-ID')}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="card">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <TrendingUp className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-500">Laki-laki</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {totalMale.toLocaleString('id-ID')}
                    </div>
                    <div className="text-sm text-gray-500">
                      {((totalMale / totalPopulation) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="card">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <TrendingUp className="w-8 h-8 text-pink-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-500">Perempuan</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {totalFemale.toLocaleString('id-ID')}
                    </div>
                    <div className="text-sm text-gray-500">
                      {((totalFemale / totalPopulation) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="card">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Users className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-500">Total KK</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {totalHouseholds.toLocaleString('id-ID')}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Population by Jorong */}
              <div className="card">
                <h3 className="text-xl font-display font-bold text-gray-900 mb-6">
                  Penduduk per Jorong ({selectedYear})
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={populationByJorong}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 12 }}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="male" stackId="a" fill="#3b82f6" name="Laki-laki" />
                    <Bar dataKey="female" stackId="a" fill="#ec4899" name="Perempuan" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Gender Distribution */}
              <div className="card">
                <h3 className="text-xl font-display font-bold text-gray-900 mb-6">
                  Distribusi Jenis Kelamin
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={genderData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name}: ${percentage.toFixed(1)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {genderData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Age Groups */}
            {ageGroupData.length > 0 && (
              <div className="card mb-8">
                <h3 className="text-xl font-display font-bold text-gray-900 mb-6">
                  Distribusi Kelompok Umur
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={ageGroupData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name}: ${percentage.toFixed(1)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {ageGroupData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Detailed Table */}
            <div className="card">
              <h3 className="text-xl font-display font-bold text-gray-900 mb-6">
                Data Detail per Jorong ({selectedYear})
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Jorong
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Laki-laki
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Perempuan
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Anak
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Dewasa
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Lansia
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        KK
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredStats.map((stat) => (
                      <tr key={stat.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {stat.jorong.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {stat.population.toLocaleString('id-ID')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {stat.maleCount.toLocaleString('id-ID')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {stat.femaleCount.toLocaleString('id-ID')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {stat.childCount.toLocaleString('id-ID')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {stat.adultCount.toLocaleString('id-ID')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {stat.elderlyCount.toLocaleString('id-ID')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {stat.households.toLocaleString('id-ID')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
