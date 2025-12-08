import Image from 'next/image';
import { Locale } from '@/lib/i18n';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaPhone: string;
  backgroundImage?: string;
  className?: string;
  locale?: Locale;
  fleetLink?: string;
  translations?: {
    ribRental: string;
    fleet: string;
    whyChooseUs: string;
    why1: string;
    why2: string;
    why3: string;
    why4: string;
  };
}

export default function Hero({
  title,
  subtitle,
  ctaText,
  ctaPhone,
  backgroundImage,
  className = '',
  locale = 'el',
  fleetLink = '/fleet',
  translations,
}: HeroProps) {
  // Fallback translations if not provided
  const t = translations || {
    ribRental: locale === 'el' ? 'Ενοικίαση RIB Σκαφών' : 'RIB Boat Rental',
    fleet: locale === 'el' ? 'Στόλος' : 'Fleet',
    whyChooseUs:
      locale === 'el' ? 'Γιατί να επιλέξετε εμάς;' : 'Why Choose Us?',
    why1:
      locale === 'el'
        ? 'Άμεση κράτηση & διαθεσιμότητα'
        : 'Instant booking & availability',
    why2:
      locale === 'el'
        ? 'Επαγγελματικός εξοπλισμός ασφαλείας'
        : 'Professional safety equipment',
    why3:
      locale === 'el'
        ? 'Δωρεάν συμβουλές & υποστήριξη'
        : 'Free advice & support',
    why4:
      locale === 'el'
        ? 'Βέλτιστη θέση στο Λαγονήσι'
        : 'Best location in Lagonisi',
  };
  return (
    <section className={`relative overflow-hidden ${className}`}>
      {/* Background Image */}
      {backgroundImage && (
        <div className='absolute inset-0 z-0'>
          <Image
            src={backgroundImage}
            alt='Hero background'
            fill
            className='object-cover'
            priority
            sizes='100vw'
          />
          <div
            className='absolute inset-0'
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          />
        </div>
      )}

      {/* Gradient Overlay (when no background image) */}
      {!backgroundImage && (
        <div className='absolute inset-0 bg-gradient-to-br from-primary to-primary/80' />
      )}

      {/* Content */}
      <div className='relative z-10 h-[70vh] flex items-end pb-24'>
        <div className='container-custom'>
          <div className='grid lg:grid-cols-2 gap-12 items-end'>
            {/* Left Side - Text Content */}
            <div className='text-white'>
              <div className='mb-6'>
                <span className='inline-block bg-primary text-white px-4 py-2 rounded-full text-sm font-medium mb-4'>
                  🚤 {t.ribRental}
                </span>
              </div>

              <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight drop-shadow-lg'>
                {title}
              </h1>

              <p className='text-lg md:text-xl mb-8 opacity-90 leading-relaxed drop-shadow-md'>
                {subtitle}
              </p>

              <div className='flex flex-col sm:flex-row gap-4'>
                <a
                  href={`tel:${ctaPhone}`}
                  className='bg-white text-primary px-8 py-3 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-center'
                >
                  📞 {ctaText}
                </a>
                <a
                  href={fleetLink}
                  className='border-2 border-white text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary transition-all duration-200 text-center'
                >
                  {t.fleet}
                </a>
              </div>
            </div>

            {/* Right Side - Features */}
            <div className='hidden lg:block'>
              <div className='bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20'>
                <h3 className='text-white text-xl font-semibold mb-4'>
                  {t.whyChooseUs}
                </h3>
                <div className='space-y-3'>
                  <div className='flex items-center text-white/90'>
                    <span className='text-accent mr-3'>✓</span>
                    <span>{t.why1}</span>
                  </div>
                  <div className='flex items-center text-white/90'>
                    <span className='text-accent mr-3'>✓</span>
                    <span>{t.why2}</span>
                  </div>
                  <div className='flex items-center text-white/90'>
                    <span className='text-accent mr-3'>✓</span>
                    <span>{t.why3}</span>
                  </div>
                  <div className='flex items-center text-white/90'>
                    <span className='text-accent mr-3'>✓</span>
                    <span>{t.why4}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className='absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent z-10' />
    </section>
  );
}
