import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import Layout from '@/components/Layout';
import StructuredData from '@/components/StructuredData';
import '../globals.css';
import { isValidLocale } from '@/lib/i18n';
import { notFound } from 'next/navigation';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

// Metadata will be generated per page
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  ),
  title: {
    template: '%s | RentRibAthens',
    default: 'RentRibAthens',
  },
};

export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
  // Validate locale
  if (!isValidLocale(params.locale)) {
    notFound();
  }

  const locale = params.locale;
  const lang = locale === 'el' ? 'el' : 'en';

  return (
    <html lang={lang}>
      <body className={`${roboto.variable} font-sans antialiased`}>
        <StructuredData locale={locale} />
        <Layout locale={locale}>{children}</Layout>
      </body>
    </html>
  );
}
