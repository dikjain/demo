import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import devMiddleware from './middleware.dev'
import prodMiddleware from './middleware.prod'

export function middleware(request: NextRequest) {
  // Use production middleware in production, development middleware in development
  if (process.env.NODE_ENV === 'development') {
    return devMiddleware(request)
  }
  return prodMiddleware(request)
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
} 