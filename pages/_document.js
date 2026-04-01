import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* SEO & Meta Tags */}
        <meta name="robots" content="index, follow, googlebot, bingbot, gptbot, claudebot, perplexitybot" />
        <link rel="canonical" href="https://openacre.co" />
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </Head>
      <body>
        <Main />
        <NextScript />
        {/* Plausible Analytics */}
        <script defer data-domain="openacre.co" src="https://plausible.io/js/script.js"></script>
      </body>
    </Html>
  )
}
