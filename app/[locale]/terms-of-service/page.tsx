import type { Metadata } from 'next';
import { Locale, getTranslations } from '@/lib/i18n';
import Link from 'next/link';

interface TermsOfServicePageProps {
  params: { locale: Locale };
}

export async function generateMetadata({
  params,
}: TermsOfServicePageProps): Promise<Metadata> {
  const t = getTranslations(params.locale);
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://rentribathens.gr';

  return {
    title: t('gdpr.termsOfService') as string,
    description:
      params.locale === 'el'
        ? 'Όροι Χρήσης - RentRibAthens'
        : 'Terms of Service - RentRibAthens',
    alternates: {
      canonical:
        params.locale === 'el'
          ? `${siteUrl}/terms-of-service`
          : `${siteUrl}/en/terms-of-service`,
      languages: {
        el: '/terms-of-service',
        en: '/en/terms-of-service',
        'x-default': '/terms-of-service',
      },
    },
  };
}

export default function TermsOfServicePage({
  params,
}: TermsOfServicePageProps) {
  const { locale } = params;
  const isGreek = locale === 'el';

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='section-padding py-16'>
        <div className='container-custom max-w-4xl'>
          <Link
            href={locale === 'el' ? '/' : '/en'}
            className='inline-flex items-center text-primary hover:text-primary/80 mb-8 transition-colors'
          >
            <svg
              className='w-5 h-5 mr-2'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M10 19l-7-7m0 0l7-7m-7 7h18'
              />
            </svg>
            {isGreek ? 'Πίσω στην Αρχική' : 'Back to Home'}
          </Link>

          <h1 className='text-4xl font-bold mb-8'>
            {isGreek ? 'Όροι Χρήσης' : 'Terms of Service'}
          </h1>

          <div className='prose prose-lg max-w-none bg-white p-8 rounded-lg shadow-sm'>
            <p className='text-gray-600 mb-6'>
              <strong>Τελευταία ενημέρωση:</strong>{' '}
              {new Date().toLocaleDateString('el-GR')}
              <br />
              <strong>Last updated:</strong>{' '}
              {new Date().toLocaleDateString('en-US')}
            </p>

            {isGreek ? (
              <>
                <section className='mb-8'>
                  <h2 className='text-2xl font-semibold mb-4'>
                    1. Αποδοχή των Όρων
                  </h2>
                  <p className='mb-4'>
                    Με την πρόσβαση και τη χρήση του ιστότοπου RentRibAthens,
                    αποδέχεστε αυτούς τους Όρους Χρήσης. Εάν δεν συμφωνείτε με
                    οποιονδήποτε από αυτούς τους όρους, παρακαλούμε να μην
                    χρησιμοποιείτε τον ιστότοπο.
                  </p>
                </section>

                <section className='mb-8'>
                  <h2 className='text-2xl font-semibold mb-4'>2. Υπηρεσίες</h2>
                  <p className='mb-4'>
                    Η RentRibAthens προσφέρει υπηρεσίες ενοικίασης RIB σκαφών,
                    κρουαζιέρων και μεταφορών στον Σαρωνικό κόλπο. Οι υπηρεσίες
                    μας περιλαμβάνουν:
                  </p>
                  <ul className='list-disc pl-6 mb-4'>
                    <li>Ενοικίαση σκαφών με ή χωρίς πλήρωμα</li>
                    <li>Οργανωμένες κρουαζιέρες</li>
                    <li>Μεταφορές σε νησιά και παραλίες</li>
                  </ul>
                </section>

                <section className='mb-8'>
                  <h2 className='text-2xl font-semibold mb-4'>3. Κρατήσεις</h2>
                  <h3 className='text-xl font-semibold mb-2'>
                    3.1 Διαδικασία Κράτησης
                  </h3>
                  <p className='mb-4'>
                    Οι κρατήσεις γίνονται μέσω τηλεφώνου, email ή φόρμας
                    επικοινωνίας. Η επιβεβαίωση της κράτησης απαιτεί προκαταβολή
                    ή πλήρη πληρωμή, ανάλογα με τη συμφωνία.
                  </p>

                  <h3 className='text-xl font-semibold mb-2'>3.2 Ακύρωση</h3>
                  <p className='mb-4'>
                    Οι ακυρώσεις πρέπει να γίνονται τουλάχιστον 48 ώρες πριν από
                    την προγραμματισμένη ημερομηνία. Οι ακυρώσεις που γίνονται
                    λιγότερο από 48 ώρες πριν μπορεί να επιβαρυνθούν με χρέωση.
                  </p>
                </section>

                <section className='mb-8'>
                  <h2 className='text-2xl font-semibold mb-4'>
                    4. Ευθύνες και Περιορισμοί
                  </h2>
                  <p className='mb-4'>Οι πελάτες είναι υπεύθυνοι για:</p>
                  <ul className='list-disc pl-6 mb-4'>
                    <li>Τη συμμόρφωση με όλους τους κανόνες ασφαλείας</li>
                    <li>Τη χρήση του σκάφους σύμφωνα με τις οδηγίες</li>
                    <li>
                      Τη φροντίδα του σκάφους κατά τη διάρκεια της ενοικίασης
                    </li>
                    <li>Τη κάλυψη οποιασδήποτε ζημιάς ή βλάβης</li>
                  </ul>
                </section>

                <section className='mb-8'>
                  <h2 className='text-2xl font-semibold mb-4'>5. Ασφάλεια</h2>
                  <p className='mb-4'>
                    Όλοι οι επιβάτες πρέπει να φορούν σωσίβια και να ακολουθούν
                    όλες τις οδηγίες ασφαλείας. Η RentRibAthens δεν φέρει ευθύνη
                    για τραυματισμούς ή ατυχήματα που προκύπτουν από την
                    παραβίαση κανόνων ασφαλείας.
                  </p>
                </section>

                <section className='mb-8'>
                  <h2 className='text-2xl font-semibold mb-4'>6. Πληρωμές</h2>
                  <p className='mb-4'>
                    Οι πληρωμές γίνονται με μετρητά, πιστωτική/χρεωστική κάρτα ή
                    τραπεζική μεταφορά. Οι τιμές είναι σε ευρώ και μπορεί να
                    αλλάξουν χωρίς προειδοποίηση.
                  </p>
                </section>

                <section className='mb-8'>
                  <h2 className='text-2xl font-semibold mb-4'>
                    7. Καιρικές Συνθήκες
                  </h2>
                  <p className='mb-4'>
                    Σε περίπτωση άσχημων καιρικών συνθηκών που καθιστούν την
                    εκδρομή επικίνδυνη, η RentRibAthens διατηρεί το δικαίωμα να
                    ακυρώσει την εκδρομή. Σε αυτή την περίπτωση, θα γίνει
                    επιστροφή χρημάτων ή αναπρογραμματισμός.
                  </p>
                </section>

                <section className='mb-8'>
                  <h2 className='text-2xl font-semibold mb-4'>
                    8. Δικαιώματα Ιδιοκτησίας
                  </h2>
                  <p className='mb-4'>
                    Όλο το περιεχόμενο του ιστότοπου, συμπεριλαμβανομένων των
                    λογοτύπων, εικόνων και κειμένων, είναι ιδιοκτησία της
                    RentRibAthens και προστατεύεται από πνευματικά δικαιώματα.
                  </p>
                </section>

                <section className='mb-8'>
                  <h2 className='text-2xl font-semibold mb-4'>
                    9. Αλλαγές στους Όρους
                  </h2>
                  <p className='mb-4'>
                    Διατηρούμε το δικαίωμα να τροποποιούμε αυτούς τους Όρους
                    Χρήσης ανά πάσα στιγμή. Οι αλλαγές θα δημοσιεύονται σε αυτή
                    τη σελίδα.
                  </p>
                </section>

                <section className='mb-8'>
                  <h2 className='text-2xl font-semibold mb-4'>
                    10. Επικοινωνία
                  </h2>
                  <p className='mb-4'>
                    Για ερωτήσεις σχετικά με αυτούς τους Όρους Χρήσης,
                    επικοινωνήστε μαζί μας:
                  </p>
                  <ul className='list-none pl-0 mb-4'>
                    <li>
                      <strong>Email:</strong>{' '}
                      <a
                        href='mailto:info@rentribathens.gr'
                        className='text-primary hover:underline'
                      >
                        info@rentribathens.gr
                      </a>
                    </li>
                    <li>
                      <strong>Τηλέφωνο:</strong>{' '}
                      <a
                        href='tel:+306978277120'
                        className='text-primary hover:underline'
                      >
                        +30 697 827 7120
                      </a>
                    </li>
                  </ul>
                </section>
              </>
            ) : (
              <>
                <section className='mb-8'>
                  <h2 className='text-2xl font-semibold mb-4'>
                    1. Acceptance of Terms
                  </h2>
                  <p className='mb-4'>
                    By accessing and using the RentRibAthens website, you accept
                    these Terms of Service. If you do not agree with any of
                    these terms, please do not use the website.
                  </p>
                </section>

                <section className='mb-8'>
                  <h2 className='text-2xl font-semibold mb-4'>2. Services</h2>
                  <p className='mb-4'>
                    RentRibAthens offers RIB boat rental, cruise, and transfer
                    services in the Saronic Gulf. Our services include:
                  </p>
                  <ul className='list-disc pl-6 mb-4'>
                    <li>Boat rental with or without crew</li>
                    <li>Organized cruises</li>
                    <li>Transfers to islands and beaches</li>
                  </ul>
                </section>

                <section className='mb-8'>
                  <h2 className='text-2xl font-semibold mb-4'>3. Bookings</h2>
                  <h3 className='text-xl font-semibold mb-2'>
                    3.1 Booking Process
                  </h3>
                  <p className='mb-4'>
                    Bookings are made via phone, email, or contact form. Booking
                    confirmation requires a deposit or full payment, depending
                    on the agreement.
                  </p>

                  <h3 className='text-xl font-semibold mb-2'>
                    3.2 Cancellation
                  </h3>
                  <p className='mb-4'>
                    Cancellations must be made at least 48 hours before the
                    scheduled date. Cancellations made less than 48 hours in
                    advance may be subject to charges.
                  </p>
                </section>

                <section className='mb-8'>
                  <h2 className='text-2xl font-semibold mb-4'>
                    4. Responsibilities and Limitations
                  </h2>
                  <p className='mb-4'>Customers are responsible for:</p>
                  <ul className='list-disc pl-6 mb-4'>
                    <li>Compliance with all safety rules</li>
                    <li>Using the boat according to instructions</li>
                    <li>Taking care of the boat during the rental period</li>
                    <li>Covering any damage or loss</li>
                  </ul>
                </section>

                <section className='mb-8'>
                  <h2 className='text-2xl font-semibold mb-4'>5. Safety</h2>
                  <p className='mb-4'>
                    All passengers must wear life jackets and follow all safety
                    instructions. RentRibAthens is not responsible for injuries
                    or accidents resulting from violation of safety rules.
                  </p>
                </section>

                <section className='mb-8'>
                  <h2 className='text-2xl font-semibold mb-4'>6. Payments</h2>
                  <p className='mb-4'>
                    Payments are made by cash, credit/debit card, or bank
                    transfer. Prices are in euros and may change without notice.
                  </p>
                </section>

                <section className='mb-8'>
                  <h2 className='text-2xl font-semibold mb-4'>
                    7. Weather Conditions
                  </h2>
                  <p className='mb-4'>
                    In case of bad weather conditions that make the trip
                    dangerous, RentRibAthens reserves the right to cancel the
                    trip. In this case, a refund or rescheduling will be
                    provided.
                  </p>
                </section>

                <section className='mb-8'>
                  <h2 className='text-2xl font-semibold mb-4'>
                    8. Intellectual Property
                  </h2>
                  <p className='mb-4'>
                    All content on the website, including logos, images, and
                    text, is the property of RentRibAthens and is protected by
                    copyright.
                  </p>
                </section>

                <section className='mb-8'>
                  <h2 className='text-2xl font-semibold mb-4'>
                    9. Changes to Terms
                  </h2>
                  <p className='mb-4'>
                    We reserve the right to modify these Terms of Service at any
                    time. Changes will be posted on this page.
                  </p>
                </section>

                <section className='mb-8'>
                  <h2 className='text-2xl font-semibold mb-4'>10. Contact</h2>
                  <p className='mb-4'>
                    For questions about these Terms of Service, please contact
                    us:
                  </p>
                  <ul className='list-none pl-0 mb-4'>
                    <li>
                      <strong>Email:</strong>{' '}
                      <a
                        href='mailto:info@rentribathens.gr'
                        className='text-primary hover:underline'
                      >
                        info@rentribathens.gr
                      </a>
                    </li>
                    <li>
                      <strong>Phone:</strong>{' '}
                      <a
                        href='tel:+306978277120'
                        className='text-primary hover:underline'
                      >
                        +30 697 827 7120
                      </a>
                    </li>
                  </ul>
                </section>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
