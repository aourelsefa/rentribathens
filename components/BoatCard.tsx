import Image from 'next/image';
import Link from 'next/link';

interface Boat {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  capacity: number;
  engine: string;
  images: string[];
  pricePerDay: number;
}

interface BoatCardProps {
  boat: Boat;
  className?: string;
}

export default function BoatCard({ boat, className = '' }: BoatCardProps) {
  const primaryImage = boat.images[0] || '/images/boat-placeholder.jpg';

  return (
    <Link 
      href={`/boats/${boat.slug}`}
      className={`card group hover:shadow-xl transition-all duration-300 cursor-pointer block ${className}`}
    >
      {/* Image Container */}
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={primaryImage}
          alt={`${boat.name} - RIB σκάφος`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
        
        {/* Capacity badge */}
        <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
          {boat.capacity} άτομα
        </div>
        
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-200">
          {boat.name}
        </h3>

        {/* Short Description */}
        <p className="text-gray-600 mb-4 line-clamp-2">
          {boat.shortDescription}
        </p>

        {/* Specs Row */}
        <div className="flex justify-between items-center text-sm text-gray-500 mb-6 border-t border-gray-100 pt-4">
          <div className="flex items-center space-x-2">
            <span>👥</span>
            <span>{boat.capacity} άτομα</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>⚙️</span>
            <span>{boat.engine}</span>
          </div>
        </div>

        {/* Price Row */}
        <div className="flex justify-start items-center text-sm text-gray-500 mb-6">
          <div className="flex items-center space-x-2">
            <span>💰</span>
            <span className="font-semibold text-primary">€{boat.pricePerDay}/ημέρα</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="btn-primary w-full text-center block group-hover:bg-opacity-90 transition-all duration-200">
          Περισσότερα
        </div>
      </div>
    </Link>
  );
}
