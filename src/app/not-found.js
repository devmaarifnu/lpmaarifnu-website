'use client';


import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-4xl font-bold text-primary-600 mb-4" style={{ fontSize: '2.5rem' }}>404</h1>
          <div className="w-32 h-1 bg-primary-600 mx-auto rounded-full" />
        </div>

        {/* Message */}
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
          Halaman Tidak Ditemukan
        </h2>
        <p className="text-lg text-neutral-600 mb-8">
          Maaf, halaman yang Anda cari tidak dapat ditemukan atau mungkin telah dipindahkan.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/">
            <Button size="lg" className="flex items-center gap-2 w-full sm:w-auto">
              <Home className="w-5 h-5" />
              Kembali ke Beranda
            </Button>
          </a>
          <Button
            size="lg"
            variant="outline"
            onClick={() => window.history.back()}
            className="flex items-center gap-2 w-full sm:w-auto"
          >
            <ArrowLeft className="w-5 h-5" />
            Halaman Sebelumnya
          </Button>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-neutral-200">
          <h3 className="text-sm font-semibold text-neutral-900 mb-4 uppercase tracking-wide">
            Link Populer
          </h3>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a href="/tentang/visi-misi" className="text-primary-600 hover:text-primary-700 hover:underline">
              Visi & Misi
            </a>
            <span className="text-neutral-300">•</span>
            <a href="/berita/nasional" className="text-primary-600 hover:text-primary-700 hover:underline">
              Berita Nasional
            </a>
            <span className="text-neutral-300">•</span>
            <a href="/data-satpen" className="text-primary-600 hover:text-primary-700 hover:underline">
              Data Satpen
            </a>
            <span className="text-neutral-300">•</span>
            <a href="/dokumen" className="text-primary-600 hover:text-primary-700 hover:underline">
              Dokumen
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
