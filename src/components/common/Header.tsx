import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import styled from 'styled-components';

import { AiFillGithub } from 'react-icons/ai';
import { SiJavascript, SiTypescript, SiReact } from 'react-icons/si';
import { FaHeadSideVirus } from 'react-icons/fa';
import { BsFillChatSquareDotsFill } from 'react-icons/bs';
import { GiHamburgerMenu } from 'react-icons/gi';

import useWindowSize from '../../lib/hooks/useWindowSize';

import menuData from '../../../public/static/data/menu.json';

import BoardSearch from '../board/BoardSearch';

interface IMenuList {
  selected: boolean;
}

interface ISiderBarProps {
  isHide: boolean;
}

const SideBar = styled.div<ISiderBarProps>`
  position: relative;
  z-index: 3;
  display: ${({ isHide }) => (isHide ? 'none' : 'flex')};
  flex-direction: column;
  width: 250px;
  height: 100%;
  @media only screen and (max-width: 768px) {
    width: 50%;
    position: fixed;
    top: 0;
    left: 0;
  }
  padding: 40px 20px;
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

  font-family: 'IM_Hyemin-Regular';
  font-weight: bold;
`;

const TopBar = styled.div`
  @media only screen and (min-width: 769px) {
    display: none;
  }
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  padding: 0 20px;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.pointBgColor};
  color: ${({ theme }) => theme.textColor};
  font-size: 2rem;

  > button {
    display: block;
    width: 24px;
    height: 24px;
    color: ${({ theme }) => theme.textColor};
    :first-child {
      background-color: transparent;
    }
  }
`;

const SearchBtn = styled.button`
  mask: url('${process.env.URL_PATH}/static/images/icon/search.svg') no-repeat center;
  mask-size: 24px;
  background-color: ${({ theme }) => theme.textColor};
  color: transparent;
`;

const SideBarTitle = styled.h1`
  text-align: center;
  font-size: 3rem;
  margin-bottom: 1.5rem;
  background: url('${process.env.URL_PATH}/static/images/icon/note.svg') no-repeat 0 50%;
  background-size: 30px;
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
    position: relative;
    width: 100%;
    height: 100%;
    cursor: pointer;
    font-size: 1.65rem;
    align-items: center;
    justify-content: center;
    font-family: 'IM_Hyemin-Regular';
    font-weight: bold;

    ${({ theme, selected }) => `
	    color: ${theme.textColor};
	    background-color: ${selected ? theme.pointBgHoverColor : 'transparent'};
	  `};

    transition: all 0.125s ease-in 0s;

    &:hover {
      background-color: ${({ theme }) => theme.pointBgHoverColor};
      font-size: 1.8rem;
    }

    > svg {
      transition: all 0.125s ease-in 0s;
      position: absolute;
      left: 5px;
    }

    > span {
      font-size: 1.4rem;
      font-weight: 600;
      position: absolute;
      right: 5px;
      color: ${({ theme }) => theme.color.darkGray3};
    }
  }
`;

const FooterBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const GitHubLink = styled.a`
  display: block;
  width: 40px;
  height: 40px;
  color: #000;
`;

const Overlay = styled.div`
  position: fixed;
  width: 50%;
  height: 100%;
  right: 0;
  z-index: 2;
  overflow: hidden;
  background-color: black;
  opacity: 0.5;
`;

const CATEGORY_LEN = JSON.parse(process.env.CATEGORY_LEN || '{}');

const Header = function () {
  const router = useRouter();
  const [selectedMenu, setMenu] = useState('');
  const [topBarTitle, setTopBarTitle] = useState('');
  const [isHideSideBar, hideSideBar] = useState(false);
  const [isMobile, setMobile] = useState(false);
  const windowSize = useWindowSize();

  useEffect(() => {
    setMenu(String(router.query.category));
    setTopBarTitle(window.document.title);
    hideSideBar(true);
  }, [router, hideSideBar, setTopBarTitle, setMenu]);

  useEffect(() => {
    if (windowSize.width <= 768) {
      hideSideBar(true);
      setMobile(true);
    } else {
      hideSideBar(false);
      setMobile(false);
    }
  }, [windowSize.width, hideSideBar]);

  const handleSideBarOpen = useCallback(() => {
    hideSideBar(!isHideSideBar);
  }, [isHideSideBar, hideSideBar]);

  const handleSearchOpen = useCallback(() => {
    hideSideBar(false);
    setTimeout(() => {
      document.getElementById('boardSearch')?.focus();
    }, 0);
  }, [hideSideBar]);

  const handleOverlayClick = useCallback(() => {
    hideSideBar(true);
  }, [hideSideBar]);

  return (
    <header>
      <SideBar isHide={isMobile && isHideSideBar}>
        <div>
          <BoardSearch />
          <SideBarTitle>K Note</SideBarTitle>
        </div>
        <nav>
          <MenuBox>
            {menuData.map((item) => (
              <MenuList key={item.id} selected={selectedMenu === item.id}>
                <Link href='/board/[category]' as={`/board/${item.id}`}>
                  <a>
                    {item.id === 'javascript' && <SiJavascript size='22px' />}
                    {item.id === 'typescript' && <SiTypescript size='22px' />}
                    {item.id === 'react' && <SiReact size='22px' />}
                    {item.id === 'git' && <AiFillGithub size='22px' />}
                    {item.id === 'algorism' && <FaHeadSideVirus size='22px' />}
                    {item.id === 'other' && <BsFillChatSquareDotsFill size='22px' />}
                    {item.name}
                    <span>({CATEGORY_LEN[item.id] || 0})</span>
                  </a>
                </Link>
              </MenuList>
            ))}
          </MenuBox>
        </nav>
        <FooterBox>
          <GitHubLink href='https://github.com/kkj6670' target='_blank' title='kkj6670GitHubLinkOpen' rel='noreferrer'>
            <AiFillGithub size='100%' />
          </GitHubLink>
        </FooterBox>
      </SideBar>
      <Overlay hidden={isHideSideBar} onClick={handleOverlayClick} />
      <TopBar>
        <button type='button' onClick={handleSideBarOpen}>
          <GiHamburgerMenu size='24px' />
        </button>
        <p>{topBarTitle}</p>
        <SearchBtn onClick={handleSearchOpen}>search</SearchBtn>
      </TopBar>
    </header>
  );
};

export default Header;
