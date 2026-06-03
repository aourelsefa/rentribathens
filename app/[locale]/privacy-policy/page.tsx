import type { Metadata } from 'next';
import { Locale, getTranslations } from '@/lib/i18n';
import Link from 'next/link';

interface PrivacyPolicyPageProps {
  params: { locale: Locale };
}

export async function generateMetadata({
  params,
}: PrivacyPolicyPageProps): Promise<Metadata> {
  const t = getTranslations(params.locale);
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://rentribathens.gr';

  return {
    title: t('gdpr.privacyPolicy') as string,
    description:
      params.locale === 'el'
        ? 'Πολιτική Απορρήτου - RentRibAthens'
        : 'Privacy Policy - RentRibAthens',
    alternates: {
      canonical:
        params.locale === 'el'
          ? `${siteUrl}/privacy-policy`
          : `${siteUrl}/en/privacy-policy`,
      languages: {
        el: '/privacy-policy',
        en: '/en/privacy-policy',
        'x-default': '/privacy-policy',
      },
    },
  };
}

export default function PrivacyPolicyPage({ params }: PrivacyPolicyPageProps) {
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
            {isGreek ? 'Πολιτική Απορρήτου' : 'Privacy Policy'}
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
                  <h2 className='text-2xl font-semibold mb-4'>1. Εισαγωγή</h2>
                  <p className='mb-4'>
                    Η RentRibAthens («εμείς», «μας», «μας») σέβεται την
                    ιδιωτικότητά σας και δεσμεύεται να προστατεύει τα προσωπικά
                    σας δεδομένα. Αυτή η Πολιτική Απορρήτου εξηγεί πώς
                    συλλέγουμε, χρησιμοποιούμε, αποθηκεύουμε και προστατεύουμε
                    τις πληροφορίες σας όταν επισκέπτεστε τον ιστότοπό μας.
                  </p>
                </section>

                <section className='mb-8'>
                  <h2 className='text-2xl font-semibold mb-4'>
                    2. Πληροφορίες που Συλλέγουμε
                  </h2>
                  <h3 className='text-xl font-semibold mb-2'>
                    2.1 Πληροφορίες που Παρέχετε
                  </h3>
                  <ul className='list-disc pl-6 mb-4'>
                    <li>Όνομα και επώνυμο</li>
                    <li>Διεύθυνση email</li>
                    <li>Αριθμός τηλεφώνου</li>
                    <li>Πληροφορίες κράτησης</li>
                    <li>Μηνύματα που στέλνετε μέσω της φόρμας επικοινωνίας</li>
                  </ul>

                  <h3 className='text-xl font-semibold mb-2'>
                    2.2 Πληροφορίες που Συλλέγονται Αυτόματα
                  </h3>
                  <ul className='list-disc pl-6 mb-4'>
                    <li>Διεύθυνση IP</li>
                    <li>Τύπος περιηγητή</li>
                    <li>Σελίδες που επισκέφθηκε</li>
                    <li>Ημερομηνία και ώρα πρόσβασης</li>
                    <li>Cookies (βλέπε Πολιτική Cookies)</li>
                  </ul>
                </section>

                <section className='mb-8'>
                  <h2 className='text-2xl font-semibold mb-4'>
                    3. Πώς Χρησιμοποιούμε τις Πληροφορίες
                  </h2>
                  <p className='mb-4'>
                    Χρησιμοποιούμε τις πληροφορίες που συλλέγουμε για:
                  </p>
                  <ul className='list-disc pl-6 mb-4'>
                    <li>Επεξεργασία και διαχείριση των κρατήσεών σας</li>
                    <li>Επικοινωνία μαζί σας σχετικά με τις υπηρεσίες μας</li>
                    <li>Βελτίωση της εμπειρίας σας στον ιστότοπο</li>
                    <li>
                      Αποστολή ενημερώσεων και προωθητικών μηνυμάτων (με τη
                      συγκατάθεσή σας)
                    </li>
                    <li>Συμμόρφωση με νομικές υποχρεώσεις</li>
                  </ul>
                </section>

                <section className='mb-8'>
                  <h2 className='text-2xl font-semibold mb-4'>
                    4. Κοινοποίηση Πληροφοριών
                  </h2>
                  <p className='mb-4'>
                    Δεν πουλάμε, ενοικιάζουμε ή διανέμουμε τα προσωπικά σας
                    δεδομένα σε τρίτους. Μπορούμε να κοινοποιήσουμε πληροφορίες
                    μόνο σε:
                  </p>
                  <ul className='list-disc pl-6 mb-4'>
                    <li>
                      Πάροχους υπηρεσιών που μας βοηθούν στη λειτουργία του
                      ιστότοπου (π.χ. hosting, email services)
                    </li>
                    <li>Όταν απαιτείται από νόμο ή δικαστική απόφαση</li>
                    <li>
                      Για την προστασία των δικαιωμάτων και της ασφάλειάς μας
                    </li>
                  </ul>
                </section>

                <section className='mb-8'>
                  <h2 className='text-2xl font-semibold mb-4'>
                    5. Ασφάλεια Δεδομένων
                  </h2>
                  <p className='mb-4'>
                    Εφαρμόζουμε κατάλληλα τεχνικά και οργανωτικά μέτρα για την
                    προστασία των προσωπικών σας δεδομένων από μη
                    εξουσιοδοτημένη πρόσβαση, απώλεια, καταστροφή ή αλλαγή.
                  </p>
                </section>

                <section className='mb-8'>
                  <h2 className='text-2xl font-semibold mb-4'>6. Cookies</h2>
                  <p className='mb-4'>
                    Χρησιμοποιούμε cookies στον ιστότοπό μας. Για περισσότερες
                    πληροφορίες, ανατρέξτε στην{' '}
                    <Link
                      href='/cookie-policy'
                      className='text-primary hover:underline'
                    >
                      Πολιτική Cookies
                    </Link>
                    .
                  </p>
                </section>

                <section className='mb-8'>
                  <h2 className='text-2xl font-semibold mb-4'>
                    7. Δικαιώματα σας (GDPR)
                  </h2>
                  <p className='mb-4'>
                    Σύμφωνα με τον Γενικό Κανονισμό Προστασίας Δεδομένων (GDPR),
                    έχετε το δικαίωμα:
                  </p>
                  <ul className='list-disc pl-6 mb-4'>
                    <li>Πρόσβασης στα προσωπικά σας δεδομένα</li>
                    <li>Διόρθωσης ανακριβών δεδομένων</li>
                    <li>Διαγραφής των δεδομένων σας («δικαίωμα λήθης»)</li>
                    <li>Περιορισμού της επεξεργασίας</li>
                    <li>Μεταφοράς δεδομένων</li>
                    <li>Αντίρρησης στην επεξεργασία</li>
                    <li>Απόσυρσης συγκατάθεσης</li>
                  </ul>
                  <p className='mb-4'>
                    Για να ασκήσετε οποιοδήποτε από αυτά τα δικαιώματα,
                    επικοινωνήστε μαζί μας στο:{' '}
                    <a
                      href='mailto:info@rentribathens.gr'
                      className='text-primary hover:underline'
                    >
                      info@rentribathens.gr
                    </a>
                  </p>
                </section>

                <section className='mb-8'>
                  <h2 className='text-2xl font-semibold mb-4'>
                    8. Διάρκεια Διατήρησης Δεδομένων
                  </h2>
                  <p className='mb-4'>
                    Κρατούμε τα προσωπικά σας δεδομένα μόνο για όσο χρόνο είναι
                    απαραίτητο για τους σκοπούς που περιγράφονται σε αυτή την
                    πολιτική, εκτός εάν ο νόμος απαιτεί διατήρηση για μεγαλύτερη
                    περίοδο.
                  </p>
                </section>

                <section className='mb-8'>
                  <h2 className='text-2xl font-semibold mb-4'>
                    9. Αλλαγές στην Πολιτική Απορρήτου
                  </h2>
                  <p className='mb-4'>
                    Μπορούμε να ενημερώσουμε αυτή την Πολιτική Απορρήτου κατά
                    καιρούς. Οι αλλαγές θα δημοσιεύονται σε αυτή τη σελίδα με
                    ενημέρωση της ημερομηνίας «Τελευταία ενημέρωση».
                  </p>
                </section>

                <section className='mb-8'>
                  <h2 className='text-2xl font-semibold mb-4'>
                    10. Επικοινωνία
                  </h2>
                  <p className='mb-4'>
                    Για ερωτήσεις ή ανησυχίες σχετικά με αυτή την Πολιτική
                    Απορρήτου, επικοινωνήστε μαζί μας:
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
                    <li>
                      <strong>Διεύθυνση:</strong> Λαγονήσι, Αττική, Ελλάδα
                    </li>
                  </ul>
                </section>
              </>
            ) : (
              <>
                <section className='mb-8'>
                  <h2 className='text-2xl font-semibold mb-4'>
                    1. Introduction
                  </h2>
                  <p className='mb-4'>
                    RentRibAthens («we», «us», «our») respects your privacy and
                    is committed to protecting your personal data. This Privacy
                    Policy explains how we collect, use, store, and protect your
                    information when you visit our website.
                  </p>
                </section>

                <section className='mb-8'>
                  <h2 className='text-2xl font-semibold mb-4'>
                    2. Information We Collect
                  </h2>
                  <h3 className='text-xl font-semibold mb-2'>
                    2.1 Information You Provide
                  </h3>
                  <ul className='list-disc pl-6 mb-4'>
                    <li>First and last name</li>
                    <li>Email address</li>
                    <li>Phone number</li>
                    <li>Booking information</li>
                    <li>Messages sent through the contact form</li>
                  </ul>

                  <h3 className='text-xl font-semibold mb-2'>
                    2.2 Automatically Collected Information
                  </h3>
                  <ul className='list-disc pl-6 mb-4'>
                    <li>IP address</li>
                    <li>Browser type</li>
                    <li>Pages visited</li>
                    <li>Date and time of access</li>
                    <li>Cookies (see Cookie Policy)</li>
                  </ul>
                </section>

                <section className='mb-8'>
                  <h2 className='text-2xl font-semibold mb-4'>
                    3. How We Use Your Information
                  </h2>
                  <p className='mb-4'>We use the information we collect to:</p>
                  <ul className='list-disc pl-6 mb-4'>
                    <li>Process and manage your bookings</li>
                    <li>Communicate with you about our services</li>
                    <li>Improve your experience on our website</li>
                    <li>
                      Send updates and promotional messages (with your consent)
                    </li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </section>

                <section className='mb-8'>
                  <h2 className='text-2xl font-semibold mb-4'>
                    4. Information Sharing
                  </h2>
                  <p className='mb-4'>
                    We do not sell, rent, or distribute your personal data to
                    third parties. We may share information only with:
                  </p>
                  <ul className='list-disc pl-6 mb-4'>
                    <li>
                      Service providers who help us operate the website (e.g.,
                      hosting, email services)
                    </li>
                    <li>When required by law or court order</li>
                    <li>To protect our rights and security</li>
                  </ul>
                </section>

                <section className='mb-8'>
                  <h2 className='text-2xl font-semibold mb-4'>
                    5. Data Security
                  </h2>
                  <p className='mb-4'>
                    We implement appropriate technical and organizational
                    measures to protect your personal data from unauthorized
                    access, loss, destruction, or alteration.
                  </p>
                </section>

                <section className='mb-8'>
                  <h2 className='text-2xl font-semibold mb-4'>6. Cookies</h2>
                  <p className='mb-4'>
                    We use cookies on our website. For more information, please
                    see our{' '}
                    <Link
                      href='/en/cookie-policy'
                      className='text-primary hover:underline'
                    >
                      Cookie Policy
                    </Link>
                    .
                  </p>
                </section>

                <section className='mb-8'>
                  <h2 className='text-2xl font-semibold mb-4'>
                    7. Your Rights (GDPR)
                  </h2>
                  <p className='mb-4'>
                    Under the General Data Protection Regulation (GDPR), you
                    have the right to:
                  </p>
                  <ul className='list-disc pl-6 mb-4'>
                    <li>Access your personal data</li>
                    <li>Correct inaccurate data</li>
                    <li>Delete your data («right to be forgotten»)</li>
                    <li>Restrict processing</li>
                    <li>Data portability</li>
                    <li>Object to processing</li>
                    <li>Withdraw consent</li>
                  </ul>
                  <p className='mb-4'>
                    To exercise any of these rights, please contact us at:{' '}
                    <a
                      href='mailto:info@rentribathens.gr'
                      className='text-primary hover:underline'
                    >
                      info@rentribathens.gr
                    </a>
                  </p>
                </section>

                <section className='mb-8'>
                  <h2 className='text-2xl font-semibold mb-4'>
                    8. Data Retention Period
                  </h2>
                  <p className='mb-4'>
                    We keep your personal data only for as long as necessary for
                    the purposes described in this policy, unless the law
                    requires retention for a longer period.
                  </p>
                </section>

                <section className='mb-8'>
                  <h2 className='text-2xl font-semibold mb-4'>
                    9. Changes to Privacy Policy
                  </h2>
                  <p className='mb-4'>
                    We may update this Privacy Policy from time to time. Changes
                    will be posted on this page with an update to the «Last
                    updated» date.
                  </p>
                </section>

                <section className='mb-8'>
                  <h2 className='text-2xl font-semibold mb-4'>10. Contact</h2>
                  <p className='mb-4'>
                    For questions or concerns about this Privacy Policy, please
                    contact us:
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
                    <li>
                      <strong>Address:</strong> Lagonisi, Attica, Greece
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
