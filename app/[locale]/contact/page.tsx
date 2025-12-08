import ContactForm from '@/components/ContactForm';
import { Metadata } from 'next';
import { Locale } from '@/lib/i18n';

interface ContactPageProps {
  params: { locale: Locale };
}

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://rentribathens.gr';
  const title = params.locale === 'el' ? 'Επικοινωνία' : 'Contact';
  const description =
    params.locale === 'el'
      ? 'Επικοινωνήστε μαζί μας για κράτηση RIB σκαφών. Τηλέφωνο: +30 697 827 7120. Διεύθυνση: Λαγονήσι, Αττική. Άμεση εξυπηρέτηση.'
      : 'Contact us to book RIB boats. Phone: +30 697 827 7120. Address: Lagonisi, Attica. Immediate service.';
  const canonicalPath = params.locale === 'el' ? '/contact' : '/en/contact';

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
      languages: {
        el: '/contact',
        en: '/en/contact',
        'x-default': '/contact',
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}${canonicalPath}`,
      siteName: 'RentRibAthens',
      locale: params.locale === 'el' ? 'el_GR' : 'en_US',
      alternateLocale: params.locale === 'el' ? 'en_US' : 'el_GR',
      type: 'website',
    },
  };
}

export default function ContactPage({ params }: ContactPageProps) {
  const { locale } = params;

  const contactInfo = [
    {
      title: locale === 'el' ? 'Τηλέφωνο' : 'Phone',
      description:
        locale === 'el'
          ? 'Καλέστε μας για άμεση κράτηση'
          : 'Call us for immediate booking',
      icon: <span className='text-2xl'>📞</span>,
      details: [
        '+30 697 827 7120',
        locale === 'el'
          ? 'Διαθέσιμοι 08:00 - 20:00'
          : 'Available 08:00 - 20:00',
        locale === 'el' ? 'Άμεση απάντηση' : 'Immediate response',
      ],
    },
    {
      title: 'Email',
      description:
        locale === 'el'
          ? 'Στείλτε μας email για ερωτήσεις'
          : 'Send us an email for questions',
      icon: <span className='text-2xl'>📧</span>,
      details: [
        'info@rentribathens.gr',
        locale === 'el' ? 'Απάντηση εντός 24 ωρών' : 'Response within 24 hours',
        locale === 'el'
          ? 'Για λεπτομερείς πληροφορίες'
          : 'For detailed information',
      ],
    },
    {
      title: locale === 'el' ? 'Διεύθυνση' : 'Address',
      description:
        locale === 'el'
          ? 'Βρείτε μας στη Μαρίνα Λαγονησίου'
          : 'Find us at Lagonisi Marina',
      icon: <span className='text-2xl'>📍</span>,
      details: [
        locale === 'el' ? 'Μαρίνα Λαγονησίου' : 'Lagonisi Marina',
        'Λαγονήσι 190 10, Αττική',
        locale === 'el'
          ? 'Εύκολη πρόσβαση από Αθήνα'
          : 'Easy access from Athens',
      ],
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className='bg-primary text-white'>
        <div className='section-padding'>
          <div className='container-custom'>
            <div className='text-center max-w-4xl mx-auto'>
              <h1 className='text-4xl md:text-5xl font-bold mb-6'>
                {locale === 'el' ? 'Επικοινωνία' : 'Contact'}
              </h1>
              <p className='text-xl md:text-2xl mb-8 opacity-90'>
                {locale === 'el'
                  ? 'Επικοινωνήστε μαζί μας για να κλείσετε την εκδρομή σας'
                  : 'Contact us to book your trip'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className='section-padding'>
        <div className='container-custom'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
              {locale === 'el'
                ? 'Πληροφορίες Επικοινωνίας'
                : 'Contact Information'}
            </h2>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
              {locale === 'el'
                ? 'Επικοινωνήστε μαζί μας με οποιονδήποτε τρόπο σας βολεύει'
                : 'Contact us in whatever way is convenient for you'}
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-8 mb-16'>
            {contactInfo.map((info, index) => (
              <div key={index} className='text-center'>
                <div className='w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4'>
                  <span className='text-white text-2xl'>{info.icon}</span>
                </div>
                <h3 className='text-xl font-semibold mb-2'>{info.title}</h3>
                <p className='text-gray-600 mb-4'>{info.description}</p>
                <ul className='space-y-1'>
                  {info.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className='text-gray-700'>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className='section-padding bg-muted'>
        <div className='container-custom'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
              {locale === 'el' ? 'Στείλτε μας Μήνυμα' : 'Send us a Message'}
            </h2>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
              {locale === 'el'
                ? 'Συμπληρώστε τη φόρμα και θα επικοινωνήσουμε μαζί σας άμεσα'
                : 'Fill out the form and we will contact you immediately'}
            </p>
          </div>

          <ContactForm locale={locale} />
        </div>
      </section>
    </>
  );
}
