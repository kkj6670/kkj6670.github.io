import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
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
import useWindowSize from '../../lib/hooks/useWindowSize';

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

const IMAGE_PATH_REG_EXP = /(..\/..\/..\/images\/board)/g;

const BoardViewer = function ({ match }: RouteComponentProps<IParamTypes>) {
  const { params } = match;
  const { boardData } = useBase();
  const windowSize = useWindowSize();

  const firstUpdate = useRef(true);
  const contentBox = useRef<HTMLDivElement>(null);

  const [metaTitle, setMetaTitle] = useState('');
  const [plainContent, setPlainContent] = useState('');
  const [toc, setToc] = useState<IBoardTocData[]>([]);
  const [mdHtml, setMdHtml] = useState({ __html: '' });

  const [totalImg, setTotalImg] = useState(-1);
  const [loadImg, setLoadImg] = useState(0);

  useEffect(() => {
    const { content, title } = boardData[params.menu][params.fileName];
    const box = contentBox.current;
    if (box !== null && content) {
      const markedMd = marked(content);
      const plainText = mdToPlainText(content);

      setMdHtml({ __html: markedMd.replace(IMAGE_PATH_REG_EXP, `${URL_PATH}images/board`) });
      setMetaTitle(title || '');
      setPlainContent(plainText);
    }
  }, [params.menu, params.fileName, boardData]);

  const setTocData = useCallback(() => {
    if (contentBox.current) {
      const hTags: NodeListOf<HTMLElement> = contentBox.current.querySelectorAll('h1, h2, h3');
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
    }
  }, [contentBox, setToc]);

  // 이미지 로딩후 boardToc offsetTop set
  const contentObserver = useMemo(() => {
    return new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          const imgList = contentBox.current?.querySelectorAll('img');
          setTotalImg(imgList?.length || 0);
          let cnt = 0;
          imgList?.forEach((img) => {
            img.addEventListener('load', () => {
              cnt += 1;
              setLoadImg(cnt);
            });
          });
        }
      });
    });
  }, [setTotalImg, setLoadImg]);

  useEffect(() => {
    const target = contentBox.current;
    const config = { childList: true };

    if (target) {
      contentObserver.observe(target, config);
    }

    return () => {
      contentObserver.disconnect();
    };
  }, [contentBox, contentObserver]);

  useEffect(() => {
    // 첫 렌더링시 실행 안함
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    setTocData();
  }, [windowSize, setTocData, firstUpdate]);

  useEffect(() => {
    if (totalImg > -1 && totalImg === loadImg) {
      setTocData();
    }
  }, [totalImg, loadImg, setTocData]);

  return (
    <>
      <Helmet>
        <meta name='title' content={metaTitle} />
        <meta name='description' content={plainContent} />
      </Helmet>
      <ContentBox ref={contentBox} dangerouslySetInnerHTML={mdHtml} />
      {toc.length > 0 && <BoardToc toc={toc} />}
    </>
  );
};

export default BoardViewer;
