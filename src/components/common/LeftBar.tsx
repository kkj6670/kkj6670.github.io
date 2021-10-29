import React, { useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory, Link, useLocation } from 'react-router-dom';
import Search from './Search';

import IMG_GITHUB from '../../../public/images/icon/github.svg';
import menuData from '../../../public/data/menu.json';

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

  const selectedMenu = useMemo(() => {
    const menu = location.pathname.replace('/react-blog/', '').split('/')[0];

    if (menu.length === 0) {
      history.push('/react-blog/javaScript');
    }

    return menu;
  }, [location]);

  return (
    <Header>
      <div>
        <HeaderTitle>Study Note</HeaderTitle>
        <Search />
      </div>
      <nav>
        <MenuBox>
          {menuData.map((item) => (
            <MenuList key={item.id} selected={selectedMenu === item.id}>
              <Link to={`${URL_PATH}${item.id}`}>{item.name}</Link>
            </MenuList>
          ))}
        </MenuBox>
      </nav>
      <GitHubLink href="https://github.com/kkj6670" target="_blank" />
    </Header>
  );
}

export default LeftBar;
