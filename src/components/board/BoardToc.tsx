import React, { useEffect } from 'react';
import styled from 'styled-components';

import { IBoardTocData } from '../../types/common';

interface IBoardToc {
  toc: IBoardTocData[];
}

interface ITocItem {
  level: number;
  activeItem: string;
  anchor: string;
}

const TocBox = styled.ul`
  width: 180px;
  position: fixed;
  right: 30px;
  top: 100px;
`;

const TocItem = styled.li<ITocItem>`
  ${({ level }) => {
    let paddingLeft = 0;
    let marginTop = 15;

    if (level > 1) marginTop = 10;
    if (level === 2) paddingLeft = 10;
    if (level === 3) paddingLeft = 20;

    return `
      padding-left: ${paddingLeft}px;
      margin-top: ${marginTop}px;
    `;
  }}
  :first-child {
    margin-top: 0;
  }

  > a {
    display: block;
    color: ${({ theme }) => theme.textColor};
  }

  ${({ activeItem, anchor, theme }) => {
    return activeItem === anchor
      ? `
      transition: all 0.125s ease-in 0s; transform: scale(1.05);
      transform: scale(1.15);
      > a {
        color: ${theme.pointColor};
      }
    `
      : '';
  }}
`;

function BoardToc({ toc }: IBoardToc) {
  useEffect(() => {
    const mainTag = document.getElementsByTagName('main');
    const setActiveItem = (e: Event) => {
      console.log(e);
    };
    mainTag[0].addEventListener('scroll', setActiveItem);

    return () => {
      mainTag[0].removeEventListener('scroll', setActiveItem);
    };
  }, []);

  return (
    <TocBox>
      {toc.map((item) => {
        return (
          <TocItem key={item.anchor} level={item.level} activeItem='목차1' anchor={item.anchor}>
            <a href={`#${item.anchor}`} title={`${item.anchor} 바로가기`}>
              {item.text}
            </a>
          </TocItem>
        );
      })}
    </TocBox>
  );
}

export default BoardToc;
