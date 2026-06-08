import Link from 'next/link';
import { boats } from '@/data/boats';
import LandingBoatGallery from '@/components/LandingBoatGallery';
import PhoneLink from '@/components/PhoneLink';
import { getTranslations, Locale } from '@/lib/i18n';
import { Metadata } from 'next';

const PHONE = '+306978277120';
const PHONE_DISPLAY = '+30 697 827 7120';

interface LandingPageProps {
  params: { locale: Locale };
}

function getBoatTranslationKey(slug: string) {
  if (slug.includes('lobster-23')) return 'boats.lobster23';
  if (slug.includes('ribco-27')) return 'boats.ribco27';
  if (slug.includes('olympic-490')) return 'boats.olympic490';
  return null;
}

export async function generateMetadata({
  params,
}: LandingPageProps): Promise<Metadata> {
  const t = getTranslations(params.locale);
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://rentribathens.gr';
  const canonicalPath = params.locale === 'el' ? '/lp/boats' : '/en/lp/boats';

  return {
    title: t('landing.boats.metaTitle'),
    description: t('landing.boats.metaDescription'),
    alternates: {
      canonical: canonicalPath,
      languages: {
        el: '/lp/boats',
        en: '/en/lp/boats',
        'x-default': '/lp/boats',
      },
    },
    openGraph: {
      title: t('landing.boats.metaTitle'),
      description: t('landing.boats.metaDescription'),
      url: `${siteUrl}${canonicalPath}`,
      siteName: 'RentRibAthens',
      locale: params.locale === 'el' ? 'el_GR' : 'en_US',
      alternateLocale: params.locale === 'el' ? 'en_US' : 'el_GR',
      type: 'website',
    },
  };
}

export default function BoatsLandingPage({ params }: LandingPageProps) {
  const { locale } = params;
  const t = getTranslations(locale);
  const lp = (key: string) => t(`landing.boats.${key}`);

  const trustPoints = [lp('trust1'), lp('trust2'), lp('trust3'), lp('trust4')];

  return (
    <>
      {/* Hero */}
      <section className='bg-primary text-white'>
        <div className='section-padding'>
          <div className='container-custom'>
            <div className='max-w-3xl mx-auto text-center'>
              <span className='inline-block bg-accent text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-6'>
                🚤 {lp('badge')}
              </span>
              <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight'>
                {lp('title')}
              </h1>
              <p className='text-lg md:text-xl mb-8 opacity-90'>
                {lp('subtitle')}
              </p>
              <PhoneLink
                phone={PHONE}
                trackingLocation='hero'
                buttonText={t('common.callNow')}
                className='inline-flex items-center justify-center gap-2 bg-white text-primary px-10 py-4 rounded-xl font-bold text-xl hover:bg-gray-50 transition-all shadow-lg'
              >
                📞 {t('common.callNow')}
              </PhoneLink>
              <p className='mt-4 text-white/80 text-lg font-medium'>
                {PHONE_DISPLAY}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Boats */}
      <section className='section-padding bg-muted'>
        <div className='container-custom'>
          <div className='text-center mb-10'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-3'>
              {lp('fleetTitle')}
            </h2>
            <p className='text-gray-600 max-w-2xl mx-auto'>
              {lp('fleetSubtitle')}
            </p>
          </div>

          <div className='space-y-6 max-w-4xl mx-auto'>
            {boats.map(boat => {
              const boatKey = getBoatTranslationKey(boat.slug);
              const shortDescription = boatKey
                ? t(`${boatKey}.shortDescription`)
                : boat.shortDescription;
              const boatHref =
                locale === 'el'
                  ? `/boats/${boat.slug}`
                  : `/en/boats/${boat.slug}`;

              return (
                <div
                  key={boat.id}
                  className='bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100'
                >
                  <div className='flex flex-col sm:flex-row'>
                    <div className='sm:w-2/5'>
                      <LandingBoatGallery
                        images={boat.images}
                        boatName={boat.name}
                        boatHref={boatHref}
                        priceLabel={`€${boat.pricePerDay}/${t('boats.perDay')}`}
                      />
                    </div>

                    <div className='sm:w-3/5 p-6 flex flex-col justify-center'>
                      <Link
                        href={boatHref}
                        className='text-2xl font-bold text-gray-900 mb-1 hover:text-primary transition-colors w-fit'
                      >
                        {boat.name}
                      </Link>
                      <p className='text-gray-600 text-sm mb-4 leading-relaxed'>
                        {shortDescription}
                      </p>

                      <div className='flex flex-wrap gap-4 mb-5 text-sm'>
                        <span className='flex items-center gap-1.5 text-gray-700'>
                          <span>👥</span>
                          <strong>{boat.capacity}</strong> {t('boats.people')}
                        </span>
                        <span className='flex items-center gap-1.5 text-gray-700'>
                          <span>⚙️</span>
                          <strong>{boat.engine}</strong>
                        </span>
                        <span className='flex items-center gap-1.5 text-green-600 font-medium'>
                          ✓ {t('common.available')}
                        </span>
                      </div>

                      <div className='flex flex-col sm:flex-row gap-3'>
                        <PhoneLink
                          phone={PHONE}
                          trackingLocation={`boat_${boat.slug}`}
                          buttonText={t('common.bookNow')}
                          boatName={boat.name}
                          className='inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors'
                        >
                          📞 {t('common.bookNow')}
                        </PhoneLink>
                        <Link
                          href={boatHref}
                          className='inline-flex items-center justify-center gap-2 border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors text-center'
                        >
                          {t('common.details')}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <p className='text-center text-gray-500 text-sm mt-8'>
            {lp('from')} €180 – €500 / {t('boats.perDay')}
          </p>
        </div>
      </section>

      {/* Trust */}
      <section className='section-padding bg-white'>
        <div className='container-custom'>
          <h2 className='text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8'>
            {lp('trustTitle')}
          </h2>
          <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto'>
            {trustPoints.map((point, i) => (
              <div
                key={i}
                className='flex items-start gap-3 p-4 bg-muted rounded-xl'
              >
                <span className='text-accent font-bold text-lg shrink-0'>
                  ✓
                </span>
                <span className='text-gray-700 text-sm font-medium'>
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className='bg-primary text-white'>
        <div className='section-padding'>
          <div className='container-custom text-center max-w-2xl mx-auto'>
            <h2 className='text-3xl md:text-4xl font-bold mb-3'>
              {lp('ctaTitle')}
            </h2>
            <p className='text-lg opacity-90 mb-8'>{lp('ctaSubtitle')}</p>
            <PhoneLink
              phone={PHONE}
              trackingLocation='footer_cta'
              buttonText={PHONE_DISPLAY}
              className='inline-flex items-center justify-center gap-2 bg-accent text-white px-10 py-4 rounded-xl font-bold text-xl hover:bg-accent/90 transition-all shadow-lg'
            >
              📞 {PHONE_DISPLAY}
            </PhoneLink>
          </div>
        </div>
      </section>
    </>
  );
}
