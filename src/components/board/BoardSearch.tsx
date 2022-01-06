import React, { useEffect, useState, useCallback, forwardRef, useImperativeHandle, useRef } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { IBoardDetail } from '../../types/common';

import { mdToPlainText } from '../../lib/utils';

interface IBoardSearchList extends IBoardDetail {
  menu: string;
}

const SearchIconBox = styled.div`
  width: 25px;
  height: 25px;
  mask: ${`url(${process.env.URL_PATH}/static/images/icon/search.svg) no-repeat center`};
  mask-size: 22px;
  background-color: ${({ theme }) => theme.textColor};
`;

const SearchBox = styled.div`
  width: 100%;
  height: 25px;
  margin-bottom: 10px;
  position: relative;
  > input {
    display: block;
    position: relative;
    z-index: 1000;
    width: 100%;
    height: 100%;
    padding: 5px 5px 5px 25px;
    border: 0 none;
    background-color: ${({ theme }) => theme.pointBgColor};
    border: 1px solid ${({ theme }) => theme.textColor};
    border-radius: 5px;
    color: ${({ theme }) => theme.textColor};
    letter-spacing: 1.5px;
  }

  > ${SearchIconBox} {
    position: absolute;
    z-index: 1001;
    left: 0;
    top: 0;
  }
`;

const SearchListBox = styled.div`
  position: fixed;
  width: calc(100% - 280px);
  border-radius: 7px;
  top: 20px;
  left: 250px;
  z-index: 1000;
  background-color: ${({ theme }) => theme.pointBgColor};

  @media only screen and (max-width: 768px) {
    width: 90%;
    left: 5%;
    top: 75px;
  }

  // 검색결과 text
  > div:first-child {
    display: flex;
    align-items: center;
    padding: 1.5rem 0 1rem 1.5rem;

    font-weight: 400;
    > span {
      font-weight: bold;
      color: ${({ theme }) => theme.pointColor};
      text-decoration: underline;
    }
  }

  // board list
  > div:last-child {
    width: 100%;
    max-height: calc(100vh - 85px);
    @media only screen and (max-width: 768px) {
      max-height: calc(100vh - 200px);
    }
    overflow-y: auto;

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
`;

const SearchListItem = styled.article`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.textColor};
  padding: 1.2rem;
  color: ${({ theme }) => theme.textColor};

  :last-child {
    border-bottom: 0 none;
  }

  :hover {
    background-color: ${({ theme }) => theme.pointBgHoverColor};
  }

  a {
    display: block;
    color: ${({ theme }) => theme.textColor};

    span {
      color: ${({ theme }) => theme.pointColor};
      text-decoration: underline;
    }

    word-break: break-all;

    // 제목
    > p:first-child {
      font-size: 2.2rem;
      font-weight: 700;
    }

    // 날짜
    > p {
      margin-bottom: 8px;
      font-weight: 400;
    }

    // 내용
    > p:last-child {
      margin-bottom: 0;
      padding-left: 10px;
      word-break: break-all;

      @media only screen and (max-width: 768px) {
        height: 40px;
        overflow: hidden;
        max-height: calc(100% - 147px);
      }
    }
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0px;
  z-index: 999;
  overflow: hidden;
  background-color: black;
  opacity: 0.5;
`;

let timer: ReturnType<typeof setTimeout>;
const BOARD_DATA = JSON.parse(process.env.BOARD_DATA || '{}');
const ALL_BOARD_LIST = Object.keys(BOARD_DATA).reduce<IBoardSearchList[]>((prev: IBoardSearchList[], menu: string) => {
  const items = Object.keys(BOARD_DATA[menu]);
  const nextList = items.map((item) => {
    const nextItem: IBoardSearchList = { ...BOARD_DATA[menu][item], menu };
    nextItem.content = mdToPlainText(nextItem.content);
    nextItem.tag = nextItem.tag?.map((tag) => tag.toLowerCase());
    return nextItem;
  });
  return [...prev, ...nextList];
}, []);

export interface ISearchHandle {
  clear: () => void;
  focus: () => void;
}

const BoardSearch = forwardRef<ISearchHandle>((props, ref) => {
  const [searchText, setSearchText] = useState('');
  const [searchItems, setSearchItems] = useState<JSX.Element[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setSearchText(value);
    },
    [setSearchText],
  );

  const handleKeydown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchText('');
      }
    },
    [setSearchText],
  );

  const clearSearchText = useCallback(() => {
    setSearchText('');
  }, [setSearchText]);

  useImperativeHandle(
    ref,
    () => ({
      clear() {
        clearSearchText();
      },
      focus() {
        inputRef?.current?.focus();
      },
    }),
    [clearSearchText, inputRef],
  );

  useEffect(() => {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      let items: JSX.Element[] = [];

      if (searchText.replace(/\s/g, '').length > 0) {
        const isTagSearch = searchText.indexOf('#') === 0;

        let searchList: IBoardSearchList[] = [];
        if (isTagSearch) {
          searchList = ALL_BOARD_LIST.filter((board) =>
            board.tag?.includes(searchText.replace(/#/g, '').toLowerCase()),
          );
        } else {
          searchList = ALL_BOARD_LIST.filter(
            (board) => board.content?.includes(searchText) || board.title?.includes(searchText),
          );
        }

        if (searchList.length > 0) {
          items = searchList.map((item) => {
            const { title, content } = item;
            const lowerTitle = title.toLowerCase();
            const lowerContent = content.toLowerCase();
            const lowerSearchText = searchText.toLowerCase();

            const isSameTitle = lowerTitle.includes(lowerSearchText);
            const isSameContent = lowerContent.includes(lowerSearchText);

            let titleElem = <p>{title}</p>;
            let contentElem = <p>{content.substring(0, 300)}</p>;

            if (isSameTitle) {
              const sIdx = lowerTitle.indexOf(lowerSearchText);
              const eIdx = sIdx + searchText.length;

              const startText = title.slice(0, sIdx);
              const middleText = title.slice(sIdx, eIdx);
              const endText = title.slice(eIdx, title.length);

              titleElem = (
                <p>
                  {startText}
                  <span>{middleText}</span>
                  {endText}
                </p>
              );
            }

            if (isSameContent) {
              const sIdx = lowerContent.indexOf(searchText);
              const eIdx = sIdx + searchText.length;

              const startText = content.slice(sIdx - 30 < 0 ? 0 : sIdx - 30, sIdx);
              const middleText = content.slice(sIdx, eIdx);
              const endText = content.slice(eIdx, sIdx + 300);

              contentElem = (
                <p>
                  {startText}
                  <span>{middleText}</span>
                  {endText}
                </p>
              );
            }

            return (
              <SearchListItem key={item.fileName} onClick={clearSearchText}>
                <Link href='/board/[category]/[boardName]' as={`/board/${item.menu}/${item.fileName}`}>
                  <a>
                    {titleElem}
                    <p>{item.date}</p>
                    {contentElem}
                  </a>
                </Link>
              </SearchListItem>
            );
          });
        }
      }

      setSearchItems(items);
    }, 200);
  }, [searchText, setSearchItems, clearSearchText]);

  return (
    <SearchBox>
      <input
        ref={inputRef}
        id='boardSearch'
        type='text'
        placeholder='Search...'
        onInput={handleInput}
        value={searchText}
        onKeyDown={handleKeydown}
      />
      <SearchListBox hidden={searchText.length === 0}>
        <div>
          <SearchIconBox />
          검색 결과&nbsp;<span>{searchItems.length}</span>개
        </div>
        <div>{searchItems}</div>
      </SearchListBox>
      <Overlay hidden={searchText.length === 0} />
      <SearchIconBox />
    </SearchBox>
  );
});

BoardSearch.displayName = 'BoardSearch';
export default BoardSearch;
