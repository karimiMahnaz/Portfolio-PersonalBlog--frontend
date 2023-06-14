import React from "react";
import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-52JDHKF8H2`}
        />

        <Script
          id='google-analytics'
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-52JDHKF8H2', {
            page_path: window.location.pathname,
          });
        `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />

                  {/*Below we add the modal wrapper*/}
                  <div id="modalRoot"></div>

      </body>
    </Html>
  )
}
