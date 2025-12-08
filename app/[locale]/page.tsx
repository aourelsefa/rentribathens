import { boats } from '@/data/boats';
import { services } from '@/data/services';
import { getAllDestinations } from '@/data/destinations';
import Hero from '@/components/Hero';
import BoatCard from '@/components/BoatCard';
import Link from 'next/link';
import Image from 'next/image';
import { getTranslations, Locale } from '@/lib/i18n';
import { Metadata } from 'next';

interface HomePageProps {
  params: { locale: Locale };
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const t = getTranslations(params.locale);
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://rentribathens.gr';

  return {
    title: t('home.title'),
    description: t('meta.siteDescription'),
    alternates: {
      canonical: params.locale === 'el' ? '/' : '/en',
      languages: {
        el: '/',
        en: '/en',
        'x-default': '/',
      },
    },
    openGraph: {
      title: t('home.title'),
      description: t('meta.siteDescription'),
      url: params.locale === 'el' ? siteUrl : `${siteUrl}/en`,
      siteName: 'RentRibAthens',
      locale: params.locale === 'el' ? 'el_GR' : 'en_US',
      alternateLocale: params.locale === 'el' ? 'en_US' : 'el_GR',
      type: 'website',
    },
  };
}

export default function HomePage({ params }: HomePageProps) {
  const { locale } = params;
  const t = getTranslations(locale);

  // Get featured boats (first 3)
  const featuredBoats = boats.slice(0, 3);
  // Get all destinations
  const destinations = getAllDestinations();

  return (
    <>
      {/* Hero Section */}
      <Hero
        title={t('home.title')}
        subtitle={t('home.subtitle')}
        ctaText={t('common.callNow')}
        ctaPhone='+306978277120'
        backgroundImage='/images/boats/02-8.jpg'
        locale={locale}
        fleetLink={locale === 'el' ? '/fleet' : '/en/fleet'}
        translations={{
          ribRental: t('home.hero.ribRental'),
          fleet: t('home.hero.fleet'),
          whyChooseUs: t('home.hero.whyChooseUs'),
          why1: t('home.hero.why1'),
          why2: t('home.hero.why2'),
          why3: t('home.hero.why3'),
          why4: t('home.hero.why4'),
        }}
      />

      {/* Featured Boats Section */}
      <section id='fleet' className='section-padding bg-muted'>
        <div className='container-custom'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
              {t('home.fleet.title')}
            </h2>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
              {t('home.fleet.description')}
            </p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {featuredBoats.map(boat => (
              <BoatCard key={boat.id} boat={boat} locale={locale} />
            ))}
          </div>

          <div className='text-center mt-12'>
            <Link
              href={locale === 'el' ? '/fleet' : '/en/fleet'}
              className='btn-secondary'
            >
              {t('home.fleet.seeAllFleet')}
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className='section-padding bg-white'>
        <div className='container-custom'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
              {t('home.services.title')}
            </h2>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
              {t('home.services.description')}
            </p>
          </div>

          {/* Services cards - keeping existing structure for now */}
          <div className='space-y-6'>
            {services.map((service, index) => {
              const serviceTranslations = t(`services.${service.id}` as any);
              return (
                <div key={service.id} className='group'>
                  <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300'>
                    <div className='flex flex-col lg:flex-row'>
                      <div className='lg:w-1/3 h-48 lg:h-auto relative'>
                        <Image
                          src={service.image}
                          alt={serviceTranslations.title}
                          fill
                          className='object-cover'
                          sizes='(max-width: 1024px) 100vw, 33vw'
                        />
                      </div>

                      <div className='lg:w-2/3 p-6'>
                        <div className='flex items-start justify-between mb-4'>
                          <div className='flex items-center'>
                            <div className='w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4'>
                              <span className='text-xl text-primary'>
                                {service.id === 'rent'
                                  ? '🚤'
                                  : service.id === 'cruises'
                                    ? '🏝️'
                                    : '⛴️'}
                              </span>
                            </div>
                            <div>
                              <h3 className='text-2xl font-bold text-gray-900'>
                                {serviceTranslations.title}
                              </h3>
                              <p className='text-gray-500 text-sm'>
                                {t('home.services.serviceNumber')} #{index + 1}
                              </p>
                            </div>
                          </div>
                          <div className='bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium'>
                            {t('common.available')}
                          </div>
                        </div>

                        <p className='text-gray-600 mb-4 leading-relaxed'>
                          {serviceTranslations.description}
                        </p>

                        {/* Service-specific content */}
                        {service.destinations && (
                          <div className='mb-4'>
                            <h4 className='text-sm font-semibold text-gray-900 mb-2'>
                              {service.id === 'cruises'
                                ? t('home.services.cruiseDestinations')
                                : t('home.services.transferRoutes')}
                            </h4>
                            <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
                              {service.destinations.map(
                                (destination, destIndex) => {
                                  const destinationSlugs: Record<
                                    string,
                                    string
                                  > = {
                                    'Αθηναική Ριβιέρα': 'athenaiki-riviera',
                                    Αίγινα: 'aigina',
                                    Πόρος: 'poros',
                                    Ύδρα: 'ydra',
                                    Τζια: 'tzia',
                                    Κύθνος: 'kythnos',
                                    Μακρόνησος: 'makronisos',
                                    Πάτροκλος: 'patroklos',
                                    Αγκίστρι: 'agkistri',
                                  };
                                  const destinationNames: Record<
                                    string,
                                    { el: string; en: string }
                                  > = {
                                    'Αθηναική Ριβιέρα': {
                                      el: 'Αθηναική Ριβιέρα',
                                      en: 'Athenian Riviera',
                                    },
                                    Αίγινα: { el: 'Αίγινα', en: 'Aegina' },
                                    Πόρος: { el: 'Πόρος', en: 'Poros' },
                                    Ύδρα: { el: 'Ύδρα', en: 'Hydra' },
                                    Τζια: { el: 'Τζια', en: 'Kea / Tzia' },
                                    Κύθνος: { el: 'Κύθνος', en: 'Kythnos' },
                                    Μακρόνησος: {
                                      el: 'Μακρόνησος',
                                      en: 'Makronisos',
                                    },
                                    Πάτροκλος: {
                                      el: 'Πάτροκλος',
                                      en: 'Patroklos',
                                    },
                                    Αγκίστρι: {
                                      el: 'Αγκίστρι',
                                      en: 'Angistri',
                                    },
                                  };
                                  const slug = destinationSlugs[destination];
                                  const destinationName = destinationNames[
                                    destination
                                  ]
                                    ? destinationNames[destination][locale]
                                    : destination;
                                  return slug ? (
                                    <Link
                                      key={destIndex}
                                      href={
                                        locale === 'el'
                                          ? `/destinations/${slug}`
                                          : `/en/destinations/${slug}`
                                      }
                                      className='flex items-center text-gray-600 bg-gray-50 px-3 py-2 rounded-lg hover:bg-primary hover:text-white transition-all duration-200 group'
                                    >
                                      <span className='text-primary group-hover:text-white mr-2 text-xs'>
                                        •
                                      </span>
                                      <span className='text-sm'>
                                        {destinationName}
                                      </span>
                                    </Link>
                                  ) : (
                                    <div
                                      key={destIndex}
                                      className='flex items-center text-gray-600 bg-gray-50 px-3 py-2 rounded-lg'
                                    >
                                      <span className='text-primary mr-2 text-xs'>
                                        •
                                      </span>
                                      <span className='text-sm'>
                                        {destinationName}
                                      </span>
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        )}

                        <div className='flex flex-col sm:flex-row gap-3'>
                          <Link
                            href={
                              locale === 'el' ? '/services' : '/en/services'
                            }
                            className='flex-1 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-200 text-center'
                          >
                            {t('common.learnMore')}
                          </Link>
                          <a
                            href='tel:+306978277120'
                            className='flex-1 border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all duration-200 text-center'
                          >
                            📞 {t('common.bookNow')}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section className='section-padding bg-muted'>
        <div className='container-custom'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
              {t('home.destinations.title')}
            </h2>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
              {t('home.destinations.description')}
            </p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {destinations.map((destination, index) => (
              <Link
                key={destination.id}
                href={
                  locale === 'el'
                    ? `/destinations/${destination.slug}`
                    : `/en/destinations/${destination.slug}`
                }
              >
                <div className='group bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-xl hover:border-primary transition-all duration-300 cursor-pointer h-full flex flex-col'>
                  <div className='mb-4'>
                    <div className='flex items-center justify-between mb-3'>
                      <div className='w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center'>
                        <span className='text-primary font-bold text-sm'>
                          #{index + 1}
                        </span>
                      </div>
                      <div className='bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium'>
                        {t('common.available')}
                      </div>
                    </div>
                    <h3 className='text-xl font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors'>
                      {locale === 'el' ? destination.name : destination.nameEn}
                    </h3>
                    {locale === 'en' && (
                      <p className='text-gray-500 text-sm'>
                        {destination.name}
                      </p>
                    )}
                  </div>

                  <p className='text-gray-600 text-sm mb-4 leading-relaxed flex-grow'>
                    {t(
                      `destinations.${destination.id}.shortDescription` as any
                    ) || destination.shortDescription}
                  </p>

                  <div className='grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-gray-200'>
                    <div>
                      <div className='text-xs text-gray-500 mb-1'>
                        📍 {t('home.destinations.distance')}
                      </div>
                      <div className='text-sm font-semibold text-gray-900'>
                        {t(`destinations.${destination.id}.distance` as any) ||
                          destination.distance}
                      </div>
                    </div>
                    <div>
                      <div className='text-xs text-gray-500 mb-1'>
                        📅 {t('home.destinations.bestTime')}
                      </div>
                      <div className='text-sm font-semibold text-gray-900'>
                        {t(`destinations.${destination.id}.bestTime` as any) ||
                          destination.bestTime}
                      </div>
                    </div>
                  </div>

                  <div className='mt-auto pt-4 border-t border-gray-200'>
                    <div className='flex items-center justify-between'>
                      <span className='text-sm text-primary font-medium group-hover:text-primary/80 transition-colors'>
                        {t('home.destinations.viewDetails')}
                      </span>
                      <div className='w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors'>
                        <span className='text-primary group-hover:text-white text-sm'>
                          →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section - keeping as is for now */}
      <section className='section-padding bg-white'>
        <div className='container-custom'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
              {t('home.reviews.title')}
            </h2>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
              {t('home.reviews.description')}
            </p>
          </div>

          {/* Reviews */}
          <div className='grid md:grid-cols-3 gap-8'>
            {/* Review 1 */}
            <div className='bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300'>
              <div className='flex items-center mb-4'>
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className='w-5 h-5 text-yellow-400'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                  </svg>
                ))}
              </div>
              <p className='text-gray-700 mb-6 leading-relaxed'>
                &ldquo;{t('home.reviews.review1')}&rdquo;
              </p>
              <div className='flex items-center'>
                <div className='w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg mr-4'>
                  {t('home.reviews.review1Initials')}
                </div>
                <div>
                  <div className='font-semibold text-gray-900'>
                    {t('home.reviews.review1Author')}
                  </div>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className='bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300'>
              <div className='flex items-center mb-4'>
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className='w-5 h-5 text-yellow-400'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                  </svg>
                ))}
              </div>
              <p className='text-gray-700 mb-6 leading-relaxed'>
                &ldquo;{t('home.reviews.review2')}&rdquo;
              </p>
              <div className='flex items-center'>
                <div className='w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg mr-4'>
                  {t('home.reviews.review2Initials')}
                </div>
                <div>
                  <div className='font-semibold text-gray-900'>
                    {t('home.reviews.review2Author')}
                  </div>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className='bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300'>
              <div className='flex items-center mb-4'>
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className='w-5 h-5 text-yellow-400'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                  </svg>
                ))}
              </div>
              <p className='text-gray-700 mb-6 leading-relaxed'>
                &ldquo;{t('home.reviews.review3')}&rdquo;
              </p>
              <div className='flex items-center'>
                <div className='w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg mr-4'>
                  {t('home.reviews.review3Initials')}
                </div>
                <div>
                  <div className='font-semibold text-gray-900'>
                    {t('home.reviews.review3Author')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Strip */}
      <section className='bg-primary text-white'>
        <div className='section-padding'>
          <div className='container-custom'>
            <div className='text-center'>
              <h2 className='text-2xl md:text-3xl font-bold mb-4'>
                {t('home.cta.title')}
              </h2>
              <p className='text-lg mb-6 opacity-90'>
                {t('home.cta.description')}
              </p>
              <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                <a href='tel:+306978277120' className='btn-secondary'>
                  {t('home.cta.contact')}
                </a>
                <Link
                  href={locale === 'el' ? '/contact' : '/en/contact'}
                  className='bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all duration-200'
                >
                  {t('common.sendMessage')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
