import React, { useMemo } from 'react';
import { InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { useBase } from '../../store/Base';

import BoardList from '../../components/board/BoardList';

import { getCategoryLen } from '../api/board';

export const getStaticProps = async () => {
  const categoryLen = getCategoryLen();

  return {
    props: {
      categoryLen,
    },
  };
};

export async function getStaticPaths() {
  return {
    paths: ['/board/javascript'],
    fallback: true,
  };
}

const BoardListPage = function ({ categoryLen }: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log(categoryLen);

  const router = useRouter();
  const { boardData } = useBase();
  const boardList = boardData[router.query.category as string];

  const data = useMemo(() => {
    return Object.keys(boardList || {}).map((key) => boardList[key]);
  }, [boardList]);

  return <BoardList data={data} />;
};

export default BoardListPage;
