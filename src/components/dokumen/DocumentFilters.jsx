'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';

const categoryOptions = ['Semua', 'Pedoman', 'Kurikulum', 'Regulasi', 'Panduan', 'Formulir'];

export default function DocumentFilters({ searchTerm = '', selectedCategory = '' }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchTerm);
  const [category, setCategory] = useState(selectedCategory || 'Semua');

  useEffect(() => {
    setSearch(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    setCategory(selectedCategory || 'Semua');
  }, [selectedCategory]);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);

    if (search) {
      params.set('search', search);
    } else {
      params.delete('search');
    }

    if (category && category !== 'Semua') {
      params.set('category', category);
    } else {
      params.delete('category');
    }

    params.delete('page'); // Reset to page 1 when filtering

    router.push(`/dokumen${params.toString() ? `?${params.toString()}` : ''}`);
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    const params = new URLSearchParams(searchParams);

    if (search) {
      params.set('search', search);
    }

    if (newCategory && newCategory !== 'Semua') {
      params.set('category', newCategory);
    } else {
      params.delete('category');
    }

    params.delete('page'); // Reset to page 1 when filtering

    router.push(`/dokumen${params.toString() ? `?${params.toString()}` : ''}`);
  };

  return (
    <section className="py-8 bg-white border-b border-neutral-200">
      <div className="container mx-auto">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Cari dokumen..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full md:w-48 px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {categoryOptions.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'Semua' ? 'Semua Kategori' : cat}
                </option>
              ))}
            </select>
          </div>

          {/* Hidden submit button for form submission on Enter */}
          <button type="submit" className="hidden" aria-label="Cari" />
        </form>
      </div>
    </section>
  );
}
