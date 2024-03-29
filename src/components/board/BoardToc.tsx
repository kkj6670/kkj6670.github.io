import React, { useMemo, useRef } from 'react';
import styled from 'styled-components';

import { IBoardTocData } from '../../types/common';

import useScrollTop from '../../lib/hooks/useScrollTop';

const TocBox = styled.ul`
  @media only screen and (max-width: 1280px) {
    display: none;
  }
  width: 200px;
  position: fixed;
  right: 20px;
  top: 50px;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
  padding: 0 15px 5px 20px;
  border-left: 3px solid #eee;
  border-top-color: transparent;
  word-break: break-word;

  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
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
`;

interface ITocItem {
  level: number;
  activeItem: string;
  anchor: string;
}

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
    width: 100%;
    display: block;
    color: ${({ theme }) => theme.textColor};
  }

  transition: all 0.125s ease-in 0s;

  ${({ activeItem, anchor, theme }) => {
    return activeItem === anchor
      ? `
      transform: scale(1.15);
      > a {
        color: ${theme.pointColor};
      }
    `
      : '';
  }}
`;

const TOP_INTERVAL = 30;

interface IBoardTocProps {
  toc: IBoardTocData[];
}

const BoardToc = function ({ toc }: IBoardTocProps) {
  const tocBox = useRef(null);
  const scrollTop = useScrollTop();

  const activeItem = useMemo(() => {
    let targetItem = '';

    for (let i = 0; i < toc.length; i += 1) {
      const { offsetTop, anchor } = toc[i];
      const nextOffsetTop = toc[i + 1]?.offsetTop;
      // offsetTop ~ nextOffsetTop scrollTop
      if (
        (i === 0 && scrollTop < offsetTop - TOP_INTERVAL) ||
        nextOffsetTop === undefined ||
        (offsetTop - TOP_INTERVAL <= scrollTop && nextOffsetTop - TOP_INTERVAL >= scrollTop)
      ) {
        targetItem = anchor;
        break;
      }
    }

    return targetItem;
  }, [scrollTop, toc]);

  return (
    <TocBox ref={tocBox}>
      {toc.map((item) => {
        return (
          <TocItem key={item.anchor} level={item.level} activeItem={activeItem} anchor={item.anchor}>
            <a href={`#${item.anchor}`} title={`${item.anchor} 바로가기`}>
              {item.text}
            </a>
          </TocItem>
        );
      })}
    </TocBox>
  );
};

export default BoardToc;
