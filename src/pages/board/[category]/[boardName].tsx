import React from 'react';
import { InferGetStaticPropsType, GetStaticPropsContext } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';

import { getBoardContent, getCategoryFile, getCategory } from '../../api/boardApi';

import { useBase } from '../../../store/Base';

import BoardViewer from '../../../components/board/BoardViewer';

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const category = params?.category?.toString() || '';
  const boardName = params?.boardName?.toString() || '';

  const { title, content } = getBoardContent(category, boardName);
  const description = content.slice(0, 155); // TODO :: PlainText
  const mdxSource = await serialize(content);

  return {
    props: {
      title,
      description,
      mdxSource,
    },
  };
};

export async function getStaticPaths() {
  const categoryList = getCategory();
  const init: string[] = [];
  const paths = categoryList.reduce((acc, category) => {
    const boardFiles = getCategoryFile(category) || [];

    const pathList = boardFiles
      .map(({ fileName }) => `/board/${category}/${fileName.replace('.md', '')}`)
      .filter((file) => file !== null);

    return [...acc, ...pathList];
  }, init);

  return {
    paths,
    fallback: false,
  };
}

const BoardContentPage = function ({ title, mdxSource }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <BoardViewer title={title} mdxSource={mdxSource} />;
};

export default BoardContentPage;
