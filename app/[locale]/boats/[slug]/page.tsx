import { boats, type Boat } from '@/data/boats';
import Image from 'next/image';
import ContactForm from '@/components/ContactForm';
import ImageGalleryModal from '@/components/ImageGalleryModal';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Locale, isValidLocale, getTranslations } from '@/lib/i18n';

interface BoatDetailPageProps {
  params: {
    slug: string;
    locale: string;
  };
}

export async function generateStaticParams() {
  return boats.flatMap(boat => [
    { slug: boat.slug, locale: 'el' },
    { slug: boat.slug, locale: 'en' },
  ]);
}

async function getBoatBySlug(slug: string): Promise<Boat | null> {
  return boats.find(boat => boat.slug === slug) || null;
}

export async function generateMetadata({
  params,
}: BoatDetailPageProps): Promise<Metadata> {
  if (!isValidLocale(params.locale)) {
    return { title: 'Boat not found' };
  }

  const boat = await getBoatBySlug(params.slug);
  const locale = params.locale as Locale;

  if (!boat) {
    return {
      title: locale === 'el' ? 'Σκάφος δεν βρέθηκε' : 'Boat not found',
    };
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://rentribathens.gr';
  const title = boat.name;
  const description =
    locale === 'el'
      ? `${boat.shortDescription} Ενοικίαση ${boat.name} για περιηγήσεις στον Σαρωνικό. Χωρητικότητα: ${boat.capacity} άτομα.`
      : `${boat.shortDescription} Rent ${boat.name} for tours in the Saronic Gulf. Capacity: ${boat.capacity} people.`;
  const canonicalPath =
    locale === 'el' ? `/boats/${params.slug}` : `/en/boats/${params.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
      languages: {
        el: `/boats/${params.slug}`,
        en: `/en/boats/${params.slug}`,
        'x-default': `/boats/${params.slug}`,
      },
    },
    openGraph: {
      title: `${boat.name} - RentRibAthens`,
      description: boat.shortDescription,
      url: `${siteUrl}${canonicalPath}`,
      siteName: 'RentRibAthens',
      locale: locale === 'el' ? 'el_GR' : 'en_US',
      alternateLocale: locale === 'el' ? 'en_US' : 'el_GR',
      type: 'website',
      images:
        boat.images && boat.images.length > 0
          ? [
              {
                url: boat.images[0],
                width: 1200,
                height: 630,
                alt: `${boat.name} - RentRibAthens`,
              },
            ]
          : undefined,
    },
  };
}

export default async function BoatDetailPage({ params }: BoatDetailPageProps) {
  if (!isValidLocale(params.locale)) {
    notFound();
  }

  const locale = params.locale as Locale;
  const boat = await getBoatBySlug(params.slug);
  const t = getTranslations(locale);

  if (!boat) {
    notFound();
  }

  // Helper function for locale-aware paths
  const path = (p: string) => (locale === 'el' ? p : `/en${p}`);

  return (
    <>
      {/* Hero Section */}
      <section className='relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white overflow-hidden'>
        <div className='absolute inset-0 opacity-10'>
          <div
            className='absolute inset-0'
            style={{
              backgroundImage: `url(${boat.images[0]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(40px)',
            }}
          ></div>
        </div>

        <div className='relative z-10 section-padding'>
          <div className='container-custom'>
            <div className='max-w-6xl mx-auto'>
              <nav className='text-sm mb-6 opacity-80'>
                <Link
                  href={path('/')}
                  className='hover:text-accent transition-colors'
                >
                  {t('nav.home')}
                </Link>
                <span className='mx-2'>/</span>
                <Link
                  href={path('/fleet')}
                  className='hover:text-accent transition-colors'
                >
                  {t('nav.fleet')}
                </Link>
                <span className='mx-2'>/</span>
                <span>{boat.name}</span>
              </nav>

              <div className='grid lg:grid-cols-2 gap-12 items-center'>
                <div>
                  {boat.manufacturer && (
                    <div className='inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-4'>
                      {boat.manufacturer} {boat.model}
                    </div>
                  )}
                  <h1 className='text-5xl md:text-6xl font-bold mb-6'>
                    {boat.name}
                  </h1>
                  <p className='text-xl md:text-2xl mb-8 opacity-90 leading-relaxed'>
                    {(() => {
                      const boatKey = boat.slug.includes('lobster-23')
                        ? 'lobster23'
                        : boat.slug.includes('ribco-27')
                          ? 'ribco27'
                          : boat.slug.includes('olympic-490')
                            ? 'olympic490'
                            : null;
                      return boatKey
                        ? t(`boats.${boatKey}.shortDescription`)
                        : boat.shortDescription;
                    })()}
                  </p>

                  {/* Quick Stats */}
                  <div className='grid grid-cols-3 gap-4'>
                    <div className='bg-white/10 backdrop-blur-sm rounded-lg p-4'>
                      <div className='text-3xl font-bold mb-1'>
                        {boat.capacity}
                      </div>
                      <div className='text-sm opacity-80'>
                        {t('boats.people')}
                      </div>
                    </div>
                    <div className='bg-white/10 backdrop-blur-sm rounded-lg p-4'>
                      <div className='text-3xl font-bold mb-1'>
                        {boat.engine}
                      </div>
                      <div className='text-sm opacity-80'>
                        {t('boats.engine')}
                      </div>
                    </div>
                    <div className='bg-white/10 backdrop-blur-sm rounded-lg p-4'>
                      <div className='text-3xl font-bold mb-1'>
                        €{boat.pricePerDay}
                      </div>
                      <div className='text-sm opacity-80'>
                        / {t('boats.perDay')}
                      </div>
                    </div>
                  </div>
                </div>

                <div className='relative'>
                  <div className='relative aspect-video rounded-2xl overflow-hidden shadow-2xl'>
                    <Image
                      src={boat.images[0]}
                      alt={boat.name}
                      fill
                      className='object-cover'
                      priority
                    />
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
          <div className='max-w-6xl mx-auto'>
            {/* Image Gallery */}
            <div className='mb-16'>
              <h2 className='text-3xl font-bold text-gray-900 mb-6'>
                {t('boats.photos')}
              </h2>
              <ImageGalleryModal images={boat.images} boatName={boat.name} />
            </div>

            <div className='grid lg:grid-cols-3 gap-12'>
              {/* Main Content */}
              <div className='lg:col-span-2'>
                {/* Description */}
                <div className='mb-12'>
                  <h2 className='text-3xl font-bold text-gray-900 mb-6'>
                    {t('boats.description')}
                  </h2>
                  <div className='prose prose-lg max-w-none'>
                    <p className='text-gray-700 leading-relaxed text-lg'>
                      {(() => {
                        const boatKey = boat.slug.includes('lobster-23')
                          ? 'lobster23'
                          : boat.slug.includes('ribco-27')
                            ? 'ribco27'
                            : boat.slug.includes('olympic-490')
                              ? 'olympic490'
                              : null;
                        return boatKey
                          ? t(`boats.${boatKey}.longDescription`)
                          : boat.longDescription;
                      })()}
                    </p>
                  </div>
                </div>

                {/* Specifications */}
                <div className='mb-12'>
                  <h2 className='text-3xl font-bold text-gray-900 mb-6'>
                    {t('boats.technicalSpecs')}
                  </h2>
                  <div className='grid md:grid-cols-2 gap-4'>
                    {boat.manufacturer && (
                      <div className='bg-gray-50 rounded-xl p-6 border border-gray-200'>
                        <div className='text-sm text-gray-500 mb-2'>
                          {t('boats.manufacturer')}
                        </div>
                        <div className='text-xl font-bold text-gray-900'>
                          {boat.manufacturer}
                        </div>
                      </div>
                    )}
                    {boat.model && (
                      <div className='bg-gray-50 rounded-xl p-6 border border-gray-200'>
                        <div className='text-sm text-gray-500 mb-2'>
                          {t('boats.model')}
                        </div>
                        <div className='text-xl font-bold text-gray-900'>
                          {boat.model}
                        </div>
                      </div>
                    )}
                    {boat.yearBuilt && (
                      <div className='bg-gray-50 rounded-xl p-6 border border-gray-200'>
                        <div className='text-sm text-gray-500 mb-2'>
                          {t('boats.yearBuilt')}
                        </div>
                        <div className='text-xl font-bold text-gray-900'>
                          {boat.yearBuilt}
                        </div>
                      </div>
                    )}
                    {boat.length && (
                      <div className='bg-gray-50 rounded-xl p-6 border border-gray-200'>
                        <div className='text-sm text-gray-500 mb-2'>
                          {t('boats.lengthLabel')}
                        </div>
                        <div className='text-xl font-bold text-gray-900'>
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
                        </div>
                      </div>
                    )}
                    {boat.maxSpeed && (
                      <div className='bg-gray-50 rounded-xl p-6 border border-gray-200'>
                        <div className='text-sm text-gray-500 mb-2'>
                          {t('boats.maxSpeedLabel')}
                        </div>
                        <div className='text-xl font-bold text-gray-900'>
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
                        </div>
                      </div>
                    )}
                    {boat.fuelCapacity && (
                      <div className='bg-gray-50 rounded-xl p-6 border border-gray-200'>
                        <div className='text-sm text-gray-500 mb-2'>
                          {t('boats.fuelCapacity')}
                        </div>
                        <div className='text-xl font-bold text-gray-900'>
                          {boat.fuelCapacity}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Capacity & Facilities */}
                <div className='mb-12'>
                  <h2 className='text-3xl font-bold text-gray-900 mb-6'>
                    {t('boats.capacityFacilities')}
                  </h2>
                  <div className='bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 border border-primary/10'>
                    <div className='grid md:grid-cols-3 gap-6'>
                      <div className='text-center'>
                        <div className='text-4xl mb-2'>👥</div>
                        <div className='text-2xl font-bold text-gray-900 mb-1'>
                          {boat.cruiseGuests || boat.capacity}
                        </div>
                        <div className='text-sm text-gray-600'>
                          {t('boats.guests')}
                        </div>
                      </div>
                      {boat.bathrooms !== undefined && (
                        <div className='text-center'>
                          <div className='text-4xl mb-2'>🚿</div>
                          <div className='text-2xl font-bold text-gray-900 mb-1'>
                            {boat.bathrooms}
                          </div>
                          <div className='text-sm text-gray-600'>
                            {t('boats.bathrooms')}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className='lg:col-span-1'>
                {/* Pricing Card */}
                <div className='sticky top-24 mb-6'>
                  <div className='bg-primary text-white rounded-2xl p-8 shadow-xl'>
                    <div className='text-center mb-6'>
                      <div className='text-5xl font-bold mb-2'>
                        €{boat.pricePerDay}
                      </div>
                      <div className='text-lg opacity-90'>
                        / {t('boats.perDay')}
                      </div>
                      <div className='text-sm opacity-75 mt-2'>
                        {t('boats.captainNotIncluded')}
                      </div>
                    </div>

                    <div className='space-y-3 mb-6'>
                      <a
                        href='tel:+306978277120'
                        className='block w-full bg-white text-primary px-6 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-200 text-center text-lg'
                      >
                        📞 {t('common.bookNow')}
                      </a>
                      <a
                        href='#contact-form'
                        className='block w-full border-2 border-white text-white px-6 py-4 rounded-xl font-semibold hover:bg-white hover:text-primary transition-all duration-200 text-center text-lg'
                      >
                        📝 {t('common.sendMessage')}
                      </a>
                    </div>

                    <div className='pt-6 border-t border-white/20'>
                      <div className='text-sm space-y-2'>
                        <div className='flex items-center justify-between'>
                          <span className='opacity-80'>
                            {t('boats.capacity')}
                          </span>
                          <span className='font-semibold'>
                            {boat.capacity} {t('boats.people')}
                          </span>
                        </div>
                        <div className='flex items-center justify-between'>
                          <span className='opacity-80'>
                            {t('boats.engine')}:
                          </span>
                          <span className='font-semibold'>{boat.engine}</span>
                        </div>
                        {boat.length && (
                          <div className='flex items-center justify-between'>
                            <span className='opacity-80'>
                              {t('boats.lengthLabel')}:
                            </span>
                            <span className='font-semibold'>
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id='contact-form' className='section-padding bg-muted'>
        <div className='container-custom'>
          <div className='max-w-2xl mx-auto'>
            <ContactForm locale={locale} />
          </div>
        </div>
      </section>

      {/* Other Boats */}
      <section className='section-padding'>
        <div className='container-custom'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>
              {t('boats.otherBoats')}
            </h2>
          </div>

          <div className='grid md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
            {boats
              .filter(otherBoat => otherBoat.id !== boat.id)
              .slice(0, 2)
              .map(otherBoat => {
                const otherBoatKey = otherBoat.slug.includes('lobster-23')
                  ? 'lobster23'
                  : otherBoat.slug.includes('ribco-27')
                    ? 'ribco27'
                    : otherBoat.slug.includes('olympic-490')
                      ? 'olympic490'
                      : null;
                const otherBoatShortDesc = otherBoatKey
                  ? t(`boats.${otherBoatKey}.shortDescription`)
                  : otherBoat.shortDescription;
                return (
                  <Link
                    key={otherBoat.id}
                    href={path(`/boats/${otherBoat.slug}`)}
                  >
                    <div className='card hover:shadow-xl transition-all duration-300 cursor-pointer group'>
                      <div className='aspect-video bg-gray-200 rounded-t-xl overflow-hidden relative'>
                        <Image
                          src={otherBoat.images[0]}
                          alt={`${otherBoat.name}`}
                          fill
                          className='object-cover group-hover:scale-105 transition-transform duration-300'
                          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                        />
                      </div>
                      <div className='p-6'>
                        <h3 className='text-xl font-semibold mb-2 group-hover:text-primary transition-colors'>
                          {otherBoat.name}
                        </h3>
                        <p className='text-gray-600 mb-4'>
                          {otherBoatShortDesc}
                        </p>
                        <div className='flex justify-between items-center text-sm text-gray-500'>
                          <span>
                            {otherBoat.capacity} {t('boats.people')}
                          </span>
                          <span>{otherBoat.engine}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>

          <div className='text-center mt-12'>
            <Link href={path('/fleet')} className='btn-secondary'>
              {t('home.fleet.seeAllFleet')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
