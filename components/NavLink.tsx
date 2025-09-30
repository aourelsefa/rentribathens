import Link from 'next/link';
import { ReactNode } from 'react';

interface NavLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  isActive?: boolean;
  onClick?: () => void;
}

export default function NavLink({ 
  href, 
  children, 
  className = '', 
  isActive = false,
  onClick 
}: NavLinkProps) {
  const baseClasses = 'text-gray-700 hover:text-primary transition-colors duration-200 font-medium';
  const activeClasses = 'text-primary border-b-2 border-primary';
  const combinedClasses = `${baseClasses} ${isActive ? activeClasses : ''} ${className}`;

  return (
    <Link 
      href={href} 
      className={combinedClasses}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
