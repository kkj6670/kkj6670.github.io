import React from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
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
    border-bottom: 1px solid ${({ theme }) => theme.color.gray};
    color: ${({ theme }) => theme.textColor};
    letter-spacing: 2px;
  }
`;

function Search() {
  return (
    <Wrap>
      <input type="text" placeholder="search..." />
    </Wrap>
  );
}

export default Search;
