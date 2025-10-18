import { boats } from '@/data/boats';
import { services } from '@/data/services';
import Hero from '@/components/Hero';
import BoatCard from '@/components/BoatCard';
import ServiceCard from '@/components/ServiceCard';
import Link from 'next/link';

export default function HomePage() {
  // Get featured boats (first 3)
  const featuredBoats = boats.slice(0, 3);

  return (
    <>
          {/* Hero Section */}
          <Hero
            title="Ενοικίαση RIB στην Αθήνα"
            subtitle="Ανακαλύψτε τις όμορφες ακτές του Σαρωνικού με τα σκάφη μας"
            ctaText="Κλείσε τώρα"
            ctaPhone="+302101234567"
            backgroundImage="/images/boats/02-8.jpg"
          />

      {/* Featured Boats Section */}
      <section id="fleet" className="section-padding bg-muted">
        <div className="container-custom">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Ενοικίαση σκαφών
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Διαθέτουμε ποικιλία RIB σκαφών για κάθε ανάγκη και προϋπολογισμό
                </p>
              </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBoats.map((boat) => (
              <BoatCard key={boat.id} boat={boat} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/fleet" className="btn-secondary">
              Δείτε Όλο τον Στόλο
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Υπηρεσίες μας
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Πλήρης εξοπλισμός και εξειδικευμένη εξυπηρέτηση για την καλύτερη εμπειρία
            </p>
          </div>

          <div className="space-y-12">
            {services.map((service, index) => (
              <div key={service.id} className="group">
                <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100">
                  {/* Image Header */}
                  <div className="relative h-64 lg:h-80 overflow-hidden">
                    <img
                      src={service.image}
                      alt={`${service.title} - Υπηρεσία`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6">
                      <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                        <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 lg:p-10">
                    <p className="text-gray-600 mb-8 leading-relaxed text-lg">{service.description}</p>
                    
                    {/* Destinations for cruises and transfers */}
                    {service.destinations && (
                      <div className="mb-8">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                          <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                          {service.id === 'cruises' ? 'Προορισμοί Κρουαζιέρας' : 'Προορισμοί Μεταφοράς'}
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {service.destinations.map((destination, destIndex) => (
                            <div key={destIndex} className="flex items-center text-gray-700 bg-gray-50 px-3 py-2 rounded-lg">
                              <span className="text-accent mr-2 text-sm">📍</span>
                              <span className="text-sm font-medium">{destination}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Features Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      <div className="text-center p-4 bg-gray-50 rounded-xl">
                        <div className="text-2xl mb-2">✅</div>
                        <div className="text-sm font-medium text-gray-700">Πλήρης εξοπλισμός</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-xl">
                        <div className="text-2xl mb-2">👨‍✈️</div>
                        <div className="text-sm font-medium text-gray-700">Επαγγελματικό πλήρωμα</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-xl">
                        <div className="text-2xl mb-2">🛡️</div>
                        <div className="text-sm font-medium text-gray-700">Έναρξη ασφάλειας</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-xl">
                        <div className="text-2xl mb-2">📞</div>
                        <div className="text-sm font-medium text-gray-700">24/7 υποστήριξη</div>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <a
                        href="/services"
                        className="flex-1 bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors duration-200 text-center"
                      >
                        Μάθετε Περισσότερα
                      </a>
                      <a
                        href="tel:+302101234567"
                        className="flex-1 border-2 border-primary text-primary px-6 py-3 rounded-xl font-semibold hover:bg-primary hover:text-white transition-all duration-200 text-center"
                      >
                        📞 Κλείστε Τώρα
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Τι Λένε οι Πελάτες μας
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Απολαύστε τις εμπειρίες των πελατών μας από τις εκδρομές τους
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Review 1 */}
            <div className="bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "Εξαιρετική εμπειρία! Το σκάφος ήταν άριστα συντηρημένο και ο κάπετανος πολύ επαγγελματίας. Περνούσαμε υπέροχα στο Σαρωνικό. Σίγουρα θα το ξανακάνουμε!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  ΜΚ
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Μάριος Κωνσταντίνου</div>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "Amazing experience! We rented the Olympic 490 for a family day trip around the Saronic Gulf. The boat was clean, safe, and perfect for our group. The captain was professional and showed us beautiful spots. Highly recommend!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  SM
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Sarah Mitchell</div>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "Εντυπωσιακή ημέρα στο Ribco 27! Γρήγορο, άνετο και με πλήρη εξοπλισμό ασφαλείας. Οι φίλοι μου ήταν ενθουσιασμένοι. Θα επιστρέψουμε σίγουρα!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  ΝΔ
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Νίκος Δημητρίου</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Strip */}
      <section className="bg-primary text-white">
        <div className="section-padding">
          <div className="container-custom">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Έτοιμοι για μια μοναδική εμπειρία;
              </h2>
              <p className="text-lg mb-6 opacity-90">
                Επικοινωνήστε μαζί μας τώρα για να κλείσετε την εκδρομή σας
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+302101234567"
                  className="btn-secondary"
                >
                  Επικοινωνία
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
