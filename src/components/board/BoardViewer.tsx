import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { MDXRemote } from 'next-mdx-remote';
import styled from 'styled-components';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import HeadSeo from '../common/HeadSeo';

import { IBoardTocData } from '../../types/common';

const ViewerBox = styled.section`
  width: 100%;
  padding-right: 200px;
  color: ${({ theme }) => theme.textColor};
  font-size: 2rem;
  font-weight: 100;

  pre {
    margin: 2rem 0;
  }

  h1,
  h2,
  h3 {
    margin-top: 4rem;
    margin-bottom: 1.2rem;

    :first-child {
      margin-top: 0;
    }
  }

  h1 {
    font-size: 4rem;
  }

  h2 {
    font-size: 3.5rem;
  }

  h3 {
    font-size: 3rem;
    margin-top: 2rem;
    font-weight: 500;
  }

  code {
    font-family: 'NOTO SANS KR' sans-serif;
    border-radius: 8px;

    color: ${({ theme }) => theme.textColor};
    background-color: ${({ theme }) => theme.pointBgColor};

    ::-webkit-scrollbar {
      width: 15px;
      height: 15px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.scrollColor.thumb};
      border-radius: 10px;
      background-clip: content-box;
      border: 3px solid rgba(255, 255, 255, 0);
    }

    ::-webkit-scrollbar-track {
      background-color: ${({ theme }) => theme.scrollColor.track};
    }
  }

  li {
    list-style: disc;
    margin-left: 3rem;

    li {
      list-style: unset;
    }
  }

  img {
    max-width: 80%;
    background-color: #fff;
  }
`;

interface IBoardViewerProps {
  title: string;
  mdxSource: MDXRemoteSerializeResult;
}

function code({ className, ...props }) {
  const match = /language-(\w+)/.exec(className || '');
  return match ? (
    <SyntaxHighlighter language={match[1]} PreTag='div' {...props} />
  ) : (
    <code className={className} {...props} />
  );
}

const BoardViewer = function ({ title, mdxSource }: IBoardViewerProps) {
  return (
    <ViewerBox>
      <HeadSeo title={title} />
      <MDXRemote {...mdxSource} components={{ code }} />
      {/* <ContentBox ref={contentBox} dangerouslySetInnerHTML={mdHtml} />
      {toc.length > 0 && <BoardToc toc={toc} />} */}
    </ViewerBox>
  );
};

export default BoardViewer;
