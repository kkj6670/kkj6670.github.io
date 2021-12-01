import React, { useMemo } from 'react';
import { InferGetStaticPropsType, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useBase } from '../../store/Base';

import BoardList from '../../components/board/BoardList';

import { getBoardList } from '../api/boardApi';

export const getStaticProps: GetStaticProps = async (context) => {
  const category = context.params?.category;
  const boardListTest = getBoardList();

  return {
    props: {
      boardListTest,
    },
  };
};

export async function getStaticPaths() {
  return {
    paths: ['/board/javascript'],
    fallback: true,
  };
}

const BoardListPage = function ({ boardListTest }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const { boardData } = useBase();
  const boardList = boardData[router.query.category as string];

  const data = useMemo(() => {
    return Object.keys(boardList || {}).map((key) => boardList[key]);
  }, [boardList]);

  return <BoardList data={data} />;
};

export default BoardListPage;
