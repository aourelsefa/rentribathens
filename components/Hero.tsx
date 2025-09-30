import Image from 'next/image';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaPhone: string;
  backgroundImage?: string;
  className?: string;
}

export default function Hero({ 
  title, 
  subtitle, 
  ctaText, 
  ctaPhone,
  backgroundImage,
  className = '' 
}: HeroProps) {
  return (
    <section className={`relative overflow-hidden ${className}`}>
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt="Hero background"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />
        </div>
      )}

      {/* Gradient Overlay (when no background image) */}
      {!backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80" />
      )}

      {/* Content */}
      <div className="relative z-10 h-[70vh] flex items-end pb-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-end">
            {/* Left Side - Text Content */}
            <div className="text-white">
              <div className="mb-6">
                <span className="inline-block bg-primary text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                  🚤 Ενοικίαση RIB Σκαφών
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
                Ανακαλύψτε τον Σαρωνικό
              </h1>
              
              <p className="text-lg md:text-xl mb-8 opacity-90 leading-relaxed drop-shadow-md">
                {subtitle}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={`tel:${ctaPhone}`}
                  className="bg-white text-primary px-8 py-3 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-center"
                >
                  📞 {ctaText}
                </a>
                <a
                  href="/boats"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary transition-all duration-200 text-center"
                >
                  Δείτε Σκάφη
                </a>
              </div>
            </div>

            {/* Right Side - Features */}
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-white text-xl font-semibold mb-4">Γιατί να επιλέξετε εμάς;</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-white/90">
                    <span className="text-accent mr-3">✓</span>
                    <span>Άμεση κράτηση & διαθεσιμότητα</span>
                  </div>
                  <div className="flex items-center text-white/90">
                    <span className="text-accent mr-3">✓</span>
                    <span>Επαγγελματικός εξοπλισμός ασφαλείας</span>
                  </div>
                  <div className="flex items-center text-white/90">
                    <span className="text-accent mr-3">✓</span>
                    <span>Δωρεάν συμβουλές & υποστήριξη</span>
                  </div>
                  <div className="flex items-center text-white/90">
                    <span className="text-accent mr-3">✓</span>
                    <span>Βέλτιστη θέση στο Λαγονήσι</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent z-10" />
    </section>
  );
}
