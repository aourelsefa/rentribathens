import ServiceCard from '@/components/ServiceCard';
import { services } from '@/data/services';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Υπηρεσίες',
  description: 'Πλήρης γκάμα υπηρεσιών για θαλάσσιες εκδρομές. Ενοικίαση σκαφών, κρουαζιέρες, μεταφορές στον Σαρωνικό. Επαγγελματική εξυπηρέτηση.',
  openGraph: {
    title: 'Υπηρεσίες - RentRibAthens',
    description: 'Πλήρης γκάμα υπηρεσιών για θαλάσσιες εκδρομές στον Σαρωνικό.',
  },
};

export default function ServicesPage() {
  // Map services data to detailed descriptions
  const mainServices = [
    {
      title: "Ενοικίαση Σκάφους",
      description: "Ενοικίαση RIB σκαφών για περιηγήσεις στον Σαρωνικό. Διαθέτουμε ποικιλία μεγέθους και χωρητικότητας για κάθε ανάγκη.",
      icon: <span className="text-2xl">🚤</span>,
      features: [
        "RIB σκάφη διαφόρων μεγεθών",
        "Πλήρης εξοπλισμός ασφαλείας",
        "Επαγγελματίες κάπετανοι",
        "Ασφάλιση και άδειες"
      ]
    },
    {
      title: "Κρουαζιέρες",
      description: "Οργανωμένες κρουαζιέρες σε όμορφα μέρη του Σαρωνικού. Ανακαλύψτε κρυμμένα κολπάκια και παραλίες που είναι προσβάσιμες μόνο από τη θάλασσα.",
      icon: <span className="text-2xl">🏝️</span>,
      features: [
        "Προτεινόμενες διαδρομές",
        "Στάση σε όμορφα νησάκια",
        "Βαθύ κολύμπι και σνόρκελινγκ",
        "Φωτογραφίες και αναμνήσεις"
      ]
    },
    {
      title: "Μεταφορές",
      description: "Μεταφορές σε νησιά και παραλίες του Σαρωνικού. Γρήγορη και ασφαλής μεταφορά με τα σκάφη μας.",
      icon: <span className="text-2xl">⛴️</span>,
      features: [
        "Μεταφορά σε νησιά Σαρωνικού",
        "Προσβασιμότητα σε απομονωμένες παραλίες",
        "Γρήγορη και ασφαλής διαδρομή",
        "Ευέλικτα ωράρια"
      ]
    }
  ];

  const additionalServices = [
    {
      title: "Πλήρης Εξοπλισμός",
      description: "Ζωσωστικά, αγκυροβόλιο, πυροσβεστήρες και όλος ο απαραίτητος εξοπλισμός ασφαλείας",
      icon: <span className="text-2xl">⚓</span>
    },
    {
      title: "Επαγγελματίες Κάπετανοι",
      description: "Εμπειρογνώμονες κάπετανοι με πιστοποιήσεις για ασφαλή και ευχάριστη διαδρομή",
      icon: <span className="text-2xl">👨‍✈️</span>
    },
    {
      title: "Ευέλικτη Κράτηση",
      description: "Κράτηση με λίγες ώρες νωρίτερα, ακύρωση εύκολη και ασφαλή πληρωμή",
      icon: <span className="text-2xl">📅</span>
    },
    {
      title: "24/7 Επικοινωνία",
      description: "Διαθέσιμοι για ερωτήσεις και κρατήσεις όλο το 24ωρο",
      icon: <span className="text-2xl">📞</span>
    },
    {
      title: "Ασφάλιση",
      description: "Πλήρης ασφάλιση επιβατών και σκάφους για την απόλυτη ασφάλεια",
      icon: <span className="text-2xl">🛡️</span>
    },
    {
      title: "Βοηθητικά Συσκευές",
      description: "GPS, ραδιόφωνο, σκάφος διάσωσης και όλες οι σύγχρονες συσκευές",
      icon: <span className="text-2xl">📡</span>
    }
  ];

  return (
    <>

      {/* Hero Section */}
      <section className="bg-primary text-white">
        <div className="section-padding">
          <div className="container-custom">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Υπηρεσίες μας
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Πλήρης γκάμα υπηρεσιών για θαλάσσιες εκδρομές στον Σαρωνικό
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Κύριες Υπηρεσίες
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ανακαλύψτε τις κύριες υπηρεσίες που προσφέρουμε για την καλύτερη εμπειρία
            </p>
          </div>

          <div className="space-y-16">
            {mainServices.map((service, index) => (
              <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mr-4">
                      <span className="text-white text-2xl">{service.icon}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                      {service.title}
                    </h3>
                  </div>
                  
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-700">
                        <span className="text-accent mr-3">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <div className="aspect-video bg-gray-200 rounded-xl overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      <div className="text-center">
                        <span className="text-4xl mb-2 block">{service.icon}</span>
                        <span className="text-sm">Εικόνα: {service.title}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Πρόσθετες Υπηρεσίες
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Πλήρης εξοπλισμός και εξειδικευμένη εξυπηρέτηση για την καλύτερη εμπειρία
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => (
              <div key={index} className="group">
                <div className="bg-white border border-gray-100 rounded-2xl p-8 h-full hover:shadow-xl hover:border-accent/20 transition-all duration-300 hover:-translate-y-1">
                  {/* Title with Icon */}
                  <div className="flex items-center mb-4">
                    <span className="text-2xl mr-3 group-hover:scale-110 transition-transform duration-300">{service.icon}</span>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-200">
                      {service.title}
                    </h3>
                  </div>
                  
                  {/* Content */}
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Decorative Element */}
                  <div className="mt-6 w-12 h-1 bg-gradient-to-r from-primary to-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Πώς Λειτουργεί
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Απλά βήματα για να κλείσετε την εκδρομή σας
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Επικοινωνία</h3>
              <p className="text-gray-600">
                Καλέστε μας ή στείλτε μήνυμα με τις ανάγκες σας
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Κράτηση</h3>
              <p className="text-gray-600">
                Συμφωνούμε ημερομηνία, ώρα και διαδρομή
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Συναντηση</h3>
              <p className="text-gray-600">
                Συναντιόμαστε στο σημείο εκκίνησης
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                4
              </div>
              <h3 className="text-xl font-semibold mb-2">Απόλαυση</h3>
              <p className="text-gray-600">
                Απολαύστε την εκδρομή σας με ασφάλεια
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white">
        <div className="section-padding">
          <div className="container-custom">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Έτοιμοι για την επόμενη εκδρομή σας;
              </h2>
              <p className="text-lg mb-8 opacity-90">
                Επικοινωνήστε μαζί μας για να κλείσετε την εκδρομή σας
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+302101234567"
                  className="btn-secondary"
                >
                  📞 Κλείστε Τώρα
                </a>
                <Link
                  href="/contact"
                  className="bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all duration-200"
                >
                  Στείλε Μήνυμα
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
