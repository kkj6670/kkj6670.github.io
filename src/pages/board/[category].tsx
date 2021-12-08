import React from 'react';
import { InferGetStaticPropsType, GetStaticPropsContext } from 'next';
import HeadSeo from '../../components/common/HeadSeo';

import { getCategory, getBoardList } from '../api/boardApi';

import BoardList from '../../components/board/BoardList';

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const category = params?.category?.toString() || '';

  const boardList = getBoardList(category);

  return {
    props: {
      boardList,
      category,
    },
  };
};

export async function getStaticPaths() {
  const categoryList = getCategory();

  return {
    paths: categoryList.map((category) => `/board/${category}`),
    fallback: false,
  };
}

const BoardListPage = function ({
  boardList,
  category,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <HeadSeo
        title={`K Note - ${category}`}
        description={boardList.map((item) => item.title).toString()}
      />
      <BoardList data={boardList} />
    </>
  );
};

export default BoardListPage;
