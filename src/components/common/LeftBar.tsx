import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import styled from 'styled-components';

import { AiFillGithub } from 'react-icons/ai';
import { SiJavascript, SiTypescript, SiReact } from 'react-icons/si';
import { FaHeadSideVirus } from 'react-icons/fa';
import { BsFillChatSquareDotsFill } from 'react-icons/bs';

import menuData from '../../../public/static/data/menu.json';

import BoardSearch from '../board/BoardSearch';

interface IMenuList {
  selected: boolean;
}

const Header = styled.header`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 100%;
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

const HeaderTitle = styled.h1`
  text-align: center;
  font-size: 3rem;
  margin-bottom: 1.5rem;
  background: url('/static/images/icon/note.svg') no-repeat 0 50%;
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

const CATEGORY_LEN = JSON.parse(process.env.CATEGORY_LEN || '{}');
const LeftBar = function () {
  const router = useRouter();
  const [selectedMenu, setMenu] = useState('');

  useEffect(() => {
    setMenu(String(router.query.category) || '');
  }, [router]);

  return (
    <Header>
      <div>
        <HeaderTitle>K Note</HeaderTitle>
        <BoardSearch />
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
    </Header>
  );
};

export default LeftBar;
