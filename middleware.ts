import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const isResearchSubdomain = hostname.startsWith('research.') || hostname.includes('research.');
  const pathname = request.nextUrl.pathname;

  // Add header to indicate subdomain for use in components
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-subdomain', isResearchSubdomain ? 'research' : 'main');

  // Rewrite routes on research subdomain to remove /research prefix
  if (isResearchSubdomain) {
    // Redirect /research to / for cleaner URLs
    if (pathname === '/research') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    
    // Redirect /research/[paperId] to /[paperId] for cleaner URLs
    if (pathname.startsWith('/research/') && pathname !== '/research') {
      const paperId = pathname.replace('/research', '');
      return NextResponse.redirect(new URL(paperId, request.url));
    }
    
    // Root path -> serve research index
    if (pathname === '/') {
      return NextResponse.rewrite(new URL('/research', request.url), {
        request: {
          headers: requestHeaders,
        },
      });
    }
    
    // /[paperId] -> serve /research/[paperId]
    // Only rewrite if it's not an API route or static file
    if (!pathname.startsWith('/api') && !pathname.startsWith('/_next') && pathname !== '/') {
      return NextResponse.rewrite(new URL(`/research${pathname}`, request.url), {
        request: {
          headers: requestHeaders,
        },
      });
    }
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

