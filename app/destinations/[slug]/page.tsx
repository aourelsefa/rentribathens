import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getDestinationBySlug, getAllDestinations } from '@/data/destinations';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';

interface DestinationPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const destinations = getAllDestinations();
  return destinations.map(destination => ({
    slug: destination.slug,
  }));
}

export async function generateMetadata({
  params,
}: DestinationPageProps): Promise<Metadata> {
  const destination = getDestinationBySlug(params.slug);

  if (!destination) {
    return {
      title: 'Προορισμός δεν βρέθηκε',
    };
  }

  return {
    title: destination.seoTitle,
    description: destination.seoDescription,
    keywords: destination.seoKeywords,
    openGraph: {
      title: destination.seoTitle,
      description: destination.seoDescription,
      images: [
        {
          url: destination.image,
          width: 1200,
          height: 630,
          alt: `${destination.name} - RentRibAthens`,
        },
      ],
      locale: 'el_GR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: destination.seoTitle,
      description: destination.seoDescription,
      images: [destination.image],
    },
    alternates: {
      canonical: `/destinations/${destination.slug}`,
    },
  };
}

export default async function DestinationPage({
  params,
}: DestinationPageProps) {
  const destination = getDestinationBySlug(params.slug);

  if (!destination) {
    notFound();
  }

  const otherDestinations = getAllDestinations()
    .filter(d => d.id !== destination.id)
    .slice(0, 3);

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://rentribathens.gr';
  const businessPhone =
    process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+306978277120';

  // Structured Data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: destination.name,
    alternateName: destination.nameEn,
    description: destination.longDescription,
    image: `${siteUrl}${destination.image}`,
    url: `${siteUrl}/destinations/${destination.slug}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: destination.name,
      addressRegion: 'Αττική',
      addressCountry: 'GR',
    },
    offers: {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: `Κρουαζιέρα προς ${destination.name}`,
        description: `Ενοικίαση RIB σκάφους για κρουαζιέρα προς ${destination.name}. ${destination.shortDescription}`,
        provider: {
          '@type': 'LocalBusiness',
          name: 'RentRibAthens',
          telephone: businessPhone,
          url: siteUrl,
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Μαρίνα Λαγονησίου',
            addressLocality: 'Λαγονήσι',
            addressRegion: 'Αττική',
            addressCountry: 'GR',
          },
        },
      },
    },
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
                <Link href='/' className='hover:text-accent transition-colors'>
                  Αρχική
                </Link>
                <span className='mx-2'>/</span>
                <Link
                  href='/services'
                  className='hover:text-accent transition-colors'
                >
                  Υπηρεσίες
                </Link>
                <span className='mx-2'>/</span>
                <span>{destination.name}</span>
              </nav>

              <h1 className='text-4xl md:text-5xl font-bold mb-4'>
                {destination.name}
              </h1>
              <p className='text-xl md:text-2xl mb-8 opacity-90'>
                {destination.shortDescription}
              </p>

              {/* Quick Info */}
              <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-8'>
                <div className='bg-white/10 backdrop-blur-sm rounded-lg p-4'>
                  <div className='text-sm opacity-80 mb-1'>Απόσταση</div>
                  <div className='text-lg font-semibold'>
                    {destination.distance}
                  </div>
                </div>
                <div className='bg-white/10 backdrop-blur-sm rounded-lg p-4'>
                  <div className='text-sm opacity-80 mb-1'>Διάρκεια</div>
                  <div className='text-lg font-semibold'>
                    {destination.duration}
                  </div>
                </div>
                <div className='bg-white/10 backdrop-blur-sm rounded-lg p-4'>
                  <div className='text-sm opacity-80 mb-1'>
                    Καλύτερος χρόνος
                  </div>
                  <div className='text-lg font-semibold'>
                    {destination.bestTime}
                  </div>
                </div>
                <div className='bg-white/10 backdrop-blur-sm rounded-lg p-4'>
                  <div className='text-sm opacity-80 mb-1'>Αγγλικά</div>
                  <div className='text-lg font-semibold'>
                    {destination.nameEn}
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
                  Σχετικά με τον Προορισμό
                </h2>
                <p className='text-gray-600 leading-relaxed text-lg'>
                  {destination.longDescription}
                </p>
              </div>

              {/* Highlights */}
              <div className='mb-8'>
                <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                  Αξιοθέατα & Χαρακτηριστικά
                </h2>
                <div className='grid md:grid-cols-2 gap-4'>
                  {destination.highlights.map((highlight, index) => (
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
                  Συμβουλές & Πληροφορίες
                </h2>
                <div className='space-y-3'>
                  {destination.tips.map((tip, index) => (
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
                  Κλείστε την Εκδρομή σας
                </h3>
                <p className='mb-6 opacity-90'>
                  Ενοικιάστε ένα από τα RIB σκάφη μας για να ανακαλύψετε το{' '}
                  {destination.name}
                </p>
                <div className='space-y-3'>
                  <a
                    href='tel:+306978277120'
                    className='block w-full bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 text-center'
                  >
                    📞 Κλείστε Τώρα
                  </a>
                  <Link
                    href='/contact'
                    className='block w-full border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-all duration-200 text-center'
                  >
                    Στείλε Μήνυμα
                  </Link>
                </div>
              </div>

              {/* Info Card */}
              <div className='bg-gray-50 rounded-xl p-6 mb-6'>
                <h3 className='text-xl font-bold text-gray-900 mb-4'>
                  Πληροφορίες Εκδρομής
                </h3>
                <div className='space-y-4'>
                  <div>
                    <div className='text-sm text-gray-600 mb-1'>Απόσταση</div>
                    <div className='font-semibold text-gray-900'>
                      {destination.distance}
                    </div>
                  </div>
                  <div>
                    <div className='text-sm text-gray-600 mb-1'>
                      Διάρκεια Ταξιδιού
                    </div>
                    <div className='font-semibold text-gray-900'>
                      {destination.duration}
                    </div>
                  </div>
                  <div>
                    <div className='text-sm text-gray-600 mb-1'>
                      Καλύτερος Χρόνος
                    </div>
                    <div className='font-semibold text-gray-900'>
                      {destination.bestTime}
                    </div>
                  </div>
                </div>
              </div>

              {/* Services Card */}
              <div className='bg-accent/10 border border-accent/20 rounded-xl p-6'>
                <h3 className='text-xl font-bold text-gray-900 mb-4'>
                  Διαθέσιμες Υπηρεσίες
                </h3>
                <div className='space-y-3'>
                  <div className='flex items-center'>
                    <span className='text-accent mr-2'>🚤</span>
                    <span className='text-gray-700'>
                      Κρουαζιέρα με κάπετανο
                    </span>
                  </div>
                  <div className='flex items-center'>
                    <span className='text-accent mr-2'>⛴️</span>
                    <span className='text-gray-700'>Μεταφορά VIP</span>
                  </div>
                  <div className='flex items-center'>
                    <span className='text-accent mr-2'>🏝️</span>
                    <span className='text-gray-700'>Ημερήσιες εκδρομές</span>
                  </div>
                  <div className='flex items-center'>
                    <span className='text-accent mr-2'>⭐</span>
                    <span className='text-gray-700'>
                      Αποκλειστικές VIP υπηρεσίες
                    </span>
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
              Άλλοι Προορισμοί που μπορεί να σας ενδιαφέρουν
            </h2>
            <p className='text-lg text-gray-600'>
              Ανακαλύψτε και άλλους όμορφους προορισμούς στον Σαρωνικό
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-8'>
            {otherDestinations.map(otherDest => (
              <Link key={otherDest.id} href={`/destinations/${otherDest.slug}`}>
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
                      {otherDest.name}
                    </h3>
                    <p className='text-gray-600 mb-4 text-sm'>
                      {otherDest.shortDescription}
                    </p>
                    <div className='flex items-center text-sm text-primary'>
                      <span>Μάθετε περισσότερα</span>
                      <span className='ml-2'>→</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className='text-center mt-12'>
            <Link href='/services' className='btn-secondary'>
              Δείτε Όλες τις Υπηρεσίες
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
