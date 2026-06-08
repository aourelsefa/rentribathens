'use client';

import { ReactNode } from 'react';
import { trackPhoneClick } from '@/lib/analytics';

interface PhoneLinkProps {
  phone: string;
  children: ReactNode;
  className?: string;
  trackingLocation: string;
  buttonText?: string;
  boatName?: string;
}

export default function PhoneLink({
  phone,
  children,
  className = '',
  trackingLocation,
  buttonText,
  boatName,
}: PhoneLinkProps) {
  const handleClick = () => {
    trackPhoneClick({
      buttonLocation: trackingLocation,
      buttonText,
      boatName,
    });
  };

  return (
    <a href={`tel:${phone}`} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
