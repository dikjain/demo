import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document({ nonce }: { nonce?: string }) {
  return (
    <Html lang="en">
      <Head nonce={nonce}>
        <Script
          id="mixpanel-init"
          strategy="beforeInteractive"
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: `
              window.mixpanel = window.mixpanel || [];
              window.mixpanel.init('${process.env.NEXT_PUBLIC_MIXPANEL_TOKEN}', {
                debug: process.env.NODE_ENV === 'development',
                track_pageview: true,
                persistence: 'localStorage'
              });
            `
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript nonce={nonce} />
      </body>
    </Html>
  )
} 