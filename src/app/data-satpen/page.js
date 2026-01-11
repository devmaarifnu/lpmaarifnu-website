'use client';

import { useState, useEffect } from 'react';
import { getSatpenData } from '@/lib/api';
import { Search, Download, Building2, MapPin, User, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BatikPattern from '@/components/shared/BatikPattern';

const jenjangOptions = ['Semua', 'MI', 'MTs', 'MA', 'Pesantren'];
const provinsiList = [
  'Semua',
  'Jawa Timur',
  'Jawa Tengah',
  'Jawa Barat',
  'DKI Jakarta',
  'Banten',
  // Add more provinces
];

export default function DataSatpenPage() {
  const [satpenData, setSatpenData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJenjang, setSelectedJenjang] = useState('Semua');
  const [selectedProvinsi, setSelectedProvinsi] = useState('Semua');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await getSatpenData();
      setSatpenData(data);
      setFilteredData(data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = [...satpenData];

    if (selectedJenjang !== 'Semua') {
      filtered = filtered.filter(item => item.jenjang === selectedJenjang);
    }

    if (selectedProvinsi !== 'Semua') {
      filtered = filtered.filter(item => item.provinsi === selectedProvinsi);
    }

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.nama.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(filtered);
  }, [searchTerm, selectedJenjang, selectedProvinsi, satpenData]);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-teal-600 to-teal-500 text-white py-16 md:py-20 overflow-hidden">
        <BatikPattern opacity={0.2} />

        <div className="container mx-auto relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <Building2 className="w-12 h-12" />
            <h1 className="text-3xl md:text-4xl font-bold">
              Data Satuan Pendidikan
            </h1>
          </div>
          <p className="text-lg md:text-xl text-teal-100 max-w-3xl mb-6">
            Data satuan pendidikan Ma&apos;arif di seluruh Indonesia
          </p>
          <div className="flex items-center gap-8 text-teal-100">
            <div>
              <div className="text-3xl font-bold text-white">14,000+</div>
              <div className="text-sm">Satuan Pendidikan</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">34</div>
              <div className="text-sm">Provinsi</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">2.5M+</div>
              <div className="text-sm">Siswa</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b border-neutral-200">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Cari nama satuan pendidikan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            {/* Jenjang Filter */}
            <div>
              <select
                value={selectedJenjang}
                onChange={(e) => setSelectedJenjang(e.target.value)}
                className="w-full md:w-48 px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {jenjangOptions.map((jenjang) => (
                  <option key={jenjang} value={jenjang}>
                    {jenjang === 'Semua' ? 'Semua Jenjang' : jenjang}
                  </option>
                ))}
              </select>
            </div>

            {/* Provinsi Filter */}
            <div>
              <select
                value={selectedProvinsi}
                onChange={(e) => setSelectedProvinsi(e.target.value)}
                className="w-full md:w-48 px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {provinsiList.map((provinsi) => (
                  <option key={provinsi} value={provinsi}>
                    {provinsi === 'Semua' ? 'Semua Provinsi' : provinsi}
                  </option>
                ))}
              </select>
            </div>

            {/* Export Button */}
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>

          <div className="mt-4 text-sm text-neutral-600">
            Menampilkan {filteredData.length} dari {satpenData.length} satuan pendidikan
          </div>
        </div>
      </section>

      {/* Data Table/Cards Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto">
          {isLoading ? (
            <div className="text-center py-16">
              <div className="animate-spin w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-neutral-600">Memuat data...</p>
            </div>
          ) : filteredData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredData.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow p-6 border border-neutral-200"
                >
                  {/* Jenjang Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full">
                      {item.jenjang}
                    </span>
                    {item.akreditasi && (
                      <div className="flex items-center gap-1 text-sm">
                        <Award className="w-4 h-4 text-yellow-500" />
                        <span className="font-semibold text-neutral-900">
                          {item.akreditasi}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Nama Satpen */}
                  <h3 className="text-lg font-bold text-neutral-900 mb-3">
                    {item.nama}
                  </h3>

                  {/* Info */}
                  <div className="space-y-2 text-sm text-neutral-600">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary-600" />
                      <span>{item.alamat}, {item.kabupaten}, {item.provinsi}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 flex-shrink-0 text-primary-600" />
                      <span>{item.kepalaSekolah}</span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
                      <span className="text-xs text-neutral-500">NPSN: {item.npsn}</span>
                      <span className="text-xs font-semibold text-neutral-900">
                        {item.jumlahSiswa} siswa
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Building2 className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                Tidak Ada Data Ditemukan
              </h3>
              <p className="text-neutral-600">
                Coba ubah filter atau kata kunci pencarian
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
