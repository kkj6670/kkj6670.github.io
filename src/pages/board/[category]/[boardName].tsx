import React from 'react';

import { InferGetStaticPropsType, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';

import { getBoardContent } from '../../api/boardApi';

import { useBase } from '../../../store/Base';

import BoardViewer from '../../../components/board/BoardViewer';

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const category = params?.category?.toString() || '';
  const boardName = params?.boardName?.toString() || '';

  const test = getBoardContent(category, boardName);
  console.log(test);

  return {
    props: {
      test: 1,
    },
  };
};

export async function getStaticPaths() {
  return {
    paths: ['/board/javascript/javascript-engine'],
    fallback: true,
  };
}

const BoardViewerPage = function () {
  return 'test';
};

export default BoardViewerPage;
