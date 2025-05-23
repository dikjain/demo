import { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import Script from 'next/script'

export default function Document({ nonce }: { nonce?: string }) {
  return (
    <Html lang="en">
      <Head nonce={nonce}>
        <Script
          id="nonce-script"
          nonce={nonce}
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.__NONCE__ = "${nonce}";`
          }}
        />
        <script
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: `
              // Initialize any global variables or configurations
              window.__NONCE__ = "${nonce}";
              window.__ENV__ = "${process.env.NODE_ENV}";
            `
          }}
        />
        <script
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: `
              // Add any polyfills or feature detection
              if (!window.crypto) {
                window.crypto = window.msCrypto;
              }
            `
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript nonce={nonce} />
        <script
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: `
              // Add any post-load initialization
              document.addEventListener('DOMContentLoaded', function() {
                // Your initialization code here
              });
            `
          }}
        />
      </body>
    </Html>
  )
}

Document.getInitialProps = async (ctx: DocumentContext) => {
  const initialProps = await ctx.defaultGetInitialProps(ctx)
  const nonce = ctx.req?.headers['x-nonce'] as string || ''
  return { ...initialProps, nonce }
} 