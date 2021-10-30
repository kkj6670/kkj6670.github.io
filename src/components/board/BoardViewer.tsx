import React, { useEffect, useState, useRef } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import marked from 'marked';

import { IParamTypes } from '../../types/common';

function BoardViewer({ match }: RouteComponentProps<IParamTypes>) {
  const { params } = match;
  const [text, setText] = useState('');
  const viewerBox = useRef<HTMLDivElement>(null);

  // TODO :: marekd options

  useEffect(() => {
    fetch(`/react-blog/data/board/javascript/${params.fileName}.md`, {
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
          if (box !== null) box.innerHTML = marked(md);
        });
      }
    });
  }, [params.fileName, setText]);

  return <div ref={viewerBox} />;
}

export default BoardViewer;
