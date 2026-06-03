import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import FloatingContactButton from './FloatingContactButton';
import { Locale } from '@/lib/i18n';

interface LayoutProps {
  children: ReactNode;
  locale: Locale;
}

export default function Layout({ children, locale }: LayoutProps) {
  return (
    <div className='min-h-screen bg-background flex flex-col'>
      <Header locale={locale} />

      <main id='main-content' className='flex-1'>
        {children}
      </main>

      <Footer locale={locale} />

      {/* Floating Contact Button */}
      <FloatingContactButton locale={locale} />
    </div>
  );
}
