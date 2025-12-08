import Image from 'next/image';
import Link from 'next/link';
import type { Boat } from '@/data/boats';
import { Locale, getTranslations } from '@/lib/i18n';

interface BoatCardProps {
  boat: Boat;
  className?: string;
  locale: Locale;
}

export default function BoatCard({
  boat,
  className = '',
  locale,
}: BoatCardProps) {
  const primaryImage = boat.images[0] || '/images/boat-placeholder.jpg';
  const t = getTranslations(locale);

  // Get boat-specific translations based on boat name/slug
  const boatTranslationKey = boat.slug.includes('lobster-23')
    ? 'boats.lobster23'
    : boat.slug.includes('ribco-27')
      ? 'boats.ribco27'
      : boat.slug.includes('olympic-490')
        ? 'boats.olympic490'
        : null;

  const boatShortDescription = boatTranslationKey
    ? t(`${boatTranslationKey}.shortDescription` as any)
    : boat.shortDescription;

  return (
    <Link
      href={locale === 'el' ? `/boats/${boat.slug}` : `/en/boats/${boat.slug}`}
      className={`group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:-translate-y-2 cursor-pointer block ${className}`}
    >
      {/* Image with overlay */}
      <div className='relative h-64 overflow-hidden'>
        <Image
          src={primaryImage}
          alt={`${boat.name} - RIB σκάφος`}
          fill
          className='object-cover group-hover:scale-110 transition-transform duration-500'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent'></div>

        {/* Price Badge */}
        <div className='absolute top-4 right-4'>
          <div className='bg-green-500 px-4 py-2 rounded-full shadow-lg'>
            <span className='text-white text-sm font-semibold'>
              €{boat.pricePerDay}/{t('boats.perDay')}
            </span>
          </div>
        </div>

        {/* Title on image */}
        <div className='absolute bottom-0 left-0 right-0 p-6'>
          <div className='flex items-center gap-2 mb-2'>
            {boat.manufacturer && (
              <span className='text-white/70 text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded'>
                {boat.manufacturer}
              </span>
            )}
            {boat.yearBuilt && (
              <span className='text-white/70 text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded'>
                {boat.yearBuilt}
              </span>
            )}
          </div>
          <h3 className='text-2xl font-bold text-white mb-2'>{boat.name}</h3>
          <p className='text-white/90 text-sm line-clamp-2'>
            {boatShortDescription}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className='p-6'>
        <div className='grid grid-cols-2 gap-4 mb-4'>
          <div className='text-center p-3 bg-gray-50 rounded-lg'>
            <div className='text-2xl mb-1'>👥</div>
            <div className='text-sm font-semibold text-gray-900'>
              {boat.capacity}
            </div>
            <div className='text-xs text-gray-600'>{t('boats.people')}</div>
          </div>
          <div className='text-center p-3 bg-gray-50 rounded-lg'>
            <div className='text-2xl mb-1'>⚙️</div>
            <div className='text-sm font-semibold text-gray-900'>
              {boat.engine}
            </div>
            <div className='text-xs text-gray-600'>{t('boats.engine')}</div>
          </div>
        </div>

        {/* Additional small info */}
        <div className='flex items-center justify-center gap-4 mb-4 text-xs text-gray-500'>
          {boat.length && (
            <div className='flex items-center'>
              <span className='mr-1'>📏</span>
              <span>
                {(() => {
                  const boatKey = boat.slug.includes('lobster-23')
                    ? 'lobster23'
                    : boat.slug.includes('ribco-27')
                      ? 'ribco27'
                      : boat.slug.includes('olympic-490')
                        ? 'olympic490'
                        : null;
                  return boatKey
                    ? t(`boats.length.${boatKey}`) || boat.length
                    : boat.length;
                })()}
              </span>
            </div>
          )}
          {boat.maxSpeed && (
            <div className='flex items-center'>
              <span className='mr-1'>⚡</span>
              <span>
                {(() => {
                  const boatKey = boat.slug.includes('lobster-23')
                    ? 'lobster23'
                    : boat.slug.includes('ribco-27')
                      ? 'ribco27'
                      : boat.slug.includes('olympic-490')
                        ? 'olympic490'
                        : null;
                  return boatKey
                    ? t(`boats.maxSpeed.${boatKey}`) || boat.maxSpeed
                    : boat.maxSpeed;
                })()}
              </span>
            </div>
          )}
          <div className='flex items-center'>
            <span className='mr-1'>📸</span>
            <span>
              {boat.images.length} {t('boats.photos')}
            </span>
          </div>
        </div>

        <div className='flex items-center justify-between pt-4 border-t border-gray-200'>
          <span className='text-primary font-semibold'>
            {t('boats.viewDetails')}
          </span>
          <span className='text-primary group-hover:translate-x-2 transition-transform'>
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
