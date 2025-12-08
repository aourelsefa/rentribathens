import Link from 'next/link';
import { Locale } from '@/lib/i18n';

interface FooterProps {
  locale: Locale;
}

export default function Footer({ locale }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'Facebook',
      href: '#',
      icon: (
        <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
          <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: '#',
      icon: (
        <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
          <path d='M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.49 0-.875-.385-.875-.875s.385-.875.875-.875.875.385.875.875-.385.875-.875.875z' />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: '#',
      icon: (
        <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
          <path d='M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' />
        </svg>
      ),
    },
    {
      name: 'WhatsApp',
      href: '#',
      icon: (
        <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
          <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488' />
        </svg>
      ),
    },
  ];

  return (
    <footer className='bg-gray-900 text-white'>
      <div className='section-padding'>
        <div className='container-custom'>
          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {/* Company Info */}
            <div className='lg:col-span-2'>
              <Link
                href={locale === 'el' ? '/' : '/en'}
                className='flex items-center mb-4'
              >
                <span className='text-2xl font-bold'>RentRibAthens</span>
              </Link>
              <p className='text-gray-300 mb-4 max-w-md'>
                {locale === 'el'
                  ? 'Η καλύτερη επιλογή για ενοικίαση RIB στην Αθήνα. Ασφαλείς και άνετες περιηγήσεις στον Σαρωνικό με επαγγελματική εξυπηρέτηση.'
                  : 'The best choice for RIB rental in Athens. Safe and comfortable trips in the Saronic Gulf with professional service.'}
              </p>

              {/* Address */}
              <div className='text-gray-300'>
                <h4 className='font-semibold text-white mb-2'>
                  {locale === 'el' ? 'Διεύθυνση:' : 'Address:'}
                </h4>
                <p>Λαγονήσι, Αττική</p>
                <p>
                  {locale === 'el' ? 'Μαρίνα Λαγονησίου' : 'Lagonisi Marina'}
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className='text-lg font-semibold mb-4'>
                {locale === 'el' ? 'Επικοινωνία' : 'Contact'}
              </h4>
              <div className='space-y-3 text-gray-300'>
                <div className='flex items-center space-x-2'>
                  <span>📞</span>
                  <a
                    href='tel:+306978277120'
                    className='hover:text-accent transition-colors duration-200'
                  >
                    +30 697 827 7120
                  </a>
                </div>
                <div className='flex items-center space-x-2'>
                  <span>📧</span>
                  <a
                    href='mailto:info@rentribathens.gr'
                    className='hover:text-accent transition-colors duration-200'
                  >
                    info@rentribathens.gr
                  </a>
                </div>
                <div className='flex items-center space-x-2'>
                  <span>🕒</span>
                  <span>
                    {locale === 'el'
                      ? 'Δευτέρα - Κυριακή: 08:00 - 20:00'
                      : 'Monday - Sunday: 08:00 - 20:00'}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className='text-lg font-semibold mb-4'>
                {locale === 'el' ? 'Σύνδεσμοι' : 'Links'}
              </h4>
              <div className='space-y-2 text-gray-300'>
                <Link
                  href={locale === 'el' ? '/' : '/en'}
                  className='block hover:text-accent transition-colors duration-200'
                >
                  {locale === 'el' ? 'Αρχική' : 'Home'}
                </Link>
                <Link
                  href={locale === 'el' ? '/fleet' : '/en/fleet'}
                  className='block hover:text-accent transition-colors duration-200'
                >
                  {locale === 'el' ? 'Σκάφη' : 'Fleet'}
                </Link>
                <Link
                  href={locale === 'el' ? '/services' : '/en/services'}
                  className='block hover:text-accent transition-colors duration-200'
                >
                  {locale === 'el' ? 'Υπηρεσίες' : 'Services'}
                </Link>
                <Link
                  href={locale === 'el' ? '/contact' : '/en/contact'}
                  className='block hover:text-accent transition-colors duration-200'
                >
                  {locale === 'el' ? 'Επικοινωνία' : 'Contact'}
                </Link>
              </div>
            </div>
          </div>

          {/* Social Links and Copyright */}
          <div className='border-t border-gray-700 mt-8 pt-8'>
            <div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
              {/* Social Icons */}
              <div className='flex space-x-4'>
                {socialLinks.map(social => (
                  <a
                    key={social.name}
                    href={social.href}
                    className='w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-300 hover:text-accent hover:bg-gray-700 transition-all duration-200'
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>

              {/* Copyright */}
              <div className='text-gray-400 text-center md:text-right'>
                <p>
                  &copy; {currentYear} RentRibAthens.{' '}
                  {locale === 'el'
                    ? 'Όλα τα δικαιώματα διατηρούνται.'
                    : 'All rights reserved.'}
                </p>
                <p className='text-sm mt-1'>
                  {locale === 'el'
                    ? 'Αναπτυγμένο με ❤️ απο το'
                    : 'Developed with ❤️ by'}{' '}
                  <a
                    href='https://sefaweb.com'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-accent hover:text-accent/80 transition-colors duration-200'
                  >
                    SEFAWEB
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
