'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { getDocuments } from '@/lib/api';
import { FileText, Download, Calendar } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Pagination from '@/components/shared/Pagination';
import DocumentFilters from '@/components/dokumen/DocumentFilters';
import toast from 'react-hot-toast';

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

export default function DokumenContent() {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const searchTerm = searchParams.get('search') || '';
  const selectedCategory = searchParams.get('category') || '';
  const limit = 12;

  const [documents, setDocuments] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { documents: data, pagination: paginationData } = await getDocuments({
          page: currentPage,
          limit: limit,
          search: searchTerm,
          category: selectedCategory !== 'Semua' ? selectedCategory : undefined
        });

        setDocuments(data);
        setPagination(paginationData);
      } catch (error) {
        console.error('Error fetching documents:', error);
        toast.error('Gagal memuat dokumen');
        setDocuments([]);
        setPagination(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPage, searchTerm, selectedCategory]);

  return (
    <>
      {/* Filter Section */}
      <DocumentFilters
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
      />

      {/* Documents List */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto">
          {/* Loading State */}
          {isLoading ? (
            <div className="text-center py-16">
              <div className="animate-spin w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-neutral-600">Memuat dokumen...</p>
            </div>
          ) : (
            <>
              {/* Pagination Info */}
              {pagination && pagination.total > 0 && (
                <div className="mb-6 text-sm text-neutral-600">
                  Menampilkan {((currentPage - 1) * limit) + 1} - {Math.min(currentPage * limit, pagination.total)} dari {pagination.total} dokumen
                </div>
              )}

              {documents && documents.length > 0 ? (
                <>
                  <div className="max-w-4xl mx-auto space-y-4">
                    {documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border border-neutral-200"
                      >
                        <div className="flex items-start gap-4">
                          {/* File Icon */}
                          <div className="text-4xl flex-shrink-0">
                            {getFileIcon(doc.file_type)}
                          </div>

                          {/* Document Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <div>
                                <h3 className="text-xl font-bold text-neutral-900 mb-1">
                                  {doc.title}
                                </h3>
                                <span className="inline-block px-2.5 py-0.5 bg-primary-100 text-primary-700 text-xs font-semibold rounded">
                                  {doc.category?.name || doc.category || 'Dokumen'}
                                </span>
                              </div>
                              <a
                                href={doc.download_url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Button
                                  variant="primary"
                                  size="sm"
                                  className="flex items-center gap-2 flex-shrink-0"
                                >
                                  <Download className="w-4 h-4" />
                                  <span className="hidden sm:inline">Download</span>
                                </Button>
                              </a>
                            </div>

                            <p className="text-neutral-700 mb-3">
                              {doc.description}
                            </p>

                            <div className="flex items-center gap-6 text-sm text-neutral-500">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {formatDate(doc.uploaded_at || doc.created_at)}
                              </div>
                              <div>
                                <span className="font-semibold text-neutral-700">
                                  {doc.file_type}
                                </span>
                                {' · '}
                                {doc.file_size_formatted || doc.file_size}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {pagination && pagination.total_pages > 1 && (
                    <div className="mt-12">
                      <Pagination
                        currentPage={currentPage}
                        totalPages={pagination.total_pages}
                        baseUrl="/dokumen"
                      />
                    </div>
                  )}
                </>
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
            </>
          )}
        </div>
      </section>
    </>
  );
}
