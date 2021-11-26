import React from 'react';
import Document, { Main, NextScript, Html, Head } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel='icon' href='/react-blog/images/icon/note.svg' />
          <meta name='title' content='K Note' />
          <meta name='description' content='개인 공부 블로그' />
          <meta property='og:url' content='https://kkj6670.github.io/react-blog/' />
          <meta property='og:type' content='website' />
          <meta property='og:title' content='K Note' />
          <meta property='og:description' content='개인 공부 블로그' />
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
