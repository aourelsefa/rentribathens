import Link from 'next/link';
import { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, Locale } from '@/lib/i18n';

interface ServicesPageProps {
  params: { locale: Locale };
}

export async function generateMetadata({
  params,
}: ServicesPageProps): Promise<Metadata> {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://rentribathens.gr';
  const title = params.locale === 'el' ? 'Υπηρεσίες' : 'Services';
  const description =
    params.locale === 'el'
      ? 'Πλήρης γκάμα υπηρεσιών για θαλάσσιες εκδρομές. Ενοικίαση σκαφών, κρουαζιέρες, μεταφορές στον Σαρωνικό. Επαγγελματική εξυπηρέτηση.'
      : 'Full range of services for sea trips. Boat rental, cruises, transfers in the Saronic Gulf. Professional service.';
  const canonicalPath = params.locale === 'el' ? '/services' : '/en/services';

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
      languages: {
        el: '/services',
        en: '/en/services',
        'x-default': '/services',
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}${canonicalPath}`,
      siteName: 'RentRibAthens',
      locale: params.locale === 'el' ? 'el_GR' : 'en_US',
      alternateLocale: params.locale === 'el' ? 'en_US' : 'el_GR',
      type: 'website',
    },
  };
}

export default function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = params;
  const t = getTranslations(locale);

  // Services data - will be translated later
  const mainServices = [
    {
      title: locale === 'el' ? 'Ενοικίαση Σκάφους' : 'Boat Rental',
      description:
        locale === 'el'
          ? 'Ενοικίαση RIB σκαφών για περιηγήσεις στον Σαρωνικό. Διαθέτουμε ποικιλία μεγέθους και χωρητικότητας για κάθε ανάγκη.'
          : 'RIB boat rental for tours in the Saronic Gulf. We offer a variety of sizes and capacities for every need.',
      icon: <span className='text-2xl'>🚤</span>,
      image: '/images/boats/01-1.jpg',
    },
    {
      title: locale === 'el' ? 'Κρουαζιέρες' : 'Cruises',
      description:
        locale === 'el'
          ? 'Οργανωμένες κρουαζιέρες σε όμορφα μέρη του Σαρωνικού. Ανακαλύψτε κρυμμένα κολπάκια και παραλίες που είναι προσβάσιμες μόνο από τη θάλασσα.'
          : 'Organized cruises to beautiful places in the Saronic Gulf. Discover hidden coves and beaches accessible only by sea.',
      icon: <span className='text-2xl'>🏝️</span>,
      image: '/images/boats/02-1.jpg',
    },
    {
      title: locale === 'el' ? 'Μεταφορές' : 'Transfers',
      description:
        locale === 'el'
          ? 'Μεταφορές σε νησιά και παραλίες του Σαρωνικού. Γρήγορη και ασφαλής μεταφορά με τα σκάφη μας.'
          : 'Transfers to islands and beaches of the Saronic Gulf. Fast and safe transportation with our boats.',
      icon: <span className='text-2xl'>⛴️</span>,
      image: '/images/boats/03-1.jpg',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className='bg-primary text-white'>
        <div className='section-padding'>
          <div className='container-custom'>
            <div className='text-center max-w-4xl mx-auto'>
              <h1 className='text-4xl md:text-5xl font-bold mb-6'>
                {locale === 'el' ? 'Υπηρεσίες μας' : 'Our Services'}
              </h1>
              <p className='text-xl md:text-2xl mb-8 opacity-90'>
                {locale === 'el'
                  ? 'Πλήρης γκάμα υπηρεσιών για θαλάσσιες εκδρομές στον Σαρωνικό'
                  : 'Full range of services for sea trips in the Saronic Gulf'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className='section-padding'>
        <div className='container-custom'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
              {locale === 'el' ? 'Κύριες Υπηρεσίες' : 'Main Services'}
            </h2>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
              {locale === 'el'
                ? 'Ανακαλύψτε τις κύριες υπηρεσίες που προσφέρουμε για την καλύτερη εμπειρία'
                : 'Discover the main services we offer for the best experience'}
            </p>
          </div>

          <div className='space-y-16'>
            {mainServices.map((service, index) => (
              <div
                key={index}
                className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
              >
                <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className='flex items-center mb-6'>
                    <div className='w-16 h-16 bg-primary rounded-full flex items-center justify-center mr-4'>
                      <span className='text-white text-2xl'>
                        {service.icon}
                      </span>
                    </div>
                    <h3 className='text-2xl md:text-3xl font-bold text-gray-900'>
                      {service.title}
                    </h3>
                  </div>

                  <p className='text-lg text-gray-600 mb-6 leading-relaxed'>
                    {service.description}
                  </p>
                </div>

                <div
                  className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}
                >
                  <div className='aspect-video bg-gray-200 rounded-xl overflow-hidden relative'>
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className='object-cover'
                      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='bg-primary text-white'>
        <div className='section-padding'>
          <div className='container-custom'>
            <div className='text-center'>
              <h2 className='text-2xl md:text-3xl font-bold mb-4'>
                {t('home.cta.title')}
              </h2>
              <p className='text-lg mb-8 opacity-90'>
                {t('home.cta.description')}
              </p>
              <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                <a href='tel:+306978277120' className='btn-secondary'>
                  📞 {t('common.bookNow')}
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
