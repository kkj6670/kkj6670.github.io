import React from 'react';

import { InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';

import { useBase } from '../../../store/Base';

import BoardViewer from '../../../components/board/BoardViewer';

import { getCategoryLen } from '../../api/board';

type Post = {
  test: number;
};

export const getStaticProps = async () => {
  const posts: Post[] = [{ test: 1 }];

  const categoryLen = getCategoryLen();

  return {
    props: {
      posts,
      categoryLen,
    },
  };
};

export async function getStaticPaths() {
  return {
    paths: ['/board/javascript/javascript-engine'],
    fallback: true,
  };
}

const BoardViewerPage = function ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log(posts);
  const router = useRouter();
  const { boardData } = useBase();
  const { category, boardName } = router.query;

  return 'test';
};

export default BoardViewerPage;
