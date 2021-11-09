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
    </SearchBox>
  );
}

export default Search;
