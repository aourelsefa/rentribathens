import { boats, type Boat } from '@/data/boats';
import Image from 'next/image';
import ContactForm from '@/components/ContactForm';
import ImageGallery from '@/components/ImageGallery';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface BoatDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return boats.map((boat) => ({
    slug: boat.slug,
  }));
}

async function getBoatBySlug(slug: string): Promise<Boat | null> {
  return boats.find((boat) => boat.slug === slug) || null;
}

export async function generateMetadata({ params }: BoatDetailPageProps): Promise<Metadata> {
  const boat = await getBoatBySlug(params.slug);
  
  if (!boat) {
    return {
      title: 'Σκάφος δεν βρέθηκε',
    };
  }

  return {
    title: boat.name,
    description: boat.shortDescription + ' Ενοικίαση ' + boat.name + ' για περιηγήσεις στον Σαρωνικό. Χωρητικότητα: ' + boat.capacity + ' άτομα.',
    openGraph: {
      title: boat.name + ' - RentRibAthens',
      description: boat.shortDescription,
    },
  };
}

export default async function BoatDetailPage({ params }: BoatDetailPageProps) {
  const boat = await getBoatBySlug(params.slug);

  if (!boat) {
    notFound();
  }

  return (
    <>
      <section className="relative bg-primary text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/rib/sea.jpg"
            alt="Sea background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-primary/70"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 section-padding">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <nav className="text-sm mb-6 opacity-80">
                <Link href="/boats" className="hover:text-accent transition-colors">
                  Σκάφη
                </Link>
                <span className="mx-2">/</span>
                <span>{boat.name}</span>
              </nav>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {boat.name}
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                {boat.shortDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Φωτογραφίες</h2>
              <ImageGallery images={boat.images} boatName={boat.name} />
            </div>

            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Περιγραφή</h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {boat.longDescription}
                </p>
              </div>

              {/* Pricing Information */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Τιμές</h2>
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg font-semibold text-gray-900">Ενοικίαση ημερησία</span>
                      <span className="text-2xl font-bold text-primary">€{boat.pricePerDay}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Η τιμή δεν περιλαμβάνει κάπετανο
                    </p>
                    {boat.priceNotes && (
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Σημείωση:</span> {boat.priceNotes}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <a
                  href="tel:+302101234567"
                  className="btn-primary w-full text-center block text-lg py-4"
                >
                  📞 Κλείσε τώρα
                </a>
                
                <a
                  href="#contact-form"
                  className="btn-secondary w-full text-center block text-lg py-4"
                >
                  📝 Στείλε Μήνυμα
                </a>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Βασικές Πληροφορίες</h2>
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="px-6 py-4 font-medium text-gray-900">Ονομασία</td>
                        <td className="px-6 py-4 text-gray-600">{boat.name}</td>
                      </tr>
                      {boat.manufacturer && (
                        <tr className="border-b border-gray-100">
                          <td className="px-6 py-4 font-medium text-gray-900">Κατασκευαστής</td>
                          <td className="px-6 py-4 text-gray-600">{boat.manufacturer}</td>
                        </tr>
                      )}
                      {boat.model && (
                        <tr className="border-b border-gray-100">
                          <td className="px-6 py-4 font-medium text-gray-900">Μοντέλο</td>
                          <td className="px-6 py-4 text-gray-600">{boat.model}</td>
                        </tr>
                      )}
                      {boat.yearBuilt && (
                        <tr className="border-b border-gray-100">
                          <td className="px-6 py-4 font-medium text-gray-900">Έτος κατασκευής</td>
                          <td className="px-6 py-4 text-gray-600">{boat.yearBuilt}</td>
                        </tr>
                      )}
                      {boat.yearRefurbished && (
                        <tr className="border-b border-gray-100">
                          <td className="px-6 py-4 font-medium text-gray-900">Έτος ανακατασκευής</td>
                          <td className="px-6 py-4 text-gray-600">{boat.yearRefurbished}</td>
                        </tr>
                      )}
                      {boat.boatType && (
                        <tr className="border-b border-gray-100">
                          <td className="px-6 py-4 font-medium text-gray-900">Τύπος σκάφους</td>
                          <td className="px-6 py-4 text-gray-600">{boat.boatType}</td>
                        </tr>
                      )}
                      {boat.length && (
                        <tr>
                          <td className="px-6 py-4 font-medium text-gray-900">Μήκος</td>
                          <td className="px-6 py-4 text-gray-600">{boat.length}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Χωρητικότητα & Εγκαταστάσεις</h2>
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="px-6 py-4 font-medium text-gray-900">Επισκέπτες πλεύσης</td>
                        <td className="px-6 py-4 text-gray-600">{boat.cruiseGuests || boat.capacity} άτομα</td>
                      </tr>
                      {boat.sleepGuests !== undefined && (
                        <tr className="border-b border-gray-100">
                          <td className="px-6 py-4 font-medium text-gray-900">Επισκέπτες ύπνου</td>
                          <td className="px-6 py-4 text-gray-600">{boat.sleepGuests} άτομα</td>
                        </tr>
                      )}
                      {boat.bathrooms !== undefined && (
                        <tr className="border-b border-gray-100">
                          <td className="px-6 py-4 font-medium text-gray-900">Μπάνια</td>
                          <td className="px-6 py-4 text-gray-600">{boat.bathrooms}</td>
                        </tr>
                      )}
                      {boat.kitchens !== undefined && (
                        <tr className="border-b border-gray-100">
                          <td className="px-6 py-4 font-medium text-gray-900">Κουζίνες</td>
                          <td className="px-6 py-4 text-gray-600">{boat.kitchens}</td>
                        </tr>
                      )}
                      {boat.cabins !== undefined && (
                        <tr>
                          <td className="px-6 py-4 font-medium text-gray-900">Καμπίνες</td>
                          <td className="px-6 py-4 text-gray-600">{boat.cabins}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Κινητήρας & Επιδόσεις</h2>
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="px-6 py-4 font-medium text-gray-900">Κινητήρας</td>
                        <td className="px-6 py-4 text-gray-600">{boat.engine}</td>
                      </tr>
                      {boat.fuelType && (
                        <tr className="border-b border-gray-100">
                          <td className="px-6 py-4 font-medium text-gray-900">Τύπος καυσίμου</td>
                          <td className="px-6 py-4 text-gray-600">{boat.fuelType}</td>
                        </tr>
                      )}
                      {boat.fuelConsumption && (
                        <tr className="border-b border-gray-100">
                          <td className="px-6 py-4 font-medium text-gray-900">Κατανάλωση</td>
                          <td className="px-6 py-4 text-gray-600">{boat.fuelConsumption}</td>
                        </tr>
                      )}
                      {boat.waterCapacity && (
                        <tr className="border-b border-gray-100">
                          <td className="px-6 py-4 font-medium text-gray-900">Χωρητικότητα νερού</td>
                          <td className="px-6 py-4 text-gray-600">{boat.waterCapacity}</td>
                        </tr>
                      )}
                      {boat.fuelCapacity && (
                        <tr className="border-b border-gray-100">
                          <td className="px-6 py-4 font-medium text-gray-900">Χωρητικότητα καυσίμου</td>
                          <td className="px-6 py-4 text-gray-600">{boat.fuelCapacity}</td>
                        </tr>
                      )}
                      {boat.maxSpeed && (
                        <tr className="border-b border-gray-100">
                          <td className="px-6 py-4 font-medium text-gray-900">Μέγιστη ταχύτητα πλεύσης</td>
                          <td className="px-6 py-4 text-gray-600">{boat.maxSpeed}</td>
                        </tr>
                      )}
                      <tr>
                        <td className="px-6 py-4 font-medium text-gray-900">Κάπετανος</td>
                        <td className="px-6 py-4 text-gray-600">Κατόπην συνενοήσεως</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Rules and Regulations Section */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Κανονισμοί</h2>
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Smoking Rules */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between py-3 border-b border-gray-100">
                          <span className="text-gray-700 font-medium">Κάπνισμα στο κατάστρωμα</span>
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            boat.smokingDeck 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {boat.smokingDeck ? 'Επιτρέπεται' : 'Απαγορεύεται'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between py-3 border-b border-gray-100">
                          <span className="text-gray-700 font-medium">Κάπνισμα μέσα στο σκάφος</span>
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            boat.smokingInside 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {boat.smokingInside ? 'Επιτρέπεται' : 'Απαγορεύεται'}
                          </span>
                        </div>
                      </div>

                      {/* Guest Rules */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between py-3 border-b border-gray-100">
                          <span className="text-gray-700 font-medium">Κατοικίδια</span>
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            boat.petsAllowed 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {boat.petsAllowed ? 'Κατάλληλο' : 'Ακατάλληλο'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between py-3 border-b border-gray-100">
                          <span className="text-gray-700 font-medium">Βρέφη</span>
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            boat.infantsAllowed 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {boat.infantsAllowed ? 'Κατάλληλο' : 'Ακατάλληλο'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between py-3 border-b border-gray-100">
                          <span className="text-gray-700 font-medium">Παιδιά</span>
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            boat.childrenAllowed 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {boat.childrenAllowed ? 'Κατάλληλο' : 'Ακατάλληλο'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between py-3 border-b border-gray-100">
                          <span className="text-gray-700 font-medium">Δεξιώσεις & Πάρτυ</span>
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            boat.partiesAllowed 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {boat.partiesAllowed ? 'Επιτρέπονται' : 'Απαγορεύονται'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Flexible Times */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700 font-medium">Ώρα άφιξης</span>
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            boat.flexibleArrival 
                              ? 'bg-blue-100 text-blue-700' 
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {boat.flexibleArrival ? 'Ευέλικτη' : 'Σταθερή'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700 font-medium">Ώρα αποχώρησης</span>
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            boat.flexibleDeparture 
                              ? 'bg-blue-100 text-blue-700' 
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {boat.flexibleDeparture ? 'Ευέλικτη' : 'Σταθερή'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-accent/10 border border-accent/20 rounded-xl p-6 mb-8">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">ℹ️</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Σχετικά με την Κράτηση</h3>
                    <p className="text-gray-600">
                      Δεν υπάρχει online κράτηση — καλέστε μας ή συμπληρώστε τη φόρμα επικοινωνίας για να κλείσετε την εκδρομή σας.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section id="contact-form" className="section-padding bg-muted">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Άλλα Σκάφη που μπορεί να σας ενδιαφέρουν
            </h2>
            <p className="text-lg text-gray-600">
              Δείτε και τα υπόλοιπα σκάφη του στόλου μας
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {boats
              .filter((otherBoat) => otherBoat.id !== boat.id)
              .slice(0, 2)
              .map((otherBoat) => (
                <Link key={otherBoat.id} href={`/boats/${otherBoat.slug}`}>
                  <div className="card hover:shadow-xl transition-all duration-300 cursor-pointer group">
                    <div className="aspect-video bg-gray-200 rounded-t-xl overflow-hidden relative">
                      <Image
                        src={otherBoat.images[0]}
                        alt={`${otherBoat.name} - Φωτογραφία`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {otherBoat.name}
                      </h3>
                      <p className="text-gray-600 mb-4">{otherBoat.shortDescription}</p>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>{otherBoat.capacity} άτομα</span>
                        <span>{otherBoat.engine}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/boats" className="btn-secondary">
              Δείτε Όλο τον Στόλο
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
