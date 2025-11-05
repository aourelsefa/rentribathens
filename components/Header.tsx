'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NavLink from './NavLink';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { href: '/', label: 'Αρχική' },
    { href: '/fleet', label: 'Στόλος' },
    { href: '/services', label: 'Υπηρεσίες' },
    { href: '/contact', label: 'Επικοινωνία' },
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

            {/* Phone CTA Button - Always visible */}
            <div className='flex items-center space-x-4'>
              <a
                href='tel:+306978277120'
                className='bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200 flex items-center space-x-2 text-sm md:text-base'
              >
                <span>📞</span>
                <span className='hidden sm:inline'>Κλείσε τώρα</span>
                <span className='sm:hidden'>Τηλέφωνο</span>
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
