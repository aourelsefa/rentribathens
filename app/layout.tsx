import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import Layout from '@/components/Layout';
import StructuredData from '@/components/StructuredData';
import './globals.css';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'RentRibAthens - Ενοικίαση RIB στη Αθήνα',
    template: '%s | RentRibAthens'
  },
  description: 'Ενοικίαση RIB σκαφών για περιηγήσεις στον Σαρωνικό και τις ακτές της Αθήνας. Ασφαλείς και άνετες εκδρομές με επαγγελματική εξυπηρέτηση.',
  keywords: ['RIB', 'ενοικίαση', 'Αθήνα', 'Σαρωνικός', 'περιηγήσεις', 'σκάφη', 'θαλάσσια εκδρομές', 'Λαγονήσι', 'boat rental', 'Athens', 'Greece'],
  authors: [{ name: 'RentRibAthens' }],
  creator: 'RentRibAthens',
  publisher: 'RentRibAthens',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'el_GR',
    alternateLocale: 'en_US',
    url: '/',
    siteName: 'RentRibAthens',
    title: 'RentRibAthens - Ενοικίαση RIB στη Αθήνα',
    description: 'Ενοικίαση RIB σκαφών για περιηγήσεις στον Σαρωνικό και τις ακτές της Αθήνας. Ασφαλείς και άνετες εκδρομές με επαγγελματική εξυπηρέτηση.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'RentRibAthens - Ενοικίαση RIB στη Αθήνα',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RentRibAthens - Ενοικίαση RIB στη Αθήνα',
    description: 'Ενοικίαση RIB σκαφών για περιηγήσεις στον Σαρωνικό και τις ακτές της Αθήνας',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  category: 'travel',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="el">
      <body className={`${roboto.variable} font-sans antialiased`}>
        <StructuredData />
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
