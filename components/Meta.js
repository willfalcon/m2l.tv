import Head from 'next/head';
import Script from 'next/script';
import React from 'react';

const Meta = () => {
  return (
    <Head>
      <title>Move To Learn TV</title>

      <Script src="https://www.googletagmanager.com/gtag/js?id=G-8NWL5MECMJ" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-8NWL5MECMJ');
        `}
      </Script>
    </Head>
  );
};

export default Meta;
