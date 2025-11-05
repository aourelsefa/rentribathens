import Script from 'next/script';

interface StructuredDataProps {
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
  businessName = 'Ενοικίαση Σκαφών Λαγονήσι',
  businessAddress: _businessAddress = 'Λαγονήσι, Αττική, Ελλάδα',
  businessPhone = process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+306978277120',
  businessUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rentribathens.gr',
  additionalServices = [],
}: StructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${businessUrl}#business`,
    name: businessName,
    alternateName: 'RentRibAthens',
    description:
      'Ενοικίαση RIB σκαφών στην Αθήνα για περιηγήσεις στον Σαρωνικό και τις ακτές της Αθήνας',
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
            name: 'Ενοικίαση RIB Σκαφών',
            description:
              'Ενοικίαση RIB σκαφών για περιηγήσεις στον Σαρωνικό. Διαθέτουμε ποικιλία μεγέθους και χωρητικότητας για κάθε ανάγκη.',
            provider: {
              '@type': 'LocalBusiness',
              name: businessName,
              telephone: businessPhone,
              url: businessUrl,
            },
            areaServed: {
              '@type': 'Place',
              name: 'Σαρωνικός κόλπος, Αθήνα',
            },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Κρουαζιέρες Σαρωνικού',
            description:
              'Οργανωμένες κρουαζιέρες σε όμορφα μέρη του Σαρωνικού. Ανακαλύψτε κρυμμένα κολπάκια και παραλίες που είναι προσβάσιμες μόνο από τη θάλασσα.',
            provider: {
              '@type': 'LocalBusiness',
              name: businessName,
              telephone: businessPhone,
              url: businessUrl,
            },
            areaServed: {
              '@type': 'Place',
              name: 'Σαρωνικός κόλπος, Αθήνα',
            },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Μεταφορές Νησιών',
            description:
              'Μεταφορές σε νησιά και παραλίες του Σαρωνικού. Γρήγορη και ασφαλής μεταφορά με τα σκάφη μας.',
            provider: {
              '@type': 'LocalBusiness',
              name: businessName,
              telephone: businessPhone,
              url: businessUrl,
            },
            areaServed: {
              '@type': 'Place',
              name: 'Σαρωνικός κόλπος, Αθήνα',
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
              name: businessName,
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
          name: 'Μαρία Παπαδοπούλου',
        },
        reviewBody:
          'Εξαιρετική εμπειρία! Το σκάφος ήταν καθαρό, ο κάπετανος πολύ επαγγελματίας και η διαδρομή υπέροχη.',
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
