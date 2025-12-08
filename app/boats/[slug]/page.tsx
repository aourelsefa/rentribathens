import { boats, type Boat } from '@/data/boats';
import Image from 'next/image';
import ContactForm from '@/components/ContactForm';
import ImageGalleryModal from '@/components/ImageGalleryModal';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface BoatDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return boats.map(boat => ({
    slug: boat.slug,
  }));
}

async function getBoatBySlug(slug: string): Promise<Boat | null> {
  return boats.find(boat => boat.slug === slug) || null;
}

export async function generateMetadata({
  params,
}: BoatDetailPageProps): Promise<Metadata> {
  const boat = await getBoatBySlug(params.slug);

  if (!boat) {
    return {
      title: 'Σκάφος δεν βρέθηκε',
    };
  }

  return {
    title: boat.name,
    description:
      boat.shortDescription +
      ' Ενοικίαση ' +
      boat.name +
      ' για περιηγήσεις στον Σαρωνικό. Χωρητικότητα: ' +
      boat.capacity +
      ' άτομα.',
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
      {/* Hero Section - Modern Design */}
      <section className='relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white overflow-hidden'>
        <div className='absolute inset-0 opacity-10'>
          <div
            className='absolute inset-0'
            style={{
              backgroundImage: `url(${boat.images[0]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(40px)',
            }}
          ></div>
        </div>

        <div className='relative z-10 section-padding'>
          <div className='container-custom'>
            <div className='max-w-6xl mx-auto'>
              <nav className='text-sm mb-6 opacity-80'>
                <Link href='/' className='hover:text-accent transition-colors'>
                  Αρχική
                </Link>
                <span className='mx-2'>/</span>
                <Link
                  href='/boats'
                  className='hover:text-accent transition-colors'
                >
                  Στόλος
                </Link>
                <span className='mx-2'>/</span>
                <span>{boat.name}</span>
              </nav>

              <div className='grid lg:grid-cols-2 gap-12 items-center'>
                <div>
                  {boat.manufacturer && (
                    <div className='inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-4'>
                      {boat.manufacturer} {boat.model}
                    </div>
                  )}
                  <h1 className='text-5xl md:text-6xl font-bold mb-6'>
                    {boat.name}
                  </h1>
                  <p className='text-xl md:text-2xl mb-8 opacity-90 leading-relaxed'>
                    {boat.shortDescription}
                  </p>

                  {/* Quick Stats */}
                  <div className='grid grid-cols-3 gap-4'>
                    <div className='bg-white/10 backdrop-blur-sm rounded-lg p-4'>
                      <div className='text-3xl font-bold mb-1'>
                        {boat.capacity}
                      </div>
                      <div className='text-sm opacity-80'>Άτομα</div>
                    </div>
                    <div className='bg-white/10 backdrop-blur-sm rounded-lg p-4'>
                      <div className='text-3xl font-bold mb-1'>
                        {boat.engine}
                      </div>
                      <div className='text-sm opacity-80'>Κινητήρας</div>
                    </div>
                    <div className='bg-white/10 backdrop-blur-sm rounded-lg p-4'>
                      <div className='text-3xl font-bold mb-1'>
                        €{boat.pricePerDay}
                      </div>
                      <div className='text-sm opacity-80'>/ ημέρα</div>
                    </div>
                  </div>
                </div>

                <div className='relative'>
                  <div className='relative aspect-video rounded-2xl overflow-hidden shadow-2xl'>
                    <Image
                      src={boat.images[0]}
                      alt={boat.name}
                      fill
                      className='object-cover'
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Modern Layout */}
      <section className='section-padding'>
        <div className='container-custom'>
          <div className='max-w-6xl mx-auto'>
            {/* Image Gallery - Horizontal Scroll with Modal */}
            <div className='mb-16'>
              <h2 className='text-3xl font-bold text-gray-900 mb-6'>
                Φωτογραφίες
              </h2>
              <ImageGalleryModal images={boat.images} boatName={boat.name} />
            </div>

            <div className='grid lg:grid-cols-3 gap-12'>
              {/* Main Content */}
              <div className='lg:col-span-2'>
                {/* Description */}
                <div className='mb-12'>
                  <h2 className='text-3xl font-bold text-gray-900 mb-6'>
                    Περιγραφή
                  </h2>
                  <div className='prose prose-lg max-w-none'>
                    <p className='text-gray-700 leading-relaxed text-lg'>
                      {boat.longDescription}
                    </p>
                  </div>
                </div>

                {/* Specifications - Card Style */}
                <div className='mb-12'>
                  <h2 className='text-3xl font-bold text-gray-900 mb-6'>
                    Τεχνικά Χαρακτηριστικά
                  </h2>
                  <div className='grid md:grid-cols-2 gap-4'>
                    {boat.manufacturer && (
                      <div className='bg-gray-50 rounded-xl p-6 border border-gray-200'>
                        <div className='text-sm text-gray-500 mb-2'>
                          Κατασκευαστής
                        </div>
                        <div className='text-xl font-bold text-gray-900'>
                          {boat.manufacturer}
                        </div>
                      </div>
                    )}
                    {boat.model && (
                      <div className='bg-gray-50 rounded-xl p-6 border border-gray-200'>
                        <div className='text-sm text-gray-500 mb-2'>
                          Μοντέλο
                        </div>
                        <div className='text-xl font-bold text-gray-900'>
                          {boat.model}
                        </div>
                      </div>
                    )}
                    {boat.yearBuilt && (
                      <div className='bg-gray-50 rounded-xl p-6 border border-gray-200'>
                        <div className='text-sm text-gray-500 mb-2'>
                          Έτος Κατασκευής
                        </div>
                        <div className='text-xl font-bold text-gray-900'>
                          {boat.yearBuilt}
                        </div>
                      </div>
                    )}
                    {boat.yearRefurbished && (
                      <div className='bg-gray-50 rounded-xl p-6 border border-gray-200'>
                        <div className='text-sm text-gray-500 mb-2'>
                          Έτος Ανακατασκευής
                        </div>
                        <div className='text-xl font-bold text-gray-900'>
                          {boat.yearRefurbished}
                        </div>
                      </div>
                    )}
                    {boat.boatType && (
                      <div className='bg-gray-50 rounded-xl p-6 border border-gray-200'>
                        <div className='text-sm text-gray-500 mb-2'>
                          Τύπος Σκάφους
                        </div>
                        <div className='text-xl font-bold text-gray-900'>
                          {boat.boatType}
                        </div>
                      </div>
                    )}
                    {boat.length && (
                      <div className='bg-gray-50 rounded-xl p-6 border border-gray-200'>
                        <div className='text-sm text-gray-500 mb-2'>Μήκος</div>
                        <div className='text-xl font-bold text-gray-900'>
                          {boat.length}
                        </div>
                      </div>
                    )}
                    {boat.fuelCapacity && (
                      <div className='bg-gray-50 rounded-xl p-6 border border-gray-200'>
                        <div className='text-sm text-gray-500 mb-2'>
                          Χωρητικότητα Καυσίμου
                        </div>
                        <div className='text-xl font-bold text-gray-900'>
                          {boat.fuelCapacity}
                        </div>
                      </div>
                    )}
                    {boat.maxSpeed && (
                      <div className='bg-gray-50 rounded-xl p-6 border border-gray-200'>
                        <div className='text-sm text-gray-500 mb-2'>
                          Μέγιστη Ταχύτητα
                        </div>
                        <div className='text-xl font-bold text-gray-900'>
                          {boat.maxSpeed}
                        </div>
                      </div>
                    )}
                    {boat.fuelType && (
                      <div className='bg-gray-50 rounded-xl p-6 border border-gray-200'>
                        <div className='text-sm text-gray-500 mb-2'>
                          Τύπος Καυσίμου
                        </div>
                        <div className='text-xl font-bold text-gray-900'>
                          {boat.fuelType}
                        </div>
                      </div>
                    )}
                    {boat.fuelConsumption && (
                      <div className='bg-gray-50 rounded-xl p-6 border border-gray-200'>
                        <div className='text-sm text-gray-500 mb-2'>
                          Κατανάλωση
                        </div>
                        <div className='text-xl font-bold text-gray-900'>
                          {boat.fuelConsumption}
                        </div>
                      </div>
                    )}
                    {boat.waterCapacity && (
                      <div className='bg-gray-50 rounded-xl p-6 border border-gray-200'>
                        <div className='text-sm text-gray-500 mb-2'>
                          Χωρητικότητα Νερού
                        </div>
                        <div className='text-xl font-bold text-gray-900'>
                          {boat.waterCapacity}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Capacity & Facilities */}
                <div className='mb-12'>
                  <h2 className='text-3xl font-bold text-gray-900 mb-6'>
                    Χωρητικότητα & Εγκαταστάσεις
                  </h2>
                  <div className='bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 border border-primary/10'>
                    <div className='grid md:grid-cols-3 gap-6'>
                      <div className='text-center'>
                        <div className='text-4xl mb-2'>👥</div>
                        <div className='text-2xl font-bold text-gray-900 mb-1'>
                          {boat.cruiseGuests || boat.capacity}
                        </div>
                        <div className='text-sm text-gray-600'>Επισκέπτες</div>
                      </div>
                      {boat.sleepGuests !== undefined && (
                        <div className='text-center'>
                          <div className='text-4xl mb-2'>🛏️</div>
                          <div className='text-2xl font-bold text-gray-900 mb-1'>
                            {boat.sleepGuests}
                          </div>
                          <div className='text-sm text-gray-600'>
                            Επισκέπτες Ύπνου
                          </div>
                        </div>
                      )}
                      {boat.bathrooms !== undefined && (
                        <div className='text-center'>
                          <div className='text-4xl mb-2'>🚿</div>
                          <div className='text-2xl font-bold text-gray-900 mb-1'>
                            {boat.bathrooms}
                          </div>
                          <div className='text-sm text-gray-600'>Μπάνια</div>
                        </div>
                      )}
                      {boat.cabins !== undefined && (
                        <div className='text-center'>
                          <div className='text-4xl mb-2'>🛏️</div>
                          <div className='text-2xl font-bold text-gray-900 mb-1'>
                            {boat.cabins || 0}
                          </div>
                          <div className='text-sm text-gray-600'>Καμπίνες</div>
                        </div>
                      )}
                      {boat.kitchens !== undefined && (
                        <div className='text-center'>
                          <div className='text-4xl mb-2'>🍳</div>
                          <div className='text-2xl font-bold text-gray-900 mb-1'>
                            {boat.kitchens}
                          </div>
                          <div className='text-sm text-gray-600'>Κουζίνες</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Rules - Modern Style */}
                <div className='mb-12'>
                  <h2 className='text-3xl font-bold text-gray-900 mb-6'>
                    Κανονισμοί & Κανόνες
                  </h2>
                  <div className='grid md:grid-cols-2 gap-4'>
                    {boat.smokingDeck !== undefined && (
                      <div className='flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl'>
                        <span className='text-gray-700 font-medium'>
                          Κάπνισμα στο κατάστρωμα
                        </span>
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-semibold ${
                            boat.smokingDeck
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {boat.smokingDeck
                            ? '✓ Επιτρέπεται'
                            : '✗ Απαγορεύεται'}
                        </span>
                      </div>
                    )}
                    {boat.smokingInside !== undefined && (
                      <div className='flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl'>
                        <span className='text-gray-700 font-medium'>
                          Κάπνισμα μέσα στο σκάφος
                        </span>
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-semibold ${
                            boat.smokingInside
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {boat.smokingInside
                            ? '✓ Επιτρέπεται'
                            : '✗ Απαγορεύεται'}
                        </span>
                      </div>
                    )}
                    {boat.infantsAllowed !== undefined && (
                      <div className='flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl'>
                        <span className='text-gray-700 font-medium'>Βρέφη</span>
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-semibold ${
                            boat.infantsAllowed
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {boat.infantsAllowed ? '✓ Κατάλληλο' : '✗ Ακατάλληλο'}
                        </span>
                      </div>
                    )}
                    {boat.childrenAllowed !== undefined && (
                      <div className='flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl'>
                        <span className='text-gray-700 font-medium'>
                          Παιδιά
                        </span>
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-semibold ${
                            boat.childrenAllowed
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {boat.childrenAllowed
                            ? '✓ Κατάλληλο'
                            : '✗ Ακατάλληλο'}
                        </span>
                      </div>
                    )}
                    {boat.partiesAllowed !== undefined && (
                      <div className='flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl'>
                        <span className='text-gray-700 font-medium'>
                          Δεξιώσεις & Πάρτυ
                        </span>
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-semibold ${
                            boat.partiesAllowed
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {boat.partiesAllowed
                            ? '✓ Επιτρέπονται'
                            : '✗ Απαγορεύονται'}
                        </span>
                      </div>
                    )}
                    {boat.flexibleArrival !== undefined && (
                      <div className='flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl'>
                        <span className='text-gray-700 font-medium'>
                          Ώρα άφιξης
                        </span>
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-semibold ${
                            boat.flexibleArrival
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {boat.flexibleArrival ? 'Ευέλικτη' : 'Σταθερή'}
                        </span>
                      </div>
                    )}
                    {boat.flexibleDeparture !== undefined && (
                      <div className='flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl'>
                        <span className='text-gray-700 font-medium'>
                          Ώρα αποχώρησης
                        </span>
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-semibold ${
                            boat.flexibleDeparture
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {boat.flexibleDeparture ? 'Ευέλικτη' : 'Σταθερή'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className='lg:col-span-1'>
                {/* Pricing Card - Sticky */}
                <div className='sticky top-24 mb-6'>
                  <div className='bg-primary text-white rounded-2xl p-8 shadow-xl'>
                    <div className='text-center mb-6'>
                      <div className='text-5xl font-bold mb-2'>
                        €{boat.pricePerDay}
                      </div>
                      <div className='text-lg opacity-90'>ανά ημέρα</div>
                      <div className='text-sm opacity-75 mt-2'>
                        *Δεν περιλαμβάνει κάπετανο
                      </div>
                      {boat.priceNotes && (
                        <div className='text-sm opacity-75 mt-1'>
                          {boat.priceNotes}
                        </div>
                      )}
                    </div>

                    <div className='space-y-3 mb-6'>
                      <a
                        href='tel:+306978277120'
                        className='block w-full bg-white text-primary px-6 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-200 text-center text-lg'
                      >
                        📞 Κλείσε Τώρα
                      </a>
                      <a
                        href='#contact-form'
                        className='block w-full border-2 border-white text-white px-6 py-4 rounded-xl font-semibold hover:bg-white hover:text-primary transition-all duration-200 text-center text-lg'
                      >
                        📝 Στείλε Μήνυμα
                      </a>
                    </div>

                    <div className='pt-6 border-t border-white/20'>
                      <div className='text-sm space-y-2'>
                        <div className='flex items-center justify-between'>
                          <span className='opacity-80'>Χωρητικότητα:</span>
                          <span className='font-semibold'>
                            {boat.capacity} άτομα
                          </span>
                        </div>
                        <div className='flex items-center justify-between'>
                          <span className='opacity-80'>Κινητήρας:</span>
                          <span className='font-semibold'>{boat.engine}</span>
                        </div>
                        {boat.length && (
                          <div className='flex items-center justify-between'>
                            <span className='opacity-80'>Μήκος:</span>
                            <span className='font-semibold'>{boat.length}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rental Options */}
                <div className='bg-white border-2 border-gray-200 rounded-xl p-6 mb-6'>
                  <h3 className='text-xl font-bold text-gray-900 mb-4'>
                    Επιλογές Ενοικίασης
                  </h3>
                  <div className='space-y-4'>
                    <div className='flex items-start'>
                      <div className='w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0'>
                        <span className='text-accent text-xl'>👨‍✈️</span>
                      </div>
                      <div>
                        <div className='font-semibold text-gray-900 mb-1'>
                          Με Κάπετανο
                        </div>
                        <div className='text-sm text-gray-600'>
                          Επαγγελματικός κάπετανος με πιστοποίηση
                        </div>
                      </div>
                    </div>
                    <div className='flex items-start'>
                      <div className='w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0'>
                        <span className='text-primary text-xl'>🚤</span>
                      </div>
                      <div>
                        <div className='font-semibold text-gray-900 mb-1'>
                          Χωρίς Κάπετανο
                        </div>
                        <div className='text-sm text-gray-600'>
                          Απαιτείται άδεια οδήγησης σκάφους
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3'>
                    <div className='flex items-start'>
                      <span className='text-blue-600 mr-2 text-sm'>ℹ️</span>
                      <p className='text-xs text-blue-800'>
                        Για ενοικίαση χωρίς κάπετανο, απαιτείται έγκυρη άδεια
                        οδήγησης σκάφους και εμπειρία στη ναυσιπλοΐα.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Info */}
                <div className='bg-gray-50 rounded-xl p-6'>
                  <h3 className='text-lg font-bold text-gray-900 mb-4'>
                    Πληροφορίες
                  </h3>
                  <div className='space-y-3 text-sm'>
                    <div className='flex items-center justify-between'>
                      <span className='text-gray-600'>Φωτογραφίες:</span>
                      <span className='font-semibold text-gray-900'>
                        {boat.images.length}
                      </span>
                    </div>
                    <div className='flex items-center justify-between'>
                      <span className='text-gray-600'>Κατάσταση:</span>
                      <span className='font-semibold text-green-600'>
                        Διαθέσιμο
                      </span>
                    </div>
                    {boat.yearRefurbished && (
                      <div className='flex items-center justify-between'>
                        <span className='text-gray-600'>Ανακατασκευή:</span>
                        <span className='font-semibold text-gray-900'>
                          {boat.yearRefurbished}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id='contact-form' className='section-padding bg-muted'>
        <div className='container-custom'>
          <div className='max-w-2xl mx-auto'>
            <ContactForm />
          </div>
        </div>
      </section>

      <section className='section-padding'>
        <div className='container-custom'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>
              Άλλα Σκάφη που μπορεί να σας ενδιαφέρουν
            </h2>
            <p className='text-lg text-gray-600'>
              Δείτε και τα υπόλοιπα σκάφη του στόλου μας
            </p>
          </div>

          <div className='grid md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
            {boats
              .filter(otherBoat => otherBoat.id !== boat.id)
              .slice(0, 2)
              .map(otherBoat => (
                <Link key={otherBoat.id} href={`/boats/${otherBoat.slug}`}>
                  <div className='card hover:shadow-xl transition-all duration-300 cursor-pointer group'>
                    <div className='aspect-video bg-gray-200 rounded-t-xl overflow-hidden relative'>
                      <Image
                        src={otherBoat.images[0]}
                        alt={`${otherBoat.name} - Φωτογραφία`}
                        fill
                        className='object-cover group-hover:scale-105 transition-transform duration-300'
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                      />
                    </div>
                    <div className='p-6'>
                      <h3 className='text-xl font-semibold mb-2 group-hover:text-primary transition-colors'>
                        {otherBoat.name}
                      </h3>
                      <p className='text-gray-600 mb-4'>
                        {otherBoat.shortDescription}
                      </p>
                      <div className='flex justify-between items-center text-sm text-gray-500'>
                        <span>{otherBoat.capacity} άτομα</span>
                        <span>{otherBoat.engine}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>

          <div className='text-center mt-12'>
            <Link href='/boats' className='btn-secondary'>
              Δείτε Όλο τον Στόλο
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
