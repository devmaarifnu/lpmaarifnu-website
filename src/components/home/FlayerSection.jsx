'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function FlayerSection({ flayers = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play slider
  useEffect(() => {
    if (!isAutoPlaying || flayers.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % flayers.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying, flayers.length]);

  if (!flayers || flayers.length === 0) {
    return null;
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? flayers.length - 1 : prevIndex - 1
    );
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flayers.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-8 md:py-12 bg-neutral-50">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h2 className="font-bold text-neutral-900 mb-2" style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}>
            Flayer Kegiatan
          </h2>
          <p className="text-neutral-600 text-sm md:text-base">
            Informasi kegiatan dan acara terbaru dari LP Ma&apos;arif NU
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative group">
          {/* Main Slider */}
          <div className="relative w-full overflow-hidden rounded-xl shadow-lg bg-white">
            {/* Aspect Ratio Container - 100:30 = 3.33:1 */}
            <div className="relative w-full" style={{ paddingBottom: '30%' }}>
              {flayers.map((flayer, index) => (
                <div
                  key={flayer.id}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  {flayer.link ? (
                    <Link href={flayer.link} className="block w-full h-full">
                      <div className="relative w-full h-full cursor-pointer group/image">
                        <Image
                          src={flayer.image}
                          alt={flayer.title || `Flayer ${index + 1}`}
                          fill
                          className="object-cover group-hover/image:scale-105 transition-transform duration-500"
                          priority={index === 0}
                        />
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/10 transition-colors duration-300"></div>
                      </div>
                    </Link>
                  ) : (
                    <div className="relative w-full h-full">
                      <Image
                        src={flayer.image}
                        alt={flayer.title || `Flayer ${index + 1}`}
                        fill
                        className="object-cover"
                        priority={index === 0}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows - Only show if more than 1 slide */}
          {flayers.length > 1 && (
            <>
              {/* Previous Button */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-neutral-800 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 z-20"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-neutral-800 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 z-20"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Dots Indicator - Only show if more than 1 slide */}
          {flayers.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {flayers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentIndex
                      ? 'bg-white w-8 h-3'
                      : 'bg-white/60 hover:bg-white/80 w-3 h-3'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Slide Counter */}
        {flayers.length > 1 && (
          <div className="text-center mt-4 text-sm text-neutral-600">
            {currentIndex + 1} / {flayers.length}
          </div>
        )}
      </div>
    </section>
  );
}
