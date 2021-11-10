import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';

import { useBase } from '../../store/Base';

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
  padding: 15px;
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
    border-bottom: 1px solid ${({ theme }) => theme.textColor};
    padding-bottom: 5px;
    margin-bottom: 5px;
    :last-child {
      padding-bottom: 0;
      margin-bottom: 0;
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

function Search() {
  const { boardData } = useBase();
  const [text, setText] = useState('');

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setText(value);
    },
    [setText],
  );

  useEffect(() => {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      console.log(text);
    }, 200);
  }, [text]);

  return (
    <SearchBox>
      <input type='text' placeholder='Quick Search...' onInput={handleInput} value={text} />
      <SearchList hidden={text.length === 0}>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
      </SearchList>
      <Overlay hidden={text.length === 0} />
    </SearchBox>
  );
}

export default Search;
