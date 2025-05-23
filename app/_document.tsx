import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document'
import Script from 'next/script'

class MyDocument extends Document<{ nonce?: string }> {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps & { nonce?: string }> {
    const initialProps = await Document.getInitialProps(ctx)
    const nonce = ctx.req?.headers['x-nonce'] as string || ''
    return { ...initialProps, nonce }
  }

  render() {
    const nonce = this.props.nonce

    return (
      <Html lang="en">
        <Head nonce={nonce}>
          <Script
            id="nonce-script"
            nonce={nonce}
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `window.__NONCE__ = "${nonce}";`,
            }}
          />
          <script
            nonce={nonce}
            dangerouslySetInnerHTML={{
              __html: `
                window.__NONCE__ = "${nonce}";
                window.__ENV__ = "${process.env.NODE_ENV}";
              `,
            }}
          />
          <script
            nonce={nonce}
            dangerouslySetInnerHTML={{
              __html: `
                if (!window.crypto) {
                  window.crypto = window.msCrypto;
                }
              `,
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
                document.addEventListener('DOMContentLoaded', function() {
                  // Your initialization code here
                });
              `,
            }}
          />
        </body>
      </Html>
    )
  }
}

export default MyDocument 