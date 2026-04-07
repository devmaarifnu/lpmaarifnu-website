'use client';

import { useState, useEffect } from 'react';
import { getSatpenData, getSatpenStatistics, getProvinsi, getKabupaten, getJenjangOptions } from '@/lib/api';
import { Search, Download, Building2, MapPin, User, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BatikPattern from '@/components/shared/BatikPattern';

export default function DataSatpenPage() {
  const [satpenData, setSatpenData] = useState([]);
  const [provinsiList, setProvinsiList] = useState([]);
  const [kabupatenList, setKabupatenList] = useState([]);
  const [jenjangOptions, setJenjangOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJenjang, setSelectedJenjang] = useState('Semua');
  const [selectedProvinsi, setSelectedProvinsi] = useState('Semua');
  const [selectedProvinsiId, setSelectedProvinsiId] = useState(null);
  const [selectedKabupaten, setSelectedKabupaten] = useState('Semua');
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [statistics, setStatistics] = useState(null);

  // Fetch statistics
  useEffect(() => {
    const fetchStatistics = async () => {
      const data = await getSatpenStatistics();
      if (data) setStatistics(data);
    };
    fetchStatistics();
  }, []);

  // Fetch jenjang options
  useEffect(() => {
    const fetchJenjang = async () => {
      const data = await getJenjangOptions();
      setJenjangOptions(data);
    };
    fetchJenjang();
  }, []);

  // Fetch provinsi list
  useEffect(() => {
    const fetchProvinsi = async () => {
      const data = await getProvinsi();
      setProvinsiList(data);
    };
    fetchProvinsi();
  }, []);

  // Fetch kabupaten when provinsi changes
  useEffect(() => {
    const fetchKabupaten = async () => {
      if (selectedProvinsiId) {
        const data = await getKabupaten({ provinsi_id: selectedProvinsiId });
        setKabupatenList(data);
      } else {
        setKabupatenList([]);
      }
      setSelectedKabupaten('Semua');
    };
    fetchKabupaten();
  }, [selectedProvinsiId]);

  // Fetch satpen data based on filters
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const params = {
        page: currentPage,
        limit: 21,
      };

      if (selectedJenjang !== 'Semua') {
        params.jenjang = selectedJenjang;
      }
      if (selectedProvinsi !== 'Semua') {
        params.provinsi = selectedProvinsi;
      }
      if (selectedKabupaten !== 'Semua') {
        params.kabupaten = selectedKabupaten;
      }
      if (searchTerm) {
        params.search = searchTerm;
      }

      const response = await getSatpenData(params);
      setSatpenData(response.satpen || []);
      setPagination(response.pagination || {});
      setTotalCount(response.pagination?.total_items || 0);
      setIsLoading(false);
    };

    fetchData();
  }, [currentPage, selectedJenjang, selectedProvinsi, selectedKabupaten, searchTerm]);

  const handleProvinsiChange = (e) => {
    const provinsiNama = e.target.value;
    setSelectedProvinsi(provinsiNama);

    if (provinsiNama === 'Semua') {
      setSelectedProvinsiId(null);
    } else {
      const provinsi = provinsiList.find(p => p.nama === provinsiNama);
      setSelectedProvinsiId(provinsi?.id || null);
    }
    setCurrentPage(1);
  };

  const handleKabupatenChange = (e) => {
    setSelectedKabupaten(e.target.value);
    setCurrentPage(1);
  };

  const handleJenjangChange = (e) => {
    setSelectedJenjang(e.target.value);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
              <div className="text-3xl font-bold text-white">
                {statistics ? statistics.total_satpen.toLocaleString('id-ID') + '+' : '...'}
              </div>
              <div className="text-sm">Satuan Pendidikan</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">
                {statistics ? statistics.total_guru.toLocaleString('id-ID') + '+' : '...'}
              </div>
              <div className="text-sm">Guru</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">
                {statistics ? statistics.total_siswa.toLocaleString('id-ID') + '+' : '...'}
              </div>
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
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-neutral-900 placeholder:text-neutral-500"
                />
              </div>
            </div>

            {/* Jenjang Filter */}
            <div>
              <select
                value={selectedJenjang}
                onChange={handleJenjangChange}
                className="w-full md:w-48 px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-neutral-900"
              >
                <option value="Semua">Semua Jenjang</option>
                {jenjangOptions.map((jenjang) => (
                  <option key={jenjang} value={jenjang}>
                    {jenjang}
                  </option>
                ))}
              </select>
            </div>

            {/* Provinsi Filter */}
            <div>
              <select
                value={selectedProvinsi}
                onChange={handleProvinsiChange}
                className="w-full md:w-48 px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-neutral-900"
              >
                <option value="Semua">Semua Provinsi</option>
                {provinsiList.map((provinsi) => (
                  <option key={provinsi.id} value={provinsi.nama}>
                    {provinsi.nama}
                  </option>
                ))}
              </select>
            </div>

            {/* Kabupaten Filter */}
            {selectedProvinsiId && (
              <div>
                <select
                  value={selectedKabupaten}
                  onChange={handleKabupatenChange}
                  className="w-full md:w-48 px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-neutral-900"
                >
                  <option value="Semua">Semua Kabupaten</option>
                  {kabupatenList.map((kabupaten) => (
                    <option key={kabupaten.id} value={kabupaten.nama}>
                      {kabupaten.nama}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Export Button */}
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>

          <div className="mt-4 text-sm text-neutral-600">
            Menampilkan {satpenData.length} dari {totalCount} satuan pendidikan
            {(selectedJenjang !== 'Semua' || selectedProvinsi !== 'Semua' || selectedKabupaten !== 'Semua' || searchTerm) && (
              <span className="ml-2 text-primary-600 font-medium">(terfilter)</span>
            )}
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
          ) : satpenData.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {satpenData.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow p-6 border border-neutral-200"
                  >
                    {/* Jenjang Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full">
                        {item.jenjang?.nama || item.jenjang}
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
                        <span>
                          {item.alamat}
                          {item.kabupaten?.nama && `, ${item.kabupaten.nama}`}
                          {item.provinsi?.nama && `, ${item.provinsi.nama}`}
                        </span>
                      </div>
                      {item.kepala_sekolah && (
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 flex-shrink-0 text-primary-600" />
                          <span>{item.kepala_sekolah}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
                        <span className="text-xs text-neutral-500">NPSN: {item.npsn}</span>
                        {item.jumlah_siswa && (
                          <span className="text-xs font-semibold text-neutral-900">
                            {item.jumlah_siswa.toLocaleString('id-ID')} siswa
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {pagination.total_pages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={!pagination.has_prev}
                    className="flex items-center gap-1 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-300"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Sebelumnya
                  </Button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, pagination.total_pages) }, (_, i) => {
                      let pageNum;
                      if (pagination.total_pages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= pagination.total_pages - 2) {
                        pageNum = pagination.total_pages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      const isActive = currentPage === pageNum;

                      return (
                        <Button
                          key={pageNum}
                          variant="outline"
                          size="sm"
                          onClick={() => handlePageChange(pageNum)}
                          className={`w-10 ${
                            isActive
                              ? 'bg-teal-600 text-white border-teal-600 hover:bg-teal-700 hover:border-teal-700'
                              : 'hover:bg-teal-50 hover:text-teal-700 hover:border-teal-300'
                          }`}
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={!pagination.has_next}
                    className="flex items-center gap-1 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-300"
                  >
                    Selanjutnya
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}

              {/* Pagination Info */}
              <div className="mt-4 text-center text-sm text-neutral-600">
                Halaman {pagination.current_page} dari {pagination.total_pages}
              </div>
            </>
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
