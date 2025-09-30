import ContactForm from '@/components/ContactForm';
import ServiceCard from '@/components/ServiceCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Επικοινωνία',
  description: 'Επικοινωνήστε μαζί μας για κράτηση RIB σκαφών. Τηλέφωνο: +30 210 123 4567. Διεύθυνση: Λαγονήσι, Αττική. Άμεση εξυπηρέτηση.',
  openGraph: {
    title: 'Επικοινωνία - RentRibAthens',
    description: 'Επικοινωνήστε μαζί μας για κράτηση RIB σκαφών. Άμεση εξυπηρέτηση.',
  },
};

export default function ContactPage() {
  const contactInfo = [
    {
      title: "Τηλέφωνο",
      description: "Καλέστε μας για άμεση κράτηση",
      icon: <span className="text-2xl">📞</span>,
      details: [
        "+30 210 123 4567",
        "Διαθέσιμοι 08:00 - 20:00",
        "Άμεση απάντηση"
      ]
    },
    {
      title: "Email",
      description: "Στείλτε μας email για ερωτήσεις",
      icon: <span className="text-2xl">📧</span>,
      details: [
        "info@rentribathens.gr",
        "Απάντηση εντός 24 ωρών",
        "Για λεπτομερείς πληροφορίες"
      ]
    },
    {
      title: "Διεύθυνση",
      description: "Βρείτε μας στη Μαρίνα Λαγονησίου",
      icon: <span className="text-2xl">📍</span>,
      details: [
        "Μαρίνα Λαγονησίου",
        "Λαγονήσι 190 10, Αττική",
        "Εύκολη πρόσβαση από Αθήνα"
      ]
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
                Επικοινωνία
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Επικοινωνήστε μαζί μας για να κλείσετε την εκδρομή σας
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Πληροφορίες Επικοινωνίας
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Επικοινωνήστε μαζί μας με οποιονδήποτε τρόπο σας βολεύει
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">{info.icon}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{info.title}</h3>
                <p className="text-gray-600 mb-4">{info.description}</p>
                <ul className="space-y-1">
                  {info.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="text-gray-700">
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Quick Contact Channels */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Άμεση Επικοινωνία
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Επικοινωνήστε μαζί μας με τον τρόπο που σας βολεύει περισσότερο
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {/* Phone */}
              <a
                href="tel:+302101234567"
                className="group bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Τηλέφωνο</h4>
                <p className="text-xs text-gray-500">Καλέστε τώρα</p>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/302101234567"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-500 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">WhatsApp</h4>
                <p className="text-xs text-gray-500">Μήνυμα</p>
              </a>

              {/* Viber */}
              <a
                href="viber://chat?number=+302101234567"
                className="group bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <svg className="w-8 h-8 text-purple-600 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.398.014C5.209.014.014 5.209.014 11.398c0 2.113.613 4.082 1.671 5.744L.028 23.986l6.744-1.657c1.662 1.058 3.631 1.671 5.744 1.671 6.189 0 11.203-5.015 11.203-11.204C23.719 5.209 18.705.014 11.398.014zm5.889 15.758c-.174.174-.512.278-.801.278-.174 0-.348-.052-.522-.174l-1.306-.696c-.174-.104-.348-.174-.522-.174-.174 0-.348.052-.522.174-.174.104-.348.278-.348.522v2.438c0 .174-.052.348-.174.522-.104.174-.278.348-.522.348-.348 0-.696-.174-.696-.522V8.547c0-.348.174-.696.522-.696.244 0 .418.174.522.348.122.174.174.348.174.522v6.744c0 .174.052.348.174.522.104.174.278.348.522.348.348 0 .696-.174.696-.522V7.825c0-.348.174-.696.522-.696.244 0 .418.174.522.348.122.174.174.348.174.522v8.947z"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Viber</h4>
                <p className="text-xs text-gray-500">Κλήση/Μήνυμα</p>
              </a>

              {/* Messenger */}
              <a
                href="https://m.me/rentribathens"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-600 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16l-1.61 7.595c-.122.578-.706.944-1.284.822l-3.92-.956c-.578-.122-1.162.244-1.284.822l-1.61 7.595c-.122.578-.706.944-1.284.822l-2.45-.598c-.578-.122-.944-.706-.822-1.284l1.61-7.595c.122-.578.706-.944 1.284-.822l3.92.956c.578.122 1.162-.244 1.284-.822l1.61-7.595c.122-.578.706-.944 1.284-.822l2.45.598c.578.122.944.706.822 1.284z"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Messenger</h4>
                <p className="text-xs text-gray-500">Chat</p>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/rentribathens"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <svg className="w-8 h-8 text-pink-500 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Instagram</h4>
                <p className="text-xs text-gray-500">DM</p>
              </a>

              {/* Email */}
              <a
                href="mailto:info@rentribathens.gr"
                className="group bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-600 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                <p className="text-xs text-gray-500">Στείλε email</p>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Στείλτε μας Μήνυμα
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Συμπληρώστε τη φόρμα και θα επικοινωνήσουμε μαζί σας άμεσα
            </p>
          </div>

          <ContactForm />
        </div>
      </section>

      {/* Map Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Βρείτε μας
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Βρίσκουμαστε στη Μαρίνα Λαγονησίου, με εύκολη πρόσβαση από την Αθήνα
            </p>
          </div>

          {/* Google Maps Embed */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100">
              <div className="aspect-video relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3144.2!2d23.888333!3d37.778333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a1a2b3c4d5e6f7%3A0x1234567890abcdef!2sLagonisi%20Marina!5e0!3m2!1sel!2sgr!4v1700000000000!5m2!1sel!2sgr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="RentRibAthens Location - Μαρίνα Λαγονησίου"
                  className="rounded-2xl"
                />
                {/* Map overlay with location info */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <span className="text-primary text-lg">⚓</span>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">Μαρίνα Λαγονησίου</div>
                      <div className="text-xs text-gray-600">Λαγονήσι, Αττική</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Details */}
            <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Πώς να μας βρείτε
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-accent mr-2 mt-1">🚗</span>
                      <div>
                        <strong>Με αυτοκίνητο:</strong><br />
                        Από Αθήνα: Εθνική Οδός Αθηνών-Κορίνθου, έξοδος Λαγονήσι → Μαρίνα
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent mr-2 mt-1">🚌</span>
                      <div>
                        <strong>Με λεωφορείο:</strong><br />
                        ΚΤΕΛ από Κηφισιά προς Λαγονήσι, στάση Μαρίνα
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent mr-2 mt-1">⏱️</span>
                      <div>
                        <strong>Χρόνος διαδρομής:</strong><br />
                        ~45 λεπτά από το κέντρο της Αθήνας
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent mr-2 mt-1">🅿️</span>
                      <div>
                        <strong>Πάρκινγκ:</strong><br />
                        Δωρεάν πάρκινγκ στη Μαρίνα Λαγονησίου
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Ωράρια Λειτουργίας
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex justify-between">
                      <span>Δευτέρα - Παρασκευή:</span>
                      <span className="font-medium">08:00 - 20:00</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Σάββατο:</span>
                      <span className="font-medium">08:00 - 20:00</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Κυριακή:</span>
                      <span className="font-medium">08:00 - 20:00</span>
                    </li>
                    <li className="flex justify-between border-t pt-2">
                      <span>Κράτηση:</span>
                      <span className="font-medium text-accent">24/7 Online</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Συχνές Ερωτήσεις
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Απαντήσεις σε κοινές ερωτήσεις περί των υπηρεσιών μας
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Πόσο νωρίς πρέπει να κάνω κράτηση;
                </h3>
                <p className="text-gray-600">
                  Προτείνουμε να κάνετε κράτηση τουλάχιστον 24 ώρες νωρίτερα, αλλά μπορούμε να εξυπηρετήσουμε και last-minute κρατήσεις ανάλογα με τη διαθεσιμότητα.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Τι συμπεριλαμβάνεται στην τιμή;
                </h3>
                <p className="text-gray-600">
                  Η τιμή συμπεριλαμβάνει το σκάφος, τον κάπετανο, όλο τον εξοπλισμό ασφαλείας, καύσιμα και ασφάλιση. Δεν συμπεριλαμβάνονται φαγητά και ποτά.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Τι πρέπει να φέρω μαζί μου;
                </h3>
                <p className="text-gray-600">
                  Φέρτε μαζί σας μαγιό, πετσέτα, αντιηλιακό, καπέλο και φωτογραφική μηχανή. Παρέχουμε νερό και απαραίτητα ασφάλιστρα.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Υπάρχει η δυνατότητα ακύρωσης;
                </h3>
                <p className="text-gray-600">
                  Ναι, μπορείτε να ακυρώσετε μέχρι 24 ώρες πριν την εκδρομή χωρίς χρέωση. Για ακυρώσεις την τελευταία στιγμή, μπορεί να υπάρχει μικρή χρέωση.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
