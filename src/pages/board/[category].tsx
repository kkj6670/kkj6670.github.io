import React, { useMemo } from 'react';
import { InferGetStaticPropsType, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useBase } from '../../store/Base';

import BoardList from '../../components/board/BoardList';

import { getBoardList } from '../api/boardApi';

export const getStaticProps: GetStaticProps = async (context) => {
  const category = context.params?.category;

  if (typeof category === 'string') {
    const boardList = getBoardList(category);

    return {
      props: {
        boardList,
      },
    };
  }

  return {
    props: {
      boardList: null,
    },
  };
};

export async function getStaticPaths() {
  return {
    paths: ['/board/javascript'],
    fallback: true,
  };
}

const BoardListPage = function ({ boardList }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <BoardList data={boardList} />;
};

export default BoardListPage;
