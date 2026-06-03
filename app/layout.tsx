import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

// Root layout - minimal, most content is in [locale]/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  ),
  title: {
    template: '%s | RentRibAthens',
    default: 'RentRibAthens',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Middleware handles redirecting to /el or /en
  // This layout is minimal since locale-specific layouts handle most of the work
  return (
    <html>
      <body className={`${roboto.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
