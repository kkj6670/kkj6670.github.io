import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { MDXRemote } from 'next-mdx-remote';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark, vs } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import HeadSeo from '../common/HeadSeo';
import BoardToc from './BoardToc';

import useWindowSize from '../../lib/hooks/useWindowSize';
import { IBoardTocData } from '../../types/common';
import { useBase } from '../../store/Base';

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

  pre {
    border-radius: 8px;

    > div {
      background-color: ${({ theme }) => theme.pointBgColor} !important;

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

      padding: 20px !important;

      line-height: 1.5 !important;
      font-size: 1.5rem !important;
      text-shadow: none !important;

      > code {
        line-height: 1.5 !important;
        font-size: 1.5rem !important;
        text-shadow: none !important;
      }
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
  description: string;
  mdxSource: MDXRemoteSerializeResult;
}

function h1({ children = '' }) {
  return (
    <h1 id={children} className='tocHeading'>
      {children}
    </h1>
  );
}

function h2({ children = '' }) {
  return (
    <h2 id={children} className='tocHeading'>
      {children}
    </h2>
  );
}

function h3({ children = '' }) {
  return (
    <h3 id={children} className='tocHeading'>
      {children}
    </h3>
  );
}

const BoardViewer = function ({ title, description, mdxSource }: IBoardViewerProps) {
  const viewrBox = useRef<HTMLElement>(null);
  const [toc, setToc] = useState<IBoardTocData[]>([]);
  const { theme } = useBase();
  const windowSize = useWindowSize();

  const code = useCallback(
    ({ className = '', ...props }) => {
      const targetTheme = theme === 'dark' ? a11yDark : vs;
      const match = /language-(\w+)/.exec(className || '');
      return match ? (
        <SyntaxHighlighter language={match[1]} PreTag='div' {...props} style={targetTheme} />
      ) : (
        <code className={className} {...props} />
      );
    },
    [theme],
  );

  const createTocInfo = useCallback(() => {
    if (viewrBox?.current) {
      const tags = viewrBox.current.getElementsByClassName('tocHeading');

      const tocList: IBoardTocData[] = Array.from(tags).map((tag) => {
        const { offsetTop, id, innerText, tagName } = tag as HTMLHeadingElement;
        const level = +tagName.replace('H', '');

        return {
          anchor: id,
          level,
          text: innerText,
          offsetTop,
        };
      });

      setToc(tocList);
    }
  }, [viewrBox, setToc]);

  useEffect(() => {
    createTocInfo();
  }, [createTocInfo]);

  useEffect(() => {
    if (windowSize.width > 0 && windowSize.height > 0) {
      createTocInfo();
    }
  }, [windowSize, createTocInfo]);

  return (
    <>
      <ViewerBox ref={viewrBox}>
        <HeadSeo title={title} description={description} />
        <MDXRemote {...mdxSource} components={{ code, h1, h2, h3 }} />
      </ViewerBox>
      {toc.length > 0 && <BoardToc toc={toc} />}
    </>
  );
};

export default BoardViewer;
