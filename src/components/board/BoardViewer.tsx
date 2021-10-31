import React, { useEffect, useState, useRef } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

import marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

import { IParamTypes } from '../../types/common';

const ViewerBox = styled.article`
  color: ${({ theme }) => theme.textColor};
  pre {
    margin: 2rem 0;
  }
  h1,
  h2,
  h3 {
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
  
  h1 {
    font-size: 3.5rem;
  }

  h2 {
    font-size: 3rem;
  }

  h3 {
    font-size: 2.5rem;
  }

  code {
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
  const viewerBox = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`/react-blog/data/board/${params.menu}/${params.fileName}.md`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (response.status === 404) {
        // TODO :: 이전으로
      } else {
        response.text().then((md) => {
          const box = viewerBox.current;
          console.log(md);
          if (box !== null) box.innerHTML = marked(md);
        });
      }
    });
  }, [params.fileName]);

  return <ViewerBox ref={viewerBox} />;
}

export default BoardViewer;
