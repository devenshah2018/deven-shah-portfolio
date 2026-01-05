import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const pathname = request.nextUrl.pathname;
  const searchParams = request.nextUrl.searchParams;
  
  // Check for research subdomain in multiple ways:
  // 1. Subdomain in hostname (works in Chrome/Firefox)
  // 2. Query parameter ?subdomain=research (Safari fallback)
  // 3. Direct /research path on localhost (Safari fallback)
  const isResearchSubdomain = 
    hostname.startsWith('research.') || 
    hostname.includes('research.') ||
    searchParams.get('subdomain') === 'research' ||
    (pathname.startsWith('/research') && (hostname.includes('localhost') || hostname.includes('127.0.0.1')));

  // Add header to indicate subdomain for use in components
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-subdomain', isResearchSubdomain ? 'research' : 'main');

  // Rewrite routes on research subdomain to remove /research prefix
  if (isResearchSubdomain) {
    // If accessing via subdomain (not direct /research path), clean up URLs
    const isSubdomainAccess = hostname.startsWith('research.') || hostname.includes('research.');
    
    if (isSubdomainAccess) {
      // Redirect /research to / for cleaner URLs on subdomain
      if (pathname === '/research') {
        return NextResponse.redirect(new URL('/', request.url));
      }
      
      // Redirect /research/[paperId] to /[paperId] for cleaner URLs on subdomain
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
      // Only rewrite if it's not an API route, static file, studies route, or demos
      if (!pathname.startsWith('/api') && 
          !pathname.startsWith('/_next') && 
          !pathname.startsWith('/studies') &&
          !pathname.startsWith('/demos') &&
          pathname !== '/') {
        return NextResponse.rewrite(new URL(`/research${pathname}`, request.url), {
          request: {
            headers: requestHeaders,
          },
        });
      }
    } else {
      // Direct /research path access (Safari fallback) - just pass through with header
      // The /research route will handle rendering
      // For /research/[paperId], rewrite to /research/[paperId] (already correct)
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

