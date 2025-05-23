import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'sha256-OBTN3RiyCV4Bq7dFqZ5a2pAXjnCcCYeTJMO2I/LYKeo=' 'sha256-hBon3PqqS39pSofnUHcZ8dqrEcULNjUIBeTB8SKbC8s=' 'sha256-0makPRlKtUeA3XTzXbL9MnZywRkdKY8eWdrAqSwpmNc=';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://userology-figma.s3.us-west-2.amazonaws.com;
    font-src 'self' https://fonts.gstatic.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    connect-src 'self' https://securetoken.googleapis.com https://dev.userology.co https://dev.userologyai.com https://userology.info https://userologyai.com https://userology.co wss://*.userology.co https://www.figma.com https://embed.figma.com https://userology-figma.s3.us-west-2.amazonaws.com https://identitytoolkit.googleapis.com https://*.userologyai.com https://dev.userology.info https://*.userology.co https://*.userology.info https://api.mixpanel.com https://*.mxpnl.com https://api-js.mixpanel.com;
    media-src 'self';
    worker-src 'self';
    manifest-src 'self';
    child-src 'self';
    frame-src 'self';
    block-all-mixed-content;
    upgrade-insecure-requests;
  `

  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, ' ')
    .trim()

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue
  )

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
  response.headers.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue
  )

  return response
}

export const config = {
  matcher: [
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
} 