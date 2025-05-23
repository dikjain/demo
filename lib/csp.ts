import type { NextRequest, NextResponse } from "next/server";

export function csp(req: NextRequest, res: NextResponse | null) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'unsafe-eval';
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
  `.replace(/\s{2,}/g, " ").trim();

  if (res) {
    res.headers.set("Content-Security-Policy", cspHeader);
    res.headers.set("x-nonce", nonce);
  }

  return { nonce };
} 