'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ImageGalleryModalProps {
  images: string[];
  boatName: string;
}

export default function ImageGalleryModal({
  images,
  boatName,
}: ImageGalleryModalProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [imagesPerView, setImagesPerView] = useState(3);

  // Responsive images per view: 1 on mobile, 2 on tablet, 3 on desktop
  useEffect(() => {
    const updateImagesPerView = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth < 640) {
          // Mobile - show 1 image
          setImagesPerView(1);
        } else if (window.innerWidth < 1024) {
          // Tablet - show 2 images
          setImagesPerView(2);
        } else {
          // Desktop - show 3 images
          setImagesPerView(3);
        }
      }
    };

    // Set initial value
    updateImagesPerView();

    // Update on resize
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', updateImagesPerView);
      return () => window.removeEventListener('resize', updateImagesPerView);
    }
  }, []);

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedIndex(null);
      }
    };

    if (selectedIndex !== null) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedIndex]);

  // Handle keyboard navigation
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
      } else if (e.key === 'ArrowRight') {
        setSelectedIndex((selectedIndex + 1) % images.length);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, images.length]);

  const openModal = (index: number) => {
    setSelectedIndex(index);
  };

  const closeModal = () => {
    setSelectedIndex(null);
  };

  const goToPreviousGallery = () => {
    setGalleryIndex(prev => Math.max(0, prev - imagesPerView));
  };

  const goToNextGallery = () => {
    setGalleryIndex(prev =>
      Math.min(Math.max(0, images.length - imagesPerView), prev + imagesPerView)
    );
  };

  return (
    <>
      {/* Gallery with Navigation Buttons */}
      <div className='relative'>
        {/* Previous Button */}
        {galleryIndex > 0 && (
          <button
            onClick={goToPreviousGallery}
            className='absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg hover:bg-gray-50 text-gray-700 p-2 sm:p-3 rounded-full transition-all duration-200 hover:scale-110'
            aria-label='Προηγούμενες φωτογραφίες'
          >
            <svg
              className='w-5 h-5 sm:w-6 sm:h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 19l-7-7 7-7'
              />
            </svg>
          </button>
        )}

        {/* Gallery Container with smooth transition */}
        <div className='overflow-hidden mx-12 sm:mx-14 md:mx-16'>
          <div
            className='flex gap-3 sm:gap-4 transition-transform duration-500 ease-in-out'
            style={{
              transform: `translateX(-${(galleryIndex * 100) / imagesPerView}%)`,
            }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className='flex-shrink-0 rounded-xl overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 relative h-[240px] sm:h-[280px]'
                style={{
                  width: `calc(${100 / imagesPerView}% - ${((imagesPerView - 1) * 0.75) / imagesPerView}rem)`,
                }}
                onClick={() => openModal(index)}
              >
                <Image
                  src={image}
                  alt={`${boatName} - Φωτογραφία ${index + 1}`}
                  fill
                  className='object-cover'
                  sizes={
                    imagesPerView === 1
                      ? '100vw'
                      : imagesPerView === 2
                        ? '50vw'
                        : '33vw'
                  }
                  loading={index < 6 ? 'eager' : 'lazy'}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Next Button */}
        {galleryIndex + imagesPerView < images.length && (
          <button
            onClick={goToNextGallery}
            className='absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg hover:bg-gray-50 text-gray-700 p-2 sm:p-3 rounded-full transition-all duration-200 hover:scale-110'
            aria-label='Επόμενες φωτογραφίες'
          >
            <svg
              className='w-5 h-5 sm:w-6 sm:h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 5l7 7-7 7'
              />
            </svg>
          </button>
        )}
      </div>

      {/* Modal */}
      {selectedIndex !== null && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm'
          onClick={closeModal}
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            className='absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-colors duration-200'
            aria-label='Κλείσιμο'
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>

          {/* Previous Button */}
          {images.length > 1 && (
            <button
              onClick={e => {
                e.stopPropagation();
                setSelectedIndex(
                  (selectedIndex - 1 + images.length) % images.length
                );
              }}
              className='absolute left-4 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-colors duration-200'
              aria-label='Προηγούμενη'
            >
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15 19l-7-7 7-7'
                />
              </svg>
            </button>
          )}

          {/* Next Button */}
          {images.length > 1 && (
            <button
              onClick={e => {
                e.stopPropagation();
                setSelectedIndex((selectedIndex + 1) % images.length);
              }}
              className='absolute right-4 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-colors duration-200'
              aria-label='Επόμενη'
            >
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 5l7 7-7 7'
                />
              </svg>
            </button>
          )}

          {/* Image Counter */}
          {images.length > 1 && (
            <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm'>
              {selectedIndex + 1} / {images.length}
            </div>
          )}

          {/* Image Container */}
          <div
            className='relative max-w-7xl max-h-[90vh] w-full mx-4'
            onClick={e => e.stopPropagation()}
          >
            <div className='relative w-full h-full aspect-video'>
              <Image
                src={images[selectedIndex]}
                alt={`${boatName} - Φωτογραφία ${selectedIndex + 1}`}
                fill
                className='object-contain'
                sizes='90vw'
                priority
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
