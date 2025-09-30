import React from 'react';
import { boats } from '@/data/boats';
import BoatCard from '@/components/BoatCard';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Στόλος - Ενοικίαση RIB στη Αθήνα',
  description: 'Δείτε όλο τον στόλο μας με RIB σκάφη για κάθε ανάγκη. Άνετα, γρήγορα και ασφαλή σκάφη για τις εκδρομές σας στον Σαρωνικό.',
};

export default function FleetPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary text-white">
        <div className="section-padding">
          <div className="container-custom">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Ο Στόλος μας
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Διαθέτουμε ποικιλία RIB σκαφών για κάθε ανάγκη και προϋπολογισμό
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Content */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          {/* Fleet Rows */}
          <div className="space-y-8 mb-16">
            {boats.map((boat, index) => (
              <div key={boat.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="grid lg:grid-cols-3 gap-0">
                  {/* Image Section */}
                  <div className="lg:col-span-1">
                    <div className="aspect-video lg:aspect-square relative overflow-hidden">
                      <img
                        src={boat.images[0]}
                        alt={`${boat.name} - Κύρια φωτογραφία`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4 bg-white/90 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                        {boat.name}
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="lg:col-span-2 p-8">
                    <div className="flex flex-col h-full">
                      {/* Header */}
                      <div className="mb-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{boat.name}</h3>
                        <p className="text-gray-600 leading-relaxed">{boat.shortDescription}</p>
                      </div>

                      {/* Specifications */}
                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center mr-3">
                              <span className="text-accent">👥</span>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">Χωρητικότητα</div>
                              <div className="font-semibold text-gray-900">{boat.capacity} άτομα</div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center mr-3">
                              <span className="text-accent">⚙️</span>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">Κινητήρας</div>
                              <div className="font-semibold text-gray-900">{boat.engine}</div>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center mr-3">
                              <span className="text-accent">📸</span>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">Φωτογραφίες</div>
                              <div className="font-semibold text-gray-900">{boat.images.length} διαθέσιμες</div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center mr-3">
                              <span className="text-accent">✅</span>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">Κατάσταση</div>
                              <div className="font-semibold text-green-600">Διαθέσιμο</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                        <a
                          href={`/boats/${boat.slug}`}
                          className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-200 text-center"
                        >
                          Δείτε Λεπτομέρειες
                        </a>
                        <a
                          href="tel:+302101234567"
                          className="border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all duration-200 text-center"
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

          {/* Fleet Stats */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">{boats.length}</div>
                <div className="text-gray-600">Σκάφη διαθέσιμα</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">
                  {Math.max(...boats.map(boat => boat.capacity))}
                </div>
                <div className="text-gray-600">Μέγιστη χωρητικότητα</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">7/7</div>
                <div className="text-gray-600">Διαθέσιμα κάθε μέρα</div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Έτοιμοι για μια μοναδική εμπειρία;
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Επικοινωνήστε μαζί μας τώρα για να κλείσετε την εκδρομή σας
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+302101234567"
                className="bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                📞 Κλείστε Τώρα
              </a>
              <Link
                href="/contact"
                className="border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary hover:text-white transition-all duration-200"
              >
                Στείλε Μήνυμα
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}