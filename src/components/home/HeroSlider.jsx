'use client';

import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * Hero Slider Component
 * @param {Object} props - Component props
 * @param {Array} props.slides - Array of slide objects
 */
export default function HeroSlider({ slides }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  if (!slides || slides.length === 0) {
    return null;
  }

  return (
    <div
      className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden bg-neutral-900"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            'absolute inset-0 transition-opacity duration-700 ease-in-out',
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          )}
        >
          {/* Background Image */}
          <div className="relative w-full h-full">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
              quality={90}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center z-20">
            <div className="container mx-auto">
              <div className="max-w-2xl text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 leading-tight animate-fade-in-up">
                  {slide.title}
                </h1>
                <p className="text-base md:text-lg lg:text-xl mb-6 md:mb-8 text-neutral-200 leading-relaxed animate-fade-in-up animation-delay-200">
                  {slide.description}
                </p>
                {slide.cta && (
                  <div className="flex flex-wrap gap-4 animate-fade-in-up animation-delay-400">
                    <Button
                      size="lg"
                      variant="primary"
                      onClick={() => window.location.href = slide.cta.href}
                      className="shadow-lg"
                    >
                      {slide.cta.label}
                    </Button>
                    {slide.cta.secondary && (
                      <Button
                        size="lg"
                        variant="outline"
                        onClick={() => window.location.href = slide.cta.secondary.href}
                        className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20"
                      >
                        {slide.cta.secondary.label}
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2 md:gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              'w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300',
              index === currentSlide
                ? 'bg-white w-8 md:w-10'
                : 'bg-white/50 hover:bg-white/75'
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

HeroSlider.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      cta: PropTypes.shape({
        label: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired,
        secondary: PropTypes.shape({
          label: PropTypes.string,
          href: PropTypes.string,
        }),
      }),
    })
  ).isRequired,
};
