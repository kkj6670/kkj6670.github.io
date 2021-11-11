import React, { useEffect, useState, useCallback, useMemo } from 'react';
import styled from 'styled-components';

import { IBoardDataDetail, useBase } from '../../store/Base';

const SearchBox = styled.div`
  width: 100%;
  height: 25px;
  margin-bottom: 10px;
  > input {
    display: block;
    width: 100%;
    height: 100%;
    padding: 2px 5px;
    border: 0 none;
    background-color: transparent;
    border-bottom: 1px solid ${({ theme }) => theme.textColor};
    color: ${({ theme }) => theme.textColor};
    letter-spacing: 2px;
  }
`;

const SearchList = styled.ul`
  position: fixed;
  width: calc(100% - 270px);
  border-radius: 7px;
  max-height: calc(100% - 40px);
  overflow-y: auto;
  top: 20px;
  left: 265px;
  z-index: 1000;
  box-shadow: rgb(15 15 15 / 5%) 0px 0px 0px 1px, rgb(15 15 15 / 10%) 0px 5px 10px, rgb(15 15 15 / 20%) 0px 15px 40px;
  ${({ theme }) => `
    color: ${theme.textColor};
    background-color: ${theme.name === 'dark' ? theme.color.darkGray : theme.color.lightGray};
  `};
  > li {
    width: 100%;
    height: 50px;
    border-top: 1px solid ${({ theme }) => theme.textColor};
    padding: 15px;
    margin-top: 5px;
    :first-child {
      border-top: 0 none;
      margin-top: 0;
    }
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0px;
  z-index: 999;
  pointer-events: none;
  overflow: hidden;
  background-color: black;
  opacity: 0.5;
`;

let timer: ReturnType<typeof setTimeout>;

function BoardSearch() {
  const { boardData } = useBase();
  const [text, setText] = useState('');

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setText(value);
    },
    [setText],
  );

  const allBoardList: IBoardDataDetail[] = useMemo(() => {
    const category = Object.keys(boardData);

    return category.reduce<IBoardDataDetail[]>((prev: IBoardDataDetail[], cur: string) => {
      const items = Object.keys(boardData[cur]);
      const nextList = items.map((item) => boardData[cur][item]);
      return [...prev, ...nextList];
    }, []);
  }, [boardData]);

  useEffect(() => {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      console.log(text);
    }, 200);
  }, [text]);

  const searchItem = useMemo(
    () => allBoardList.filter((board) => board.content?.indexOf(text) !== -1),
    [allBoardList, text],
  );

  return (
    <SearchBox>
      <input type='text' placeholder='Quick Search...' onInput={handleInput} value={text} />
      <SearchList hidden={text.length === 0}>
        {searchItem.length > 0 ? (
          searchItem.map((item) => <li key={item.fileName}>{item.title}</li>)
        ) : (
          <li>Note를 찾을수 없습니다.</li>
        )}
      </SearchList>
      <Overlay hidden={text.length === 0} />
    </SearchBox>
  );
}

export default BoardSearch;
