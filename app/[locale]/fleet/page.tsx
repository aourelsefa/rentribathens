import React from 'react';
import { boats } from '@/data/boats';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getTranslations, Locale } from '@/lib/i18n';

interface FleetPageProps {
  params: { locale: Locale };
}

export async function generateMetadata({
  params,
}: FleetPageProps): Promise<Metadata> {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://rentribathens.gr';
  const title =
    params.locale === 'el'
      ? 'Στόλος - Ενοικίαση RIB στη Αθήνα'
      : 'Fleet - RIB Rental in Athens';
  const description =
    params.locale === 'el'
      ? 'Δείτε όλο τον στόλο μας με RIB σκάφη για κάθε ανάγκη. Άνετα, γρήγορα και ασφαλή σκάφη για τις εκδρομές σας στον Σαρωνικό.'
      : 'View our entire fleet of RIB boats for every need. Comfortable, fast and safe boats for your trips in the Saronic Gulf.';
  const canonicalPath = params.locale === 'el' ? '/fleet' : '/en/fleet';

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
      languages: {
        el: '/fleet',
        en: '/en/fleet',
        'x-default': '/fleet',
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

export default function FleetPage({ params }: FleetPageProps) {
  const { locale } = params;
  const t = getTranslations(locale);

  return (
    <>
      {/* Hero Section */}
      <section className='bg-primary text-white'>
        <div className='section-padding'>
          <div className='container-custom'>
            <div className='text-center max-w-4xl mx-auto'>
              <h1 className='text-4xl md:text-5xl font-bold mb-6'>
                {locale === 'el' ? 'Ο Στόλος μας' : 'Our Fleet'}
              </h1>
              <p className='text-xl md:text-2xl mb-8 opacity-90'>
                {locale === 'el'
                  ? 'Διαθέτουμε ποικιλία RIB σκαφών για κάθε ανάγκη και προϋπολογισμό'
                  : 'We offer a variety of RIB boats for every need and budget'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Content */}
      <section className='section-padding bg-muted'>
        <div className='container-custom'>
          {/* Fleet Rows */}
          <div className='space-y-8 mb-16'>
            {boats.map(boat => (
              <div
                key={boat.id}
                className='bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300'
              >
                <div className='grid lg:grid-cols-3 gap-0'>
                  {/* Image Section */}
                  <div className='lg:col-span-1'>
                    <div className='aspect-video lg:aspect-square relative overflow-hidden'>
                      <Image
                        src={boat.images[0]}
                        alt={`${boat.name} - ${locale === 'el' ? 'Κύρια φωτογραφία' : 'Main photo'}`}
                        fill
                        className='object-cover hover:scale-105 transition-transform duration-300'
                        sizes='(max-width: 768px) 100vw, 33vw'
                      />
                      <div className='absolute top-4 left-4 bg-white/90 text-primary px-3 py-1 rounded-full text-sm font-semibold'>
                        {boat.name}
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className='lg:col-span-2 p-8'>
                    <div className='flex flex-col h-full'>
                      {/* Header */}
                      <div className='mb-6'>
                        <h3 className='text-2xl font-bold text-gray-900 mb-2'>
                          {boat.name}
                        </h3>
                        <p className='text-gray-600 leading-relaxed'>
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
                      </div>

                      {/* Specifications */}
                      <div className='grid md:grid-cols-2 gap-6 mb-6'>
                        <div className='space-y-3'>
                          <div className='flex items-center'>
                            <div className='w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center mr-3'>
                              <span className='text-accent'>👥</span>
                            </div>
                            <div>
                              <div className='text-sm text-gray-500'>
                                {locale === 'el' ? 'Χωρητικότητα' : 'Capacity'}
                              </div>
                              <div className='font-semibold text-gray-900'>
                                {boat.capacity}{' '}
                                {locale === 'el' ? 'άτομα' : 'people'}
                              </div>
                            </div>
                          </div>
                          <div className='flex items-center'>
                            <div className='w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center mr-3'>
                              <span className='text-accent'>⚙️</span>
                            </div>
                            <div>
                              <div className='text-sm text-gray-500'>
                                {locale === 'el' ? 'Κινητήρας' : 'Engine'}
                              </div>
                              <div className='font-semibold text-gray-900'>
                                {boat.engine}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='space-y-3'>
                          <div className='flex items-center'>
                            <div className='w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center mr-3'>
                              <span className='text-accent'>📸</span>
                            </div>
                            <div>
                              <div className='text-sm text-gray-500'>
                                {locale === 'el' ? 'Φωτογραφίες' : 'Photos'}
                              </div>
                              <div className='font-semibold text-gray-900'>
                                {boat.images.length}{' '}
                                {locale === 'el' ? 'διαθέσιμες' : 'available'}
                              </div>
                            </div>
                          </div>
                          <div className='flex items-center'>
                            <div className='w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center mr-3'>
                              <span className='text-accent'>✅</span>
                            </div>
                            <div>
                              <div className='text-sm text-gray-500'>
                                {locale === 'el' ? 'Κατάσταση' : 'Status'}
                              </div>
                              <div className='font-semibold text-green-600'>
                                {t('common.available')}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className='flex flex-col sm:flex-row gap-3 mt-auto'>
                        <Link
                          href={
                            locale === 'el'
                              ? `/boats/${boat.slug}`
                              : `/en/boats/${boat.slug}`
                          }
                          className='bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-200 text-center'
                        >
                          {t('common.details')}
                        </Link>
                        <a
                          href='tel:+306978277120'
                          className='border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all duration-200 text-center'
                        >
                          📞 {t('common.bookNow')}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Fleet Stats */}
          <div className='bg-white rounded-2xl p-8 shadow-lg'>
            <div className='grid md:grid-cols-3 gap-8 text-center'>
              <div>
                <div className='text-4xl font-bold text-primary mb-2'>
                  {boats.length}
                </div>
                <div className='text-gray-600'>
                  {locale === 'el' ? 'Σκάφη διαθέσιμα' : 'Boats Available'}
                </div>
              </div>
              <div>
                <div className='text-4xl font-bold text-primary mb-2'>
                  {Math.max(...boats.map(boat => boat.capacity))}
                </div>
                <div className='text-gray-600'>
                  {locale === 'el' ? 'Μέγιστη χωρητικότητα' : 'Max Capacity'}
                </div>
              </div>
              <div>
                <div className='text-4xl font-bold text-primary mb-2'>7/7</div>
                <div className='text-gray-600'>
                  {locale === 'el'
                    ? 'Διαθέσιμα κάθε μέρα'
                    : 'Available Every Day'}
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className='text-center mt-16'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>
              {t('home.cta.title')}
            </h2>
            <p className='text-lg text-gray-600 mb-8'>
              {t('home.cta.description')}
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <a
                href='tel:+306978277120'
                className='bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
              >
                📞 {t('common.bookNow')}
              </a>
              <Link
                href={locale === 'el' ? '/contact' : '/en/contact'}
                className='border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary hover:text-white transition-all duration-200'
              >
                {t('common.sendMessage')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
