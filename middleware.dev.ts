import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Function to generate a random nonce using Web Crypto API
function generateNonce(): string {
  const array = new Uint8Array(16)
  crypto.getRandomValues(array)
  return Array.from(array)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

export default function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Generate a random nonce for each request
  const nonce = generateNonce()

  // Development CSP - more permissive but still secure
  response.headers.set(
    'Content-Security-Policy',
    `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline'  https://securetoken.googleapis.com https://dev.userology.co https://www.figma.com https://embed.figma.com https://identitytoolkit.googleapis.com https://*.userology.co https://*.userologyai.com https://*.userology.info https://cdn.mxpnl.com;
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      img-src 'self' data: blob: https: https://userology-figma.s3.us-west-2.amazonaws.com;
      font-src 'self' https://fonts.gstatic.com;
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'none';
      connect-src 'self' https://securetoken.googleapis.com https://dev.userology.co https://dev.userologyai.com https://userology.info https://userologyai.com https://userology.co wss://*.userology.co https://www.figma.com https://embed.figma.com https://userology-figma.s3.us-west-2.amazonaws.com https://identitytoolkit.googleapis.com https://*.userologyai.com https://*.userology.* https://dev.userology.info https://*.userology.co https://*.userology.info https://api.mixpanel.com https://*.mxpnl.com https://api-js.mixpanel.com;
      media-src 'self';
      worker-src 'self';
      manifest-src 'self';
      child-src 'self';
      frame-src 'self';
      block-all-mixed-content;
      upgrade-insecure-requests;
    `.replace(/\s+/g, ' ').trim()
  )

  // Additional security headers
  response.headers.set('X-DNS-Prefetch-Control', 'on')
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), interest-cohort=()')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('X-Permitted-Cross-Domain-Policies', 'none')

  // Set nonce as a cookie
  response.cookies.set('nonce', nonce, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/'
  })

  return response
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