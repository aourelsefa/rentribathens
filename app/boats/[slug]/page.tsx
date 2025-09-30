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

// Generate static params for SSG
export async function generateStaticParams() {
  return boats.map((boat) => ({
    slug: boat.slug,
  }));
}

// Get boat data by slug
async function getBoatBySlug(slug: string): Promise<Boat | null> {
  return boats.find((boat) => boat.slug === slug) || null;
}

// Generate metadata for each boat
export async function generateMetadata({ params }: BoatDetailPageProps): Promise<Metadata> {
  const boat = await getBoatBySlug(params.slug);
  
  if (!boat) {
    return {
      title: 'Σκάφος δεν βρέθηκε',
    };
  }

  return {
    title: boat.name,
    description: `${boat.shortDescription} Ενοικίαση ${boat.name} για περιηγήσεις στον Σαρωνικό. Χωρητικότητα: ${boat.capacity} άτομα.`,
    openGraph: {
      title: `${boat.name} - RentRibAthens`,
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

      {/* Hero Section */}
      <section className="bg-primary text-white">
        <div className="section-padding">
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

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Gallery */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Φωτογραφίες</h2>
              <ImageGallery images={boat.images} boatName={boat.name} />
            </div>

            {/* Right Column - Details */}
            <div>
              {/* Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Περιγραφή</h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {boat.longDescription}
                </p>
              </div>

              {/* Specifications */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Τεχνικά Χαρακτηριστικά</h2>
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="px-6 py-4 font-medium text-gray-900">Μοντέλο</td>
                        <td className="px-6 py-4 text-gray-600">{boat.name}</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="px-6 py-4 font-medium text-gray-900">Χωρητικότητα</td>
                        <td className="px-6 py-4 text-gray-600">{boat.capacity} άτομα</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="px-6 py-4 font-medium text-gray-900">Κινητήρας</td>
                        <td className="px-6 py-4 text-gray-600">{boat.engine}</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="px-6 py-4 font-medium text-gray-900">Τύπος</td>
                        <td className="px-6 py-4 text-gray-600">RIB (Rigid Inflatable Boat)</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="px-6 py-4 font-medium text-gray-900">Εξοπλισμός</td>
                        <td className="px-6 py-4 text-gray-600">
                          Ζωσωστικά, αγκυροβόλιο, πυροσβεστήρες, GPS, ραδιόφωνο
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium text-gray-900">Κάπετανος</td>
                        <td className="px-6 py-4 text-gray-600">Συμπεριλαμβάνεται</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Booking Notice */}
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

              {/* CTA Buttons */}
              <div className="space-y-4">
                <a
                  href="tel:+302101234567"
                  className="btn-primary w-full text-center block text-lg py-4"
                >
                  📞 Κλείσε Τηλέφωνο
                </a>
                
                <a
                  href="#contact-form"
                  className="btn-secondary w-full text-center block text-lg py-4"
                >
                  📝 Στείλε Μήνυμα
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="section-padding bg-muted">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Related Boats */}
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {boats
              .filter((otherBoat) => otherBoat.id !== boat.id)
              .slice(0, 3)
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
