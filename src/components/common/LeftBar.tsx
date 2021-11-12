import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useHistory, Link, useLocation } from 'react-router-dom';
import { AiFillGithub } from 'react-icons/ai';
import { SiJavascript, SiTypescript, SiReact } from 'react-icons/si';
import { FaHeadSideVirus } from 'react-icons/fa';
import { BsFillChatSquareDotsFill } from 'react-icons/bs';

import BoardSearch from '../board/BoardSearch';

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
    background-color: ${theme.pointBgColor};
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

    position: relative;

    ${({ theme, selected }) => `
	    color: ${theme.textColor};
	    background-color: ${selected ? 'rgb(71, 76, 80)' : 'transparent'};
	  `};

    transition: all 0.125s ease-in 0s;

    &:hover {
      background-color: ${({ selected }) => (selected ? 'rgb(69,75,77)' : 'rgb(71, 76, 80)')};
      > svg {
        transform: scale(1.2);
      }
      font-size: 2rem;
    }

    > svg {
      left: 15px;
      position: absolute;
      transition: all 0.125s ease-in 0s;
    }
  }
`;

const LinkBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  > a {
    display: block;
    width: 40px;
    height: 40px;
    color: #000;
  }
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
  }, [location, history]);

  return (
    <Header>
      <div>
        <HeaderTitle>Study Note</HeaderTitle>
        <BoardSearch />
      </div>
      <nav>
        <MenuBox>
          {menuData.map((item) => (
            <MenuList key={item.id} selected={selectedMenu === item.id}>
              <Link to={`${URL_PATH}${item.id}`} title={`${item.id} menu open`}>
                {item.id === 'javaScript' && <SiJavascript size='25px' />}
                {item.id === 'typeScript' && <SiTypescript size='25px' />}
                {item.id === 'react' && <SiReact size='25px' />}
                {item.id === 'git' && <AiFillGithub size='25px' />}
                {item.id === 'algorism' && <FaHeadSideVirus size='25px' />}
                {item.id === 'other' && <BsFillChatSquareDotsFill size='25px' />}
                {item.name}
              </Link>
            </MenuList>
          ))}
        </MenuBox>
      </nav>
      <LinkBox>
        <a href='https://github.com/kkj6670' target='_blank' title='kkj6670GitHubLinkOpen' rel='noreferrer'>
          <AiFillGithub size='100%' />
        </a>
      </LinkBox>
    </Header>
  );
}

export default LeftBar;
