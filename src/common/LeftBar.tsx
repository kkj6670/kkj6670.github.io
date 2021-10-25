import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory, Link, useLocation } from 'react-router-dom';
import { useBase, useBaseUpdate } from '../store/Base';
import Search from './Search';

import IMG_GITHUB from '../../public/images/icon/github.svg';

interface IMenuList {
  selected: boolean;
}

const Header = styled.header`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 100%;
  padding: 2.5% 1%;
  overflow-y: auto;

  ${({ theme }) => `
    color: ${theme.textColor};
    background-color: ${theme.name === 'dark' ? theme.color.darkGray : theme.color.lightGray};
  `};

  justify-content: space-between;

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

const HeaderTitle = styled.h1`
  text-align: center;
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
`;

const MenuBox = styled.ul`
  width: 100%;
  margin: 1.5rem 0;
`;

const MenuList = styled.li<IMenuList>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 6.5rem;

  &:last-child {
    border-bottom: 0 none;
  }

  & > a {
    display: flex;
    width: 100%;
    height: 100%;
    cursor: pointer;
    font-size: 1.8rem;
    align-items: center;
    justify-content: center;

    ${({ theme, selected }) => `
	    color: ${theme.textColor};
	    background-color: ${selected ? 'rgb(71, 76, 80)' : 'transparent'};
	  `};

    &:hover {
      background-color: ${({ selected }) => (selected ? 'rgb(69,75,77)' : 'rgb(71, 76, 80)')};
    }
  }
`;

const GitHubLink = styled.a`
  display: block;
  width: 100%;
  height: 30px;
  ${({ theme }) => `
    color: ${theme.textColor};
  `};
  background: url(${IMG_GITHUB}) no-repeat center center / 30px;
`;

function LeftBar() {
  const history = useHistory();
  const location = useLocation();
  const baseUpdate = useBaseUpdate();
  const baseState = useBase();

  const { selectedMenu } = baseState;

  useEffect(() => {
    const menu = location.pathname?.split('/')?.[1];

    if (!menu || menu.length === 0) {
      baseUpdate({ type: 'MENU_CHANGE', value: 'javaScript' });
    } else {
      baseUpdate({ type: 'MENU_CHANGE', value: menu });
    }
  }, [location]);

  // console.log(`${URL_PATH}javaScript`);

  return (
    <Header>
      <div>
        <HeaderTitle>Study Note</HeaderTitle>
        <Search />
      </div>
      <nav>
        <MenuBox>
          <MenuList selected={selectedMenu === 'javaScript'}>
            <Link to="/react-blog/javaScript">JavaScript</Link>
          </MenuList>
          <MenuList selected={selectedMenu === 'typeScript'}>
            <Link to="/react-blog/typeScript">TypeScript</Link>
          </MenuList>
          <MenuList selected={selectedMenu === 'react'}>
            <Link to="/react-blog/react">React</Link>
          </MenuList>
          <MenuList selected={selectedMenu === 'git'}>
            <Link to="/react-blog/git">Git</Link>
          </MenuList>
          <MenuList selected={selectedMenu === 'algorism'}>
            <Link to="/react-blog/algorism">Algorism</Link>
          </MenuList>
          <MenuList selected={selectedMenu === 'other'}>
            <Link to="/react-blog/other">Other</Link>
          </MenuList>
        </MenuBox>
      </nav>
      <GitHubLink href="https://github.com/kkj6670" target="_blank" />
    </Header>
  );
}

export default LeftBar;
