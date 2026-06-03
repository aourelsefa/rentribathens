import Script from 'next/script';
import { Locale, getTranslations } from '@/lib/i18n';

interface StructuredDataProps {
  locale: Locale;
  businessName?: string;
  businessAddress?: string;
  businessPhone?: string;
  businessUrl?: string;
  additionalServices?: Array<{
    name: string;
    description: string;
  }>;
}

export default function StructuredData({
  locale,
  businessName,
  businessAddress: _businessAddress = 'Λαγονήσι, Αττική, Ελλάδα',
  businessPhone = process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+306978277120',
  businessUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rentribathens.gr',
  additionalServices = [],
}: StructuredDataProps) {
  const t = getTranslations(locale);
  const sd = t('structuredData');

  const businessNameFinal = businessName || sd.businessName;
  const businessDescription = sd.businessDescription;
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${businessUrl}#business`,
    name: businessNameFinal,
    alternateName: 'RentRibAthens',
    description: businessDescription,
    url: businessUrl,
    logo: `${businessUrl}/rib/rra.png`,
    image: `${businessUrl}/og-image.png`,
    telephone: businessPhone,
    email: 'info@rentribathens.gr',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Λαγονήσι',
      addressLocality: 'Αττική',
      addressRegion: 'Αττική',
      addressCountry: 'GR',
      postalCode: '19010',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '37.9755',
      longitude: '23.7348',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '08:00',
        closes: '20:00',
      },
    ],
    priceRange: '€€',
    paymentAccepted: ['Cash', 'Credit Card', 'Bank Transfer'],
    currenciesAccepted: 'EUR',
    languages: ['Greek', 'English'],
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: '37.9755',
        longitude: '23.7348',
      },
      geoRadius: '50000',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'RIB Boat Rental Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: sd.service1Name,
            description: sd.service1Description,
            provider: {
              '@type': 'LocalBusiness',
              name: businessNameFinal,
              telephone: businessPhone,
              url: businessUrl,
            },
            areaServed: {
              '@type': 'Place',
              name: sd.areaServed,
            },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: sd.service2Name,
            description: sd.service2Description,
            provider: {
              '@type': 'LocalBusiness',
              name: businessNameFinal,
              telephone: businessPhone,
              url: businessUrl,
            },
            areaServed: {
              '@type': 'Place',
              name: sd.areaServed,
            },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: sd.service3Name,
            description: sd.service3Description,
            provider: {
              '@type': 'LocalBusiness',
              name: businessNameFinal,
              telephone: businessPhone,
              url: businessUrl,
            },
            areaServed: {
              '@type': 'Place',
              name: sd.areaServed,
            },
          },
        },
        // Add additional services if provided
        ...additionalServices.map(service => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: service.name,
            description: service.description,
            provider: {
              '@type': 'LocalBusiness',
              name: businessNameFinal,
              telephone: businessPhone,
              url: businessUrl,
            },
          },
        })),
      ],
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: businessPhone,
        contactType: 'customer service',
        availableLanguage: ['Greek', 'English'],
        areaServed: 'GR',
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ],
          opens: '08:00',
          closes: '20:00',
        },
      },
      {
        '@type': 'ContactPoint',
        email: 'info@rentribathens.gr',
        contactType: 'customer service',
        availableLanguage: ['Greek', 'English'],
        areaServed: 'GR',
      },
    ],
    sameAs: [
      'https://www.facebook.com/rentribathens',
      'https://www.instagram.com/rentribathens',
      'https://www.youtube.com/rentribathens',
    ],
    foundingDate: '2020',
    knowsAbout: [
      'RIB Boat Rental',
      'Saronic Gulf Tours',
      'Marine Transportation',
      'Boat Safety',
      'Greek Islands',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1',
    },
    review: [
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
        author: {
          '@type': 'Person',
          name: sd.reviewAuthor,
        },
        reviewBody: sd.reviewBody,
        datePublished: '2024-01-15',
      },
    ],
  };

  return (
    <Script
      id='structured-data'
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2),
      }}
    />
  );
}
