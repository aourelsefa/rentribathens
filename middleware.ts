import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['el', 'en'];
const defaultLocale = 'el';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for:
  // - API routes
  // - Static files (_next/static, images, etc.)
  // - Files with extensions
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/images/') ||
    pathname.startsWith('/rib/') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  // If someone visits /el or /el/*, redirect to remove /el prefix
  if (pathname === '/el' || pathname.startsWith('/el/')) {
    const newPath = pathname === '/el' ? '/' : pathname.replace('/el', '');
    const newUrl = new URL(newPath, request.url);
    return NextResponse.redirect(newUrl);
  }

  // If path starts with /en, rewrite internally to /en (already has locale)
  if (pathname.startsWith('/en')) {
    // Already has /en prefix, let it through to [locale] route
    return NextResponse.next();
  }

  // For all other paths (root level like /, /fleet, etc.), rewrite to /el internally
  // This way Greek is at root level but internally served from [locale] structure
  const rewritePath = `/el${pathname === '/' ? '' : pathname}`;
  const url = request.nextUrl.clone();
  url.pathname = rewritePath;

  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (image files)
     * - rib (rib folder)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images|rib).*)',
  ],
};
