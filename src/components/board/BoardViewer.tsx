import React, { useEffect, useState, useRef } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

import marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

import BoardToc from './BoardToc';

import { IParamTypes, IBoardTocData } from '../../types/common';
import { useBase } from '../../store/Base';
import { mdToPlainText } from '../../lib/utils';

const ContentBox = styled.section`
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
  }
`;

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
  pedantic: false,
  gfm: true,
  breaks: true,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
});

function BoardViewer({ match }: RouteComponentProps<IParamTypes>) {
  const { params } = match;
  const contentBox = useRef<HTMLDivElement>(null);
  const [toc, setToc] = useState<IBoardTocData[]>([]);
  const [metaTitle, setMetaTitle] = useState('');
  const [plainContent, setPlainContent] = useState('');
  const { boardData } = useBase();

  useEffect(() => {
    const { content, title } = boardData[params.menu][params.fileName];
    const box = contentBox.current;
    if (box !== null && content) {
      const markedMd = marked(content);
      const plainText = mdToPlainText(content);
      box.innerHTML = markedMd;

      const hTags: NodeListOf<HTMLElement> = box.querySelectorAll('h1, h2, h3');
      const tocList: IBoardTocData[] = [];
      hTags.forEach((tag) => {
        const level = +tag.tagName.replace('H', '');
        const anchor = tag.id;
        const text = tag.textContent || '';
        const { offsetTop } = tag;

        tocList.push({
          level,
          anchor,
          text,
          offsetTop: offsetTop - 15,
        });
      });

      setToc(tocList);
      setMetaTitle(title || '');
      setPlainContent(plainText);
    }
  }, [params.menu, params.fileName, setToc, boardData]);

  return (
    <>
      <Helmet>
        <meta name='title' content={metaTitle} />
        <meta name='description' content={plainContent} />
      </Helmet>
      <ContentBox ref={contentBox} />
      <BoardToc toc={toc} />
    </>
  );
}

export default BoardViewer;
