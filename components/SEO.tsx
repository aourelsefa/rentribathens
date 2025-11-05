import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  openGraphImage?: string;
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
  ogType?: 'website' | 'article' | 'product';
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  author?: string;
}

export default function SEO({
  title = 'RentRibAthens - Ενοικίαση RIB στη Αθήνα',
  description = 'Ενοικίαση RIB σκαφών για περιηγήσεις στον Σαρωνικό και τις ακτές της Αθήνας. Ασφαλείς και άνετες εκδρομές με επαγγελματική εξυπηρέτηση.',
  openGraphImage = '/og-image.png',
  canonical,
  noindex = false,
  nofollow = false,
  ogType = 'website',
  publishedTime,
  modifiedTime,
  section,
  tags,
  author = 'RentRibAthens',
}: SEOProps) {
  const fullTitle = title.includes('RentRibAthens') ? title : `${title} | RentRibAthens`;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rentribathens.gr';
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl;
  const fullOgImage = openGraphImage.startsWith('http') ? openGraphImage : `${siteUrl}${openGraphImage}`;
  const businessPhone = process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+306978277120';

  // Twitter handle (if available)
  const twitterHandle = '@rentribathens';

  // Robots meta
  const robotsMeta = [];
  if (noindex) robotsMeta.push('noindex');
  if (nofollow) robotsMeta.push('nofollow');
  if (robotsMeta.length === 0) robotsMeta.push('index', 'follow');

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="RIB, ενοικίαση, Αθήνα, Σαρωνικός, περιηγήσεις, σκάφη, θαλάσσια εκδρομές, Λαγονήσι, boat rental, Athens, Greece" />
      <meta name="author" content={author} />
      <meta name="robots" content={robotsMeta.join(', ')} />
      <meta name="language" content="Greek" />
      <meta name="revisit-after" content="7 days" />
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />

      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonical} />

      {/* Enhanced Open Graph Meta Tags */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:site_name" content="RentRibAthens" />
      <meta property="og:locale" content="el_GR" />
      <meta property="og:locale:alternate" content="en_US" />
      
      {/* Business specific Open Graph tags */}
      <meta property="og:email" content="info@rentribathens.gr" />
      <meta property="og:phone_number" content={businessPhone} />
      <meta property="og:latitude" content="37.9755" />
      <meta property="og:longitude" content="23.7348" />
      <meta property="og:street-address" content="Λαγονήσι" />
      <meta property="og:locality" content="Αττική" />
      <meta property="og:region" content="Αττική" />
      <meta property="og:postal-code" content="19010" />
      <meta property="og:country-name" content="Greece" />

      {/* Article specific Open Graph tags */}
      {ogType === 'article' && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {author && <meta property="article:author" content={author} />}
          {section && <meta property="article:section" content={section} />}
          {tags && tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Enhanced Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:domain" content="rentribathens.gr" />

      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#0B3D91" />
      <meta name="msapplication-TileColor" content="#0B3D91" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="RentRibAthens" />
      
      {/* iOS specific */}
      <meta name="apple-itunes-app" content="app-id=your-app-id" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Windows specific */}
      <meta name="msapplication-navbutton-color" content="#0B3D91" />
      <meta name="msapplication-TileImage" content="/mstile-144x144.png" />

      {/* Favicon and Icons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      
      {/* Geo tags for local SEO */}
      <meta name="geo.region" content="GR-ATT" />
      <meta name="geo.placename" content="Λαγονήσι, Αττική" />
      <meta name="geo.position" content="37.9755;23.7348" />
      <meta name="ICBM" content="37.9755, 23.7348" />

      {/* Additional SEO Meta Tags */}
      <meta name="format-detection" content="telephone=yes" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="application-name" content="RentRibAthens" />
      <meta name="msapplication-tooltip" content="Ενοικίαση RIB σκαφών στην Αθήνα" />
      <meta name="msapplication-starturl" content="/" />
      
      {/* Verification tags (add when you have them) */}
      {/* <meta name="google-site-verification" content="your-google-verification-code" /> */}
      {/* <meta name="bing-site-verification" content="your-bing-verification-code" /> */}
    </Head>
  );
}
