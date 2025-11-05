import { ReactNode } from 'react';

interface ServiceCardProps {
  title: string;
  shortDescription: string;
  icon: ReactNode;
  className?: string;
}

export default function ServiceCard({
  title,
  shortDescription,
  icon,
  className = '',
}: ServiceCardProps) {
  return (
    <div className={`text-center group ${className}`}>
      {/* Icon Container */}
      <div className='w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary transition-colors duration-300'>
        <div className='text-primary group-hover:text-white transition-colors duration-300'>
          {icon}
        </div>
      </div>

      {/* Title */}
      <h3 className='text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-200'>
        {title}
      </h3>

      {/* Description */}
      <p className='text-gray-600 leading-relaxed'>{shortDescription}</p>
    </div>
  );
}
