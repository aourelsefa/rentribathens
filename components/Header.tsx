'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import NavLink from './NavLink';
import { Locale, getTranslations } from '@/lib/i18n';

// Greek Flag SVG
const GreekFlag = ({ className }: { className?: string }) => (
  <svg
    viewBox='0 0 18 12'
    className={className}
    xmlns='http://www.w3.org/2000/svg'
    preserveAspectRatio='none'
  >
    {/* Blue background */}
    <rect width='18' height='12' fill='#0D5EAF' />
    {/* White stripes (5 horizontal) */}
    <rect width='18' height='1.2' fill='#FFFFFF' y='2.4' />
    <rect width='18' height='1.2' fill='#FFFFFF' y='4.8' />
    <rect width='18' height='1.2' fill='#FFFFFF' y='7.2' />
    <rect width='18' height='1.2' fill='#FFFFFF' y='9.6' />
    {/* Blue canton in top-left */}
    <rect width='7' height='7' fill='#0D5EAF' />
    {/* White cross in canton */}
    <rect x='2.33' width='2.33' height='7' fill='#FFFFFF' />
    <rect y='2.33' width='7' height='2.33' fill='#FFFFFF' />
  </svg>
);

// British Flag (Union Jack) SVG
const BritishFlag = ({ className }: { className?: string }) => (
  <svg
    viewBox='0 0 60 30'
    className={className}
    xmlns='http://www.w3.org/2000/svg'
    preserveAspectRatio='none'
  >
    {/* Blue background */}
    <rect width='60' height='30' fill='#012169' />
    {/* White diagonal stripes (St. Andrew's Cross) */}
    <path d='M0,0 L60,30 M60,0 L0,30' stroke='#FFFFFF' strokeWidth='4' />
    {/* Red diagonal stripes */}
    <path d='M0,0 L60,30 M60,0 L0,30' stroke='#C8102E' strokeWidth='2' />
    {/* White horizontal stripe (St. George's Cross) */}
    <rect y='13' width='60' height='4' fill='#FFFFFF' />
    {/* White vertical stripe */}
    <rect x='28' width='4' height='30' fill='#FFFFFF' />
    {/* Red horizontal stripe */}
    <rect y='14' width='60' height='2' fill='#C8102E' />
    {/* Red vertical stripe */}
    <rect x='29' width='2' height='30' fill='#C8102E' />
  </svg>
);

interface HeaderProps {
  locale: Locale;
}

export default function Header({ locale }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const t = getTranslations(locale);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Navigation items - Greek uses root paths, English uses /en prefix
  const navItems = [
    { href: locale === 'el' ? '/' : '/en', label: t('nav.home') },
    { href: locale === 'el' ? '/fleet' : '/en/fleet', label: t('nav.fleet') },
    {
      href: locale === 'el' ? '/services' : '/en/services',
      label: t('nav.services'),
    },
    {
      href: locale === 'el' ? '/contact' : '/en/contact',
      label: t('nav.contact'),
    },
  ];

  return (
    <>
      {/* Skip to content link for accessibility */}
      <a
        href='#main-content'
        className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded-md z-50'
      >
        Πήγαινε στο κύριο περιεχόμενο
      </a>

      <header className='bg-white shadow-sm sticky top-0 z-40'>
        <div className='container-custom'>
          <div className='flex items-center justify-between h-16 md:h-20'>
            {/* Logo */}
            <Link href='/' className='flex items-center'>
              <Image
                src='/rib/rra.png'
                alt='RentRibAthens Logo'
                width={200}
                height={200}
                className='h-12 md:h-14 w-auto object-contain'
                priority
                quality={100}
                unoptimized={true}
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className='hidden md:flex items-center space-x-8'>
              {navItems.map(item => (
                <NavLink key={item.href} href={item.href}>
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* Phone CTA Button & Language Switcher - Always visible */}
            <div className='flex items-center space-x-3'>
              {/* Language Switcher */}
              <div className='flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm'>
                <button
                  onClick={() => {
                    if (locale !== 'el') {
                      const newPathname = pathname.replace('/en', '') || '/';
                      router.push(newPathname);
                    }
                  }}
                  className={`flex items-center space-x-2 px-3 py-2 transition-all duration-200 ${
                    locale === 'el'
                      ? 'bg-primary/10 ring-2 ring-primary'
                      : 'text-gray-700 hover:bg-gray-50 opacity-70 hover:opacity-100'
                  }`}
                  aria-label='Switch to Greek'
                  title='Switch to Greek'
                >
                  <GreekFlag className='w-6 h-4 rounded shadow-sm' />
                  <span className='hidden sm:inline text-sm font-medium'>
                    GR
                  </span>
                </button>
                <div className='w-px h-6 bg-gray-200'></div>
                <button
                  onClick={() => {
                    if (locale !== 'en') {
                      const newPathname = `/en${pathname === '/' ? '' : pathname}`;
                      router.push(newPathname);
                    }
                  }}
                  className={`flex items-center space-x-2 px-3 py-2 transition-all duration-200 ${
                    locale === 'en'
                      ? 'bg-primary/10 ring-2 ring-primary'
                      : 'text-gray-700 hover:bg-gray-50 opacity-70 hover:opacity-100'
                  }`}
                  aria-label='Switch to English'
                  title='Switch to English'
                >
                  <BritishFlag className='w-6 h-4 rounded shadow-sm' />
                  <span className='hidden sm:inline text-sm font-medium'>
                    GB
                  </span>
                </button>
              </div>

              <a
                href='tel:+306978277120'
                className='bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200 flex items-center space-x-2 text-sm md:text-base'
              >
                <span>📞</span>
                <span className='hidden sm:inline'>{t('common.callNow')}</span>
                <span className='sm:hidden'>{t('common.phone')}</span>
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className='md:hidden p-2 rounded-lg text-gray-700 hover:text-primary hover:bg-gray-100 transition-colors duration-200'
                aria-label='Άνοιγμα/Κλείσιμο μενού'
                aria-expanded={isMobileMenuOpen}
              >
                <svg
                  className='w-6 h-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M6 18L18 6M6 6l12 12'
                    />
                  ) : (
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M4 6h16M4 12h16M4 18h16'
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className='md:hidden border-t border-gray-200 bg-white'>
              <nav className='py-4 space-y-2'>
                {navItems.map(item => (
                  <NavLink
                    key={item.href}
                    href={item.href}
                    className='block px-4 py-2 text-lg'
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
