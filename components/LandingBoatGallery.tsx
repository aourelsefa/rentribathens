'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface LandingBoatGalleryProps {
  images: string[];
  boatName: string;
  boatHref: string;
  priceLabel: string;
}

export default function LandingBoatGallery({
  images,
  boatName,
  boatHref,
  priceLabel,
}: LandingBoatGalleryProps) {
  const galleryImages = images.slice(0, 3);
  const [index, setIndex] = useState(0);

  const goPrev = () => {
    setIndex(
      current => (current - 1 + galleryImages.length) % galleryImages.length
    );
  };

  const goNext = () => {
    setIndex(current => (current + 1) % galleryImages.length);
  };

  if (galleryImages.length === 0) return null;

  const hasMultiple = galleryImages.length > 1;

  return (
    <div className='relative h-52 sm:h-full sm:min-h-[240px] w-full bg-gray-100'>
      <Image
        src={galleryImages[index]}
        alt={`${boatName} - ${index + 1}`}
        fill
        className='object-cover'
        sizes='(max-width: 640px) 100vw, 40vw'
      />

      <div className='absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md z-10'>
        {priceLabel}
      </div>

      <div className='absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10'>
        <Link
          href={boatHref}
          className='text-white text-xl font-bold hover:text-accent transition-colors'
        >
          {boatName}
        </Link>
      </div>

      {hasMultiple && (
        <>
          <button
            type='button'
            onClick={goPrev}
            aria-label='Previous image'
            className='absolute left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/90 text-gray-800 shadow-md flex items-center justify-center hover:bg-white transition-colors'
          >
            ‹
          </button>
          <button
            type='button'
            onClick={goNext}
            aria-label='Next image'
            className='absolute right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/90 text-gray-800 shadow-md flex items-center justify-center hover:bg-white transition-colors'
          >
            ›
          </button>

          <div className='absolute bottom-14 left-1/2 -translate-x-1/2 flex gap-1.5 z-10'>
            {galleryImages.map((_, i) => (
              <button
                key={i}
                type='button'
                onClick={() => setIndex(i)}
                aria-label={`Image ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === index ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
