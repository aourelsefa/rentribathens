import type { Metadata } from 'next';
import { Locale, getTranslations } from '@/lib/i18n';
import Link from 'next/link';

interface CookiePolicyPageProps {
  params: { locale: Locale };
}

export async function generateMetadata({
  params,
}: CookiePolicyPageProps): Promise<Metadata> {
  const t = getTranslations(params.locale);
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://rentribathens.gr';

  return {
    title: t('gdpr.cookiePolicy') as string,
    description:
      params.locale === 'el'
        ? 'Πολιτική Cookies - RentRibAthens'
        : 'Cookie Policy - RentRibAthens',
    alternates: {
      canonical:
        params.locale === 'el'
          ? `${siteUrl}/cookie-policy`
          : `${siteUrl}/en/cookie-policy`,
      languages: {
        el: '/cookie-policy',
        en: '/en/cookie-policy',
        'x-default': '/cookie-policy',
      },
    },
  };
}

export default function CookiePolicyPage({ params }: CookiePolicyPageProps) {
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
            {isGreek ? 'Πολιτική Cookies' : 'Cookie Policy'}
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
                    1. Τι είναι τα Cookies
                  </h2>
                  <p className='mb-4'>
                    Τα cookies είναι μικρά αρχεία κειμένου που αποθηκεύονται
                    στον υπολογιστή ή τη συσκευή σας όταν επισκέπτεστε έναν
                    ιστότοπο. Τα cookies μας βοηθούν να βελτιώσουμε την εμπειρία
                    σας στον ιστότοπο και να παρέχουμε καλύτερες υπηρεσίες.
                  </p>
                </section>

                <section className='mb-8'>
                  <h2 className='text-2xl font-semibold mb-4'>
                    2. Πώς Χρησιμοποιούμε τα Cookies
                  </h2>
                  <p className='mb-4'>Χρησιμοποιούμε cookies για:</p>
                  <ul className='list-disc pl-6 mb-4'>
                    <li>Να εξασφαλίσουμε τη σωστή λειτουργία του ιστότοπου</li>
                    <li>Να αποθηκεύσουμε τις προτιμήσεις σας</li>
                    <li>Να αναλύσουμε τη χρήση του ιστότοπου</li>
                    <li>Να βελτιώσουμε την απόδοση και τη λειτουργικότητα</li>
                  </ul>
                </section>

                <section className='mb-8'>
                  <h2 className='text-2xl font-semibold mb-4'>
                    3. Τύποι Cookies
                  </h2>

                  <h3 className='text-xl font-semibold mb-2'>
                    3.1 Απαραίτητα Cookies
                  </h3>
                  <p className='mb-4'>
                    Αυτά τα cookies είναι απαραίτητα για τη λειτουργία του
                    ιστότοπου και δεν μπορούν να απενεργοποιηθούν. Περιλαμβάνουν
                    cookies που αποθηκεύουν τις προτιμήσεις σας για cookies, τη
                    γλώσσα και άλλες βασικές ρυθμίσεις.
                  </p>

                  <h3 className='text-xl font-semibold mb-2'>
                    3.2 Cookies Αναλυτικών
                  </h3>
                  <p className='mb-4'>
                    Αυτά τα cookies μας βοηθούν να κατανοήσουμε πώς οι
                    επισκέπτες χρησιμοποιούν τον ιστότοπο, συλλέγοντας
                    πληροφορίες ανώνυμα. Αυτό μας βοηθά να βελτιώσουμε τον
                    ιστότοπο.
                  </p>

                  <h3 className='text-xl font-semibold mb-2'>
                    3.3 Cookies Μάρκετινγκ
                  </h3>
                  <p className='mb-4'>
                    Αυτά τα cookies χρησιμοποιούνται για να παρέχουμε
                    διαφημίσεις που είναι σχετικές με εσάς και τα ενδιαφέροντά
                    σας. Μπορεί επίσης να χρησιμοποιηθούν για να περιορίσουμε
                    τον αριθμό των φορών που βλέπετε μια διαφήμιση.
                  </p>
                </section>

                <section className='mb-8'>
                  <h2 className='text-2xl font-semibold mb-4'>
                    4. Διαχείριση Cookies
                  </h2>
                  <p className='mb-4'>
                    Μπορείτε να διαχειριστείτε τις προτιμήσεις cookies σας ανά
                    πάσα στιγμή χρησιμοποιώντας το banner cookies που
                    εμφανίζεται κατά την πρώτη επίσκεψή σας ή κάνοντας κλικ στο
                    σύνδεσμο «Πολιτική Cookies» στο footer του ιστότοπου.
                  </p>
                  <p className='mb-4'>
                    Επίσης, μπορείτε να διαχειριστείτε τα cookies μέσω των
                    ρυθμίσεων του περιηγητή σας. Σημειώστε ότι η απενεργοποίηση
                    ορισμένων cookies μπορεί να επηρεάσει τη λειτουργικότητα του
                    ιστότοπου.
                  </p>
                </section>

                <section className='mb-8'>
                  <h2 className='text-2xl font-semibold mb-4'>
                    5. Cookies Τρίτων
                  </h2>
                  <p className='mb-4'>
                    Ο ιστότοπός μας μπορεί να χρησιμοποιεί cookies από τρίτους,
                    όπως:
                  </p>
                  <ul className='list-disc pl-6 mb-4'>
                    <li>
                      <strong>Google Analytics:</strong> Για ανάλυση της χρήσης
                      του ιστότοπου
                    </li>
                    <li>
                      <strong>Social Media:</strong> Για ενσωμάτωση κοινωνικών
                      δικτύων
                    </li>
                  </ul>
                  <p className='mb-4'>
                    Αυτά τα cookies υπόκεινται στις πολιτικές απορρήτου των
                    αντίστοιχων παρόχων.
                  </p>
                </section>

                <section className='mb-8'>
                  <h2 className='text-2xl font-semibold mb-4'>
                    6. Διάρκεια Cookies
                  </h2>
                  <p className='mb-4'>
                    Ορισμένα cookies είναι «session cookies» που διαγράφονται
                    αυτόματα όταν κλείσετε τον περιηγητή. Άλλα είναι «persistent
                    cookies» που παραμένουν στον υπολογιστή σας για ένα
                    συγκεκριμένο χρονικό διάστημα ή μέχρι να τα διαγράψετε.
                  </p>
                </section>

                <section className='mb-8'>
                  <h2 className='text-2xl font-semibold mb-4'>
                    7. Αλλαγές στην Πολιτική Cookies
                  </h2>
                  <p className='mb-4'>
                    Μπορούμε να ενημερώσουμε αυτή την Πολιτική Cookies κατά
                    καιρούς. Οι αλλαγές θα δημοσιεύονται σε αυτή τη σελίδα.
                  </p>
                </section>

                <section className='mb-8'>
                  <h2 className='text-2xl font-semibold mb-4'>
                    8. Επικοινωνία
                  </h2>
                  <p className='mb-4'>
                    Για ερωτήσεις σχετικά με τη χρήση cookies, επικοινωνήστε
                    μαζί μας:
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
                    1. What are Cookies
                  </h2>
                  <p className='mb-4'>
                    Cookies are small text files that are stored on your
                    computer or device when you visit a website. Cookies help us
                    improve your experience on the website and provide better
                    services.
                  </p>
                </section>

                <section className='mb-8'>
                  <h2 className='text-2xl font-semibold mb-4'>
                    2. How We Use Cookies
                  </h2>
                  <p className='mb-4'>We use cookies to:</p>
                  <ul className='list-disc pl-6 mb-4'>
                    <li>Ensure the proper functioning of the website</li>
                    <li>Store your preferences</li>
                    <li>Analyze website usage</li>
                    <li>Improve performance and functionality</li>
                  </ul>
                </section>

                <section className='mb-8'>
                  <h2 className='text-2xl font-semibold mb-4'>
                    3. Types of Cookies
                  </h2>

                  <h3 className='text-xl font-semibold mb-2'>
                    3.1 Necessary Cookies
                  </h3>
                  <p className='mb-4'>
                    These cookies are essential for the website to function and
                    cannot be disabled. They include cookies that store your
                    cookie preferences, language, and other basic settings.
                  </p>

                  <h3 className='text-xl font-semibold mb-2'>
                    3.2 Analytics Cookies
                  </h3>
                  <p className='mb-4'>
                    These cookies help us understand how visitors use the
                    website by collecting information anonymously. This helps us
                    improve the website.
                  </p>

                  <h3 className='text-xl font-semibold mb-2'>
                    3.3 Marketing Cookies
                  </h3>
                  <p className='mb-4'>
                    These cookies are used to provide advertisements that are
                    relevant to you and your interests. They may also be used to
                    limit the number of times you see an advertisement.
                  </p>
                </section>

                <section className='mb-8'>
                  <h2 className='text-2xl font-semibold mb-4'>
                    4. Managing Cookies
                  </h2>
                  <p className='mb-4'>
                    You can manage your cookie preferences at any time using the
                    cookie banner that appears on your first visit or by
                    clicking the «Cookie Policy» link in the website footer.
                  </p>
                  <p className='mb-4'>
                    You can also manage cookies through your browser settings.
                    Note that disabling certain cookies may affect website
                    functionality.
                  </p>
                </section>

                <section className='mb-8'>
                  <h2 className='text-2xl font-semibold mb-4'>
                    5. Third-Party Cookies
                  </h2>
                  <p className='mb-4'>
                    Our website may use cookies from third parties, such as:
                  </p>
                  <ul className='list-disc pl-6 mb-4'>
                    <li>
                      <strong>Google Analytics:</strong> For website usage
                      analysis
                    </li>
                    <li>
                      <strong>Social Media:</strong> For social network
                      integration
                    </li>
                  </ul>
                  <p className='mb-4'>
                    These cookies are subject to the respective providers&apos;
                    privacy policies.
                  </p>
                </section>

                <section className='mb-8'>
                  <h2 className='text-2xl font-semibold mb-4'>
                    6. Cookie Duration
                  </h2>
                  <p className='mb-4'>
                    Some cookies are «session cookies» that are automatically
                    deleted when you close your browser. Others are «persistent
                    cookies» that remain on your computer for a specific period
                    or until you delete them.
                  </p>
                </section>

                <section className='mb-8'>
                  <h2 className='text-2xl font-semibold mb-4'>
                    7. Changes to Cookie Policy
                  </h2>
                  <p className='mb-4'>
                    We may update this Cookie Policy from time to time. Changes
                    will be posted on this page.
                  </p>
                </section>

                <section className='mb-8'>
                  <h2 className='text-2xl font-semibold mb-4'>8. Contact</h2>
                  <p className='mb-4'>
                    For questions about cookie usage, please contact us:
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
