import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { IBoardDataDetail, useBase } from '../../store/Base';

import { mdToPlainText } from '../../lib/utils';

interface ISearchBox {
  isActive: boolean;
}

interface IBoardSearchList extends IBoardDataDetail {
  menu: string;
}

const SearchBox = styled.div<ISearchBox>`
  width: 100%;
  height: 25px;
  margin-bottom: 10px;
  > input {
    display: block;
    position: relative;
    z-index: 1000;
    width: 100%;
    height: 100%;
    padding: 2px 5px;
    border: 0 none;
    background-color: transparent;
    border-bottom: 1px solid ${({ theme, isActive }) => (isActive ? theme.pointColor : theme.textColor)};
    color: ${({ theme }) => theme.textColor};
    letter-spacing: 2px;
  }
`;

const SearchListBox = styled.ul`
  position: fixed;
  width: calc(100% - 280px);
  border-radius: 7px;
  max-height: calc(100% - 40px);
  overflow-y: auto;
  top: 20px;
  left: 265px;
  z-index: 1000;
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
`;

const SearchListItem = styled.li`
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.textColor};
  padding: 15px;
  color: ${({ theme }) => theme.textColor};

  :first-child {
    border-top: 0 none;
  }

  :hover {
    background-color: ${({ theme }) => theme.pointBgHoverColor};
  }

  a {
    display: block;
    color: ${({ theme }) => theme.textColor};

    span {
      color: ${({ theme }) => theme.pointColor};
    }

    > p {
      margin-bottom: 8px;
    }

    > p:first-child {
      font-size: 2.2rem;
    }

    > p:last-child {
      margin-bottom: 0;
      padding-left: 10px;
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

function BoardSearch() {
  const { boardData } = useBase();
  const [searchText, setsearchText] = useState('');
  const [searchItems, setSearchItems] = useState<JSX.Element[]>([]);

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setsearchText(value);
    },
    [setsearchText],
  );

  const allBoardList: IBoardSearchList[] = useMemo(() => {
    const menus = Object.keys(boardData);

    return menus.reduce<IBoardSearchList[]>((prev: IBoardSearchList[], menu: string) => {
      const items = Object.keys(boardData[menu]);
      const nextList = items.map((item) => {
        const nextItem = { ...boardData[menu][item], menu };
        nextItem.content = mdToPlainText(nextItem.content, { code: true });
        return nextItem;
      });
      return [...prev, ...nextList];
    }, []);
  }, [boardData]);

  useEffect(() => {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      let items = [<SearchListItem key='empty'>Note를 찾을수 없습니다.</SearchListItem>];

      if (searchText.replace(/\s/g, '').length > 0) {
        const isTagSearch = searchText.indexOf('#') === 0;

        let searchList: IBoardSearchList[] = [];
        if (isTagSearch) {
          searchList = allBoardList.filter((board) => board.tag?.includes(searchText.replace(/#/g, '')));
        } else {
          searchList = allBoardList.filter(
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
            let contentElem = <p>{content}</p>;

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
              const endText = content.slice(eIdx, sIdx + 400);

              contentElem = (
                <p>
                  {startText}
                  <span>{middleText}</span>
                  {endText}
                </p>
              );
            }

            return (
              <SearchListItem key={item.fileName}>
                <Link to={`${URL_PATH}${item.menu}/${item.fileName}`}>
                  {titleElem}
                  <p>{item.date}</p>
                  {contentElem}
                </Link>
              </SearchListItem>
            );
          });
        }
      }

      setSearchItems(items);
    }, 200);
  }, [searchText, setSearchItems, allBoardList]);

  return (
    <SearchBox isActive={searchText.length > 0}>
      <input type='text' placeholder='Quick Search...' onInput={handleInput} value={searchText} />
      <SearchListBox hidden={searchText.length === 0}>{searchItems}</SearchListBox>
      <Overlay hidden={searchText.length === 0} />
    </SearchBox>
  );
}

export default BoardSearch;
