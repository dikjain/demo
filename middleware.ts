import { NextRequest, NextResponse } from 'next/server'
import { csp } from "./lib/csp"

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  csp(request, response)
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