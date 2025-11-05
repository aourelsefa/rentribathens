import { boats } from '@/data/boats';
import { services } from '@/data/services';
import { getAllDestinations } from '@/data/destinations';
import Hero from '@/components/Hero';
import BoatCard from '@/components/BoatCard';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  // Get featured boats (first 3)
  const featuredBoats = boats.slice(0, 3);
  // Get all destinations
  const destinations = getAllDestinations();

  return (
    <>
          {/* Hero Section */}
          <Hero
            title="Ενοικίαση RIB στην Αθήνα"
            subtitle="Ανακαλύψτε τις όμορφες ακτές του Σαρωνικού με τα σκάφη μας"
            ctaText="Κλείσε τώρα"
            ctaPhone="+306978277120"
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

          {/* Design 5: Professional Cards */}
          <div className="space-y-6">
            {services.map((service, index) => (
              <div key={service.id} className="group">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="flex flex-col lg:flex-row">
                    {/* Image side */}
                    <div className="lg:w-1/3 h-48 lg:h-auto relative">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 33vw"
                      />
                    </div>
                    
                    {/* Content side */}
                    <div className="lg:w-2/3 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                            <span className="text-xl text-primary">
                              {service.id === 'rent' ? '🚤' : service.id === 'cruises' ? '🏝️' : '⛴️'}
                            </span>
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                            <p className="text-gray-500 text-sm">Υπηρεσία #{index + 1}</p>
                          </div>
                        </div>
                        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                          Διαθέσιμο
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                      
                      {service.destinations && (
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-900 mb-2">
                            {service.id === 'cruises' ? 'Προορισμοί Κρουαζιέρας' : 'Διαδρομές Μεταφοράς'}
                          </h4>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {service.destinations.map((destination, destIndex) => {
                              // Map destination names to slugs
                              const destinationSlugs: Record<string, string> = {
                                'Αθηναική Ριβιέρα': 'athenaiki-riviera',
                                'Αίγινα': 'aigina',
                                'Πόρος': 'poros',
                                'Ύδρα': 'ydra',
                                'Τζια': 'tzia',
                                'Κύθνος': 'kythnos',
                                'Μακρόνησος': 'makronisos',
                                'Πάτροκλος': 'patroklos',
                                'Αγκίστρι': 'agkistri'
                              };
                              const slug = destinationSlugs[destination];
                              return slug ? (
                                <Link
                                  key={destIndex}
                                  href={`/destinations/${slug}`}
                                  className="flex items-center text-gray-600 bg-gray-50 px-3 py-2 rounded-lg hover:bg-primary hover:text-white transition-all duration-200 group"
                                >
                                  <span className="text-primary group-hover:text-white mr-2 text-xs">•</span>
                                  <span className="text-sm">{destination}</span>
                                </Link>
                              ) : (
                                <div key={destIndex} className="flex items-center text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                                  <span className="text-primary mr-2 text-xs">•</span>
                                  <span className="text-sm">{destination}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* VIP Note for Cruises and Transfers */}
                      {(service.id === 'cruises' || service.id === 'transfers') && (
                        <div className="mb-4 bg-accent/10 border border-accent/20 rounded-lg p-3">
                          <div className="flex items-start">
                            <span className="text-accent mr-2 text-lg">⭐</span>
                            <p className="text-sm text-gray-700">
                              <span className="font-semibold">VIP Υπηρεσίες:</span> Προσφέρουμε αποκλειστικές VIP {service.id === 'cruises' ? 'κρουαζιέρες' : 'μεταφορές'} σύμφωνα με τις ανάγκες σας. Επικοινωνήστε μαζί μας για προσαρμοσμένη εξυπηρέτηση.
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Features */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                        <div className="text-center p-2 bg-primary/5 rounded-lg">
                          <div className="text-lg text-primary mb-1">⚓</div>
                          <div className="text-xs text-gray-600">Εξοπλισμός</div>
                        </div>
                        <div className="text-center p-2 bg-primary/5 rounded-lg">
                          <div className="text-lg text-primary mb-1">👨‍✈️</div>
                          <div className="text-xs text-gray-600">Πλήρωμα</div>
                        </div>
                        <div className="text-center p-2 bg-primary/5 rounded-lg">
                          <div className="text-lg text-primary mb-1">🛡️</div>
                          <div className="text-xs text-gray-600">Ασφάλεια</div>
                        </div>
                        <div className="text-center p-2 bg-primary/5 rounded-lg">
                          <div className="text-lg text-primary mb-1">📞</div>
                          <div className="text-xs text-gray-600">Υποστήριξη</div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <a
                          href="/services"
                          className="flex-1 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-200 text-center"
                        >
                          Μάθετε Περισσότερα
                        </a>
                        <a
                          href="tel:+306978277120"
                          className="flex-1 border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all duration-200 text-center"
                        >
                          📞 Κλείστε Τώρα
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Section - Design 7 */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Προορισμοί μας
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ανακαλύψτε τους όμορφους προορισμούς που προσφέρουμε στον Σαρωνικό
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((destination, index) => (
              <Link key={destination.id} href={`/destinations/${destination.slug}`}>
                <div className="group bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-xl hover:border-primary transition-all duration-300 cursor-pointer h-full flex flex-col">
                  {/* Header */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-primary font-bold text-sm">#{index + 1}</span>
                      </div>
                      <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                        Διαθέσιμο
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors">
                      {destination.name}
                    </h3>
                    <p className="text-gray-500 text-sm">{destination.nameEn}</p>
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-grow">
                    {destination.shortDescription}
                  </p>
                  
                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-gray-200">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">📍 Απόσταση</div>
                      <div className="text-sm font-semibold text-gray-900">{destination.distance}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">⏱️ Διάρκεια</div>
                      <div className="text-sm font-semibold text-gray-900">{destination.duration}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">📅 Καλύτερος χρόνος</div>
                      <div className="text-sm font-semibold text-gray-900">{destination.bestTime}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">⭐ Βαθμολογία</div>
                      <div className="text-sm font-semibold text-yellow-600">4.8/5</div>
                    </div>
                  </div>
                  
                  {/* Highlights */}
                  <div className="mb-4">
                    <div className="text-xs text-gray-500 mb-2 font-medium">Αξιοθέατα:</div>
                    <div className="space-y-1">
                      {destination.highlights.slice(0, 2).map((highlight, highlightIndex) => (
                        <div key={highlightIndex} className="flex items-start text-xs text-gray-600">
                          <span className="text-primary mr-2 mt-0.5">•</span>
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Tips preview */}
                  <div className="mb-4">
                    <div className="text-xs text-gray-500 mb-2 font-medium">💡 Συμβουλή:</div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {destination.tips[0]}
                    </p>
                  </div>
                  
                  {/* CTA */}
                  <div className="mt-auto pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-primary font-medium group-hover:text-primary/80 transition-colors">
                        Δείτε λεπτομέρειες
                      </span>
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                        <span className="text-primary group-hover:text-white text-sm">→</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
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
