import React from 'react';
import type { NextPage } from 'next';
import styled from 'styled-components';

const Box = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  font-size: 4rem;
  justify-content: center;
  align-items: center;

  color: ${({ theme }) => theme.textColor};
`;

const Custom404: NextPage = function () {
  return <Box>404 - 페이지를 찾을수 없습니다.😅</Box>;
};

export default Custom404;
