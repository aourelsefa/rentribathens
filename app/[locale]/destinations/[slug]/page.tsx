import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getDestinationBySlug, getAllDestinations } from '@/data/destinations';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { Locale, isValidLocale, getTranslations } from '@/lib/i18n';

interface DestinationPageProps {
  params: {
    slug: string;
    locale: string;
  };
}

export async function generateStaticParams() {
  const destinations = getAllDestinations();
  return destinations.flatMap(destination => [
    { slug: destination.slug, locale: 'el' },
    { slug: destination.slug, locale: 'en' },
  ]);
}

export async function generateMetadata({
  params,
}: DestinationPageProps): Promise<Metadata> {
  if (!isValidLocale(params.locale)) {
    return { title: 'Destination not found' };
  }

  const destination = getDestinationBySlug(params.slug);
  const locale = params.locale as Locale;

  if (!destination) {
    return {
      title:
        locale === 'el' ? 'Προορισμός δεν βρέθηκε' : 'Destination not found',
    };
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://rentribathens.gr';
  const title =
    locale === 'el'
      ? destination.seoTitle
      : `${destination.nameEn} - RentRibAthens`;
  const description =
    locale === 'el' ? destination.seoDescription : destination.longDescription;
  const canonicalPath =
    locale === 'el'
      ? `/destinations/${destination.slug}`
      : `/en/destinations/${destination.slug}`;

  return {
    title,
    description,
    keywords: destination.seoKeywords,
    alternates: {
      canonical: canonicalPath,
      languages: {
        el: `/destinations/${destination.slug}`,
        en: `/en/destinations/${destination.slug}`,
        'x-default': `/destinations/${destination.slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}${canonicalPath}`,
      siteName: 'RentRibAthens',
      locale: locale === 'el' ? 'el_GR' : 'en_US',
      alternateLocale: locale === 'el' ? 'en_US' : 'el_GR',
      type: 'website',
      images: [
        {
          url: destination.image,
          width: 1200,
          height: 630,
          alt: locale === 'el' ? destination.name : destination.nameEn,
        },
      ],
    },
  };
}

export default async function DestinationPage({
  params,
}: DestinationPageProps) {
  if (!isValidLocale(params.locale)) {
    notFound();
  }

  const locale = params.locale as Locale;
  const destination = getDestinationBySlug(params.slug);
  const t = getTranslations(locale);

  if (!destination) {
    notFound();
  }

  const otherDestinations = getAllDestinations()
    .filter(d => d.id !== destination.id)
    .slice(0, 3);

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://rentribathens.gr';

  // Helper for locale-aware paths
  const path = (p: string) => (locale === 'el' ? p : `/en${p}`);

  // Structured Data for SEO
  const longDescription =
    t(`destinations.${destination.id}.longDescription` as any) ||
    destination.longDescription;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: locale === 'el' ? destination.name : destination.nameEn,
    alternateName: locale === 'el' ? destination.nameEn : destination.name,
    description: longDescription,
    image: `${siteUrl}${destination.image}`,
    url: `${siteUrl}${path(`/destinations/${destination.slug}`)}`,
  };

  return (
    <>
      <Script
        id='destination-structured-data'
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData, null, 2),
        }}
      />
      {/* Hero Section */}
      <section className='relative bg-primary text-white overflow-hidden'>
        <div className='absolute inset-0 z-0'>
          <Image
            src={destination.image}
            alt={destination.name}
            fill
            className='object-cover opacity-40'
            priority
          />
          <div className='absolute inset-0 bg-gray-900/85'></div>
          <div className='absolute inset-0 bg-primary/30'></div>
        </div>

        <div className='relative z-10 section-padding'>
          <div className='container-custom'>
            <div className='max-w-4xl mx-auto'>
              <nav className='text-sm mb-6 opacity-95'>
                <Link
                  href={path('/')}
                  className='hover:text-accent transition-colors'
                >
                  {t('nav.home')}
                </Link>
                <span className='mx-2'>/</span>
                <Link
                  href={path('/services')}
                  className='hover:text-accent transition-colors'
                >
                  {t('nav.services')}
                </Link>
                <span className='mx-2'>/</span>
                <span>
                  {locale === 'el' ? destination.name : destination.nameEn}
                </span>
              </nav>

              <h1 className='text-4xl md:text-5xl font-bold mb-4'>
                {locale === 'el' ? destination.name : destination.nameEn}
              </h1>
              <p className='text-xl md:text-2xl mb-8 opacity-90'>
                {t(`destinations.${destination.id}.shortDescription` as any) ||
                  destination.shortDescription}
              </p>

              {/* Quick Info */}
              <div className='grid grid-cols-2 md:grid-cols-3 gap-4 mt-8'>
                <div className='bg-white/10 backdrop-blur-sm rounded-lg p-4'>
                  <div className='text-sm opacity-80 mb-1'>
                    {t('home.destinations.distance')}
                  </div>
                  <div className='text-lg font-semibold'>
                    {t(`destinations.${destination.id}.distance` as any) ||
                      destination.distance}
                  </div>
                </div>
                <div className='bg-white/10 backdrop-blur-sm rounded-lg p-4'>
                  <div className='text-sm opacity-80 mb-1'>
                    {t('home.destinations.bestTime')}
                  </div>
                  <div className='text-lg font-semibold'>
                    {t(`destinations.${destination.id}.bestTime` as any) ||
                      destination.bestTime}
                  </div>
                </div>
                <div className='bg-white/10 backdrop-blur-sm rounded-lg p-4'>
                  <div className='text-sm opacity-80 mb-1'>
                    {locale === 'el' ? 'Αγγλικά' : 'Greek'}
                  </div>
                  <div className='text-lg font-semibold'>
                    {locale === 'el' ? destination.nameEn : destination.name}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className='section-padding'>
        <div className='container-custom'>
          <div className='grid lg:grid-cols-3 gap-12'>
            {/* Main Content */}
            <div className='lg:col-span-2'>
              <div className='mb-8'>
                <h2 className='text-3xl font-bold text-gray-900 mb-4'>
                  {t('destinations.about')}
                </h2>
                <p className='text-gray-600 leading-relaxed text-lg'>
                  {t(`destinations.${destination.id}.longDescription` as any) ||
                    destination.longDescription}
                </p>
              </div>

              {/* Highlights */}
              <div className='mb-8'>
                <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                  {t('destinations.attractions')}
                </h2>
                <div className='grid md:grid-cols-2 gap-4'>
                  {(Array.isArray(
                    t(`destinations.${destination.id}.highlights` as any)
                  )
                    ? t(`destinations.${destination.id}.highlights` as any)
                    : destination.highlights
                  ).map((highlight: string, index: number) => (
                    <div
                      key={index}
                      className='flex items-start bg-gray-50 rounded-lg p-4'
                    >
                      <span className='text-accent mr-3 text-xl mt-1'>✓</span>
                      <span className='text-gray-700'>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tips */}
              <div className='mb-8'>
                <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                  {t('destinations.tips')}
                </h2>
                <div className='space-y-3'>
                  {(Array.isArray(
                    t(`destinations.${destination.id}.tips` as any)
                  )
                    ? t(`destinations.${destination.id}.tips` as any)
                    : destination.tips
                  ).map((tip: string, index: number) => (
                    <div
                      key={index}
                      className='flex items-start bg-blue-50 border border-blue-100 rounded-lg p-4'
                    >
                      <span className='text-primary mr-3 text-lg'>💡</span>
                      <span className='text-gray-700'>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className='lg:col-span-1'>
              {/* CTA Card */}
              <div className='bg-primary text-white rounded-xl p-6 mb-6 sticky top-24'>
                <h3 className='text-2xl font-bold mb-4'>
                  {t('destinations.bookTrip')}
                </h3>
                <p className='mb-6 opacity-90'>
                  {locale === 'el'
                    ? `Ενοικιάστε ένα από τα RIB σκάφη μας για να ανακαλύψετε το ${destination.name}`
                    : `Rent one of our RIB boats to discover ${destination.nameEn}`}
                </p>
                <div className='space-y-3'>
                  <a
                    href='tel:+306978277120'
                    className='block w-full bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 text-center'
                  >
                    📞 {t('common.bookNow')}
                  </a>
                  <Link
                    href={path('/contact')}
                    className='block w-full border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-all duration-200 text-center'
                  >
                    {t('common.sendMessage')}
                  </Link>
                </div>
              </div>

              {/* Info Card */}
              <div className='bg-gray-50 rounded-xl p-6 mb-6'>
                <h3 className='text-xl font-bold text-gray-900 mb-4'>
                  {t('destinations.tripInfo')}
                </h3>
                <div className='space-y-4'>
                  <div>
                    <div className='text-sm text-gray-600 mb-1'>
                      {t('home.destinations.distance')}
                    </div>
                    <div className='font-semibold text-gray-900'>
                      {t(`destinations.${destination.id}.distance` as any) ||
                        destination.distance}
                    </div>
                  </div>
                  <div>
                    <div className='text-sm text-gray-600 mb-1'>
                      {t('home.destinations.bestTime')}
                    </div>
                    <div className='font-semibold text-gray-900'>
                      {t(`destinations.${destination.id}.bestTime` as any) ||
                        destination.bestTime}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Destinations */}
      <section className='section-padding bg-muted'>
        <div className='container-custom'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
              {t('destinations.otherDestinations')}
            </h2>
          </div>

          <div className='grid md:grid-cols-3 gap-8'>
            {otherDestinations.map(otherDest => (
              <Link
                key={otherDest.id}
                href={path(`/destinations/${otherDest.slug}`)}
              >
                <div className='bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group'>
                  <div className='aspect-video relative overflow-hidden'>
                    <Image
                      src={otherDest.image}
                      alt={otherDest.name}
                      fill
                      className='object-cover group-hover:scale-105 transition-transform duration-300'
                      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    />
                  </div>
                  <div className='p-6'>
                    <h3 className='text-xl font-semibold mb-2 group-hover:text-primary transition-colors'>
                      {locale === 'el' ? otherDest.name : otherDest.nameEn}
                    </h3>
                    <p className='text-gray-600 mb-4 text-sm'>
                      {t(
                        `destinations.${otherDest.id}.shortDescription` as any
                      ) || otherDest.shortDescription}
                    </p>
                    <div className='flex items-center text-sm text-primary'>
                      <span>{t('destinations.learnMore')}</span>
                      <span className='ml-2'>→</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className='text-center mt-12'>
            <Link href={path('/services')} className='btn-secondary'>
              {t('destinations.seeAllServices')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
