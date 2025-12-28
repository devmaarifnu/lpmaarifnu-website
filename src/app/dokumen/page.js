'use client';

import { useState, useEffect } from 'react';
import { getDocuments } from '@/lib/api';
import { FileText, Download, Search, Calendar } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const categoryOptions = ['Semua', 'Pedoman', 'Kurikulum', 'Regulasi', 'Panduan', 'Formulir'];

const getFileIcon = (fileType) => {
  switch (fileType.toLowerCase()) {
    case 'pdf':
      return '📄';
    case 'doc':
    case 'docx':
      return '📝';
    case 'xls':
    case 'xlsx':
      return '📊';
    default:
      return '📎';
  }
};

export default function DokumenPage() {
  const [documents, setDocuments] = useState([]);
  const [filteredDocs, setFilteredDocs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await getDocuments();
      setDocuments(data);
      setFilteredDocs(data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = [...documents];

    if (selectedCategory !== 'Semua') {
      filtered = filtered.filter(doc => doc.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(doc =>
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredDocs(filtered);
  }, [searchTerm, selectedCategory, documents]);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-700 to-primary-500 text-white py-16 md:py-20">
        <div className="container mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <FileText className="w-12 h-12" />
            <h1 className="text-3xl md:text-4xl font-bold">
              Repository Dokumen
            </h1>
          </div>
          <p className="text-lg md:text-xl text-primary-100 max-w-3xl">
            Kumpulan dokumen, pedoman, dan panduan pendidikan LP Ma&apos;arif NU
          </p>
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
                  placeholder="Cari dokumen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full md:w-48 px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category === 'Semua' ? 'Semua Kategori' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-neutral-600">
            Menampilkan {filteredDocs.length} dari {documents.length} dokumen
          </div>
        </div>
      </section>

      {/* Documents List */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto">
          {isLoading ? (
            <div className="text-center py-16">
              <div className="animate-spin w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-neutral-600">Memuat dokumen...</p>
            </div>
          ) : filteredDocs.length > 0 ? (
            <div className="max-w-4xl mx-auto space-y-4">
              {filteredDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border border-neutral-200"
                >
                  <div className="flex items-start gap-4">
                    {/* File Icon */}
                    <div className="text-4xl flex-shrink-0">
                      {getFileIcon(doc.fileType)}
                    </div>

                    {/* Document Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-neutral-900 mb-1">
                            {doc.title}
                          </h3>
                          <span className="inline-block px-2.5 py-0.5 bg-primary-100 text-primary-700 text-xs font-semibold rounded">
                            {doc.category}
                          </span>
                        </div>
                        <Button
                          variant="primary"
                          size="sm"
                          className="flex items-center gap-2 flex-shrink-0"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </Button>
                      </div>

                      <p className="text-neutral-700 mb-3">
                        {doc.description}
                      </p>

                      <div className="flex items-center gap-6 text-sm text-neutral-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(doc.uploadDate)}
                        </div>
                        <div>
                          <span className="font-semibold text-neutral-700">
                            {doc.fileType}
                          </span>
                          {' · '}
                          {doc.fileSize}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <FileText className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                Tidak Ada Dokumen Ditemukan
              </h3>
              <p className="text-neutral-600">
                Coba ubah kategori atau kata kunci pencarian
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
