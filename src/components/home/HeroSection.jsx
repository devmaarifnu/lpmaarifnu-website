'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-[#059669] to-[#10b981] overflow-hidden">
      {/* Top Wave Border */}
      <div className="absolute top-0 left-0 w-full">
        <svg className="w-full h-16 md:h-24" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M0,0 C300,100 900,100 1200,0 L1200,120 L0,120 Z"
            fill="white"
            opacity="0.1"
          />
        </svg>
      </div>

      {/* Batik Pattern SVG - Right Side */}
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Batik Pattern with circular motifs */}
            <pattern id="batikPattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              {/* Main circular motif */}
              <circle cx="100" cy="100" r="40" fill="none" stroke="white" strokeWidth="2" />
              <circle cx="100" cy="100" r="30" fill="none" stroke="white" strokeWidth="1.5" />
              <circle cx="100" cy="100" r="20" fill="none" stroke="white" strokeWidth="1" />
              <circle cx="100" cy="100" r="10" fill="white" opacity="0.3" />

              {/* Corner decorative circles */}
              <circle cx="0" cy="0" r="20" fill="none" stroke="white" strokeWidth="1.5" />
              <circle cx="200" cy="0" r="20" fill="none" stroke="white" strokeWidth="1.5" />
              <circle cx="0" cy="200" r="20" fill="none" stroke="white" strokeWidth="1.5" />
              <circle cx="200" cy="200" r="20" fill="none" stroke="white" strokeWidth="1.5" />

              {/* Decorative curves */}
              <path
                d="M 50,50 Q 75,75 100,50"
                fill="none"
                stroke="white"
                strokeWidth="1"
              />
              <path
                d="M 100,50 Q 125,75 150,50"
                fill="none"
                stroke="white"
                strokeWidth="1"
              />
              <path
                d="M 50,150 Q 75,125 100,150"
                fill="none"
                stroke="white"
                strokeWidth="1"
              />
              <path
                d="M 100,150 Q 125,125 150,150"
                fill="none"
                stroke="white"
                strokeWidth="1"
              />

              {/* Small accent circles */}
              <circle cx="50" cy="100" r="5" fill="white" opacity="0.4" />
              <circle cx="150" cy="100" r="5" fill="white" opacity="0.4" />
              <circle cx="100" cy="50" r="5" fill="white" opacity="0.4" />
              <circle cx="100" cy="150" r="5" fill="white" opacity="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#batikPattern)" />
        </svg>
      </div>

      {/* Content Container */}
      <div className="container mx-auto relative z-10 py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div className="text-white space-y-6">
            <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
              🎓 Lembaga Pendidikan Ma&apos;arif NU
            </div>

            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              Membangun Generasi Berakhlakul Karimah dan Berprestasi
            </h1>

            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              LP Ma&apos;arif NU PBNU berkomitmen mengembangkan pendidikan Islam yang berkualitas,
              modern, dan berkarakter Ahlussunnah Wal Jama&apos;ah an-Nahdliyyah.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="/tentang/visi-misi">
                <Button
                  size="lg"
                  className="bg-white text-primary-700 hover:bg-white/90 font-semibold group"
                >
                  Pelajari Lebih Lanjut
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <a href="/data-satpen">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 font-semibold"
                >
                  Data Satuan Pendidikan
                </Button>
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
              <div>
                <div className="text-2xl md:text-3xl font-bold">14,000+</div>
                <div className="text-sm text-white/80">Satuan Pendidikan</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold">34</div>
                <div className="text-sm text-white/80">Provinsi</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold">500+</div>
                <div className="text-sm text-white/80">Kabupaten/Kota</div>
              </div>
            </div>
          </div>

          {/* Right Side - Decorative Batik Pattern */}
          <div className="hidden lg:block relative">
            <div className="relative w-full h-96">
              {/* Large decorative circle with batik pattern */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="400" height="400" viewBox="0 0 400 400">
                  <defs>
                    <pattern id="mainBatik" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                      <circle cx="50" cy="50" r="20" fill="none" stroke="white" strokeWidth="2" opacity="0.6" />
                      <circle cx="50" cy="50" r="12" fill="none" stroke="white" strokeWidth="1.5" opacity="0.5" />
                      <circle cx="50" cy="50" r="5" fill="white" opacity="0.4" />
                      <circle cx="25" cy="25" r="8" fill="none" stroke="white" strokeWidth="1" opacity="0.4" />
                      <circle cx="75" cy="25" r="8" fill="none" stroke="white" strokeWidth="1" opacity="0.4" />
                      <circle cx="25" cy="75" r="8" fill="none" stroke="white" strokeWidth="1" opacity="0.4" />
                      <circle cx="75" cy="75" r="8" fill="none" stroke="white" strokeWidth="1" opacity="0.4" />
                    </pattern>
                  </defs>

                  {/* Main decorative circles */}
                  <circle cx="200" cy="200" r="180" fill="url(#mainBatik)" opacity="0.3" />
                  <circle cx="200" cy="200" r="150" fill="none" stroke="white" strokeWidth="3" opacity="0.2" />
                  <circle cx="200" cy="200" r="120" fill="none" stroke="white" strokeWidth="2" opacity="0.3" />
                  <circle cx="200" cy="200" r="90" fill="none" stroke="white" strokeWidth="2" opacity="0.4" />

                  {/* Center accent */}
                  <circle cx="200" cy="200" r="40" fill="white" opacity="0.1" />
                  <circle cx="200" cy="200" r="30" fill="none" stroke="white" strokeWidth="3" opacity="0.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave Border */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg className="w-full h-16 md:h-24" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M0,0 C300,100 900,100 1200,0 L1200,0 L0,0 Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
