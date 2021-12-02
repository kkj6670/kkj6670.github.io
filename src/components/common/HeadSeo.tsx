import React from 'react';
import Head from 'next/head';

const HeadSeo = function ({ title = 'K Note', description = '개인 공부 블로그' }) {
  return (
    <Head>
      <title>{title}</title>
      <meta property='og:title' content={title} />

      <meta name='description' content={description} />
      <meta property='og:description' content={description} />
    </Head>
  );
};

export default HeadSeo;
