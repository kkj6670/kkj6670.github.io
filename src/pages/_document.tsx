import React from 'react';
import Document, { Main, NextScript, Html, Head } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel='icon' href='/static/images/icon/note.svg' />
          <meta name='google-site-verification' content='P8e-wgPtyXmOnZCbu4AwxrZ51MqT_DUxGbMTDlBgigg' />
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          <link
            href='https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap'
            rel='stylesheet'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
