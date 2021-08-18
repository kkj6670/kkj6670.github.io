import React, { useCallback } from 'react';
import styled from 'styled-components';
import {useBase, useBaseUpdate} from "../store/Base";

const NavBox = styled.nav`
	display: flex;
	flex-direction: column;
	width: 250px;
	height: 100%;
  padding: 50px 10px;
	
  ${({theme}) => `
    color: ${theme.textColor};
    background-color: ${theme.name === 'dark' ? theme.color.darkGray : theme.color.lightGray};
  `};
	
	justify-content: space-between;
`;

const NavTitle = styled.h2`
	text-align: center;
	font-size: 3.5rem;
`;

interface IMenuList {
	selected: boolean;
};

const MenuList = styled.li<IMenuList>`
	display: flex;
	align-items: center;
	height: 65px;
	
	&:last-child {
		border-bottom: 0 none;
	}
	
	& > button {
		display: block;
		width: 100%;
		height: 100%;
    cursor: pointer;
    font-size: 1.8rem;
		
    ${({theme, selected}) => `
	    color: ${theme.textColor};
	    background-color: ${selected ? 'rgb(71, 76, 80)' : 'transparent'};
	  `};
		
		&:hover {
			background-color: ${({ selected }) => selected ? 'rgb(69,75,77)' : 'rgb(71, 76, 80)'};
		}
	}
`;

const GitHubLink = styled.a`
  display: block;
  width: 100%;
  height: 30px;
  ${({theme}) => `
    color: ${theme.textColor};
  `};
  background: url('./images/icon/github.svg') no-repeat center center / 30px;
`;

function LeftBar() {
	const baseUpdate = useBaseUpdate();
	const baseState = useBase();

	const {
		selectedMenu
	} = baseState;

	const handleMenuClick = useCallback((e) => {
		const value = e.target.textContent;
		baseUpdate({ type: 'MENU_CHANGE', value });
	}, [baseUpdate]);

	return (
		<NavBox>
			<NavTitle>Study Note</NavTitle>
			<ul>
				<MenuList selected={selectedMenu === 'JavaScript'}>
					<button onClick={handleMenuClick}>JavaScript</button>
				</MenuList>
				<MenuList selected={selectedMenu === 'TypeScript'}>
					<button onClick={handleMenuClick}>TypeScript</button>
				</MenuList>
				<MenuList selected={selectedMenu === 'React'}>
					<button onClick={handleMenuClick}>React</button>
				</MenuList>
				<MenuList selected={selectedMenu === 'Git'}>
					<button onClick={handleMenuClick}>Git</button>
				</MenuList>
				<MenuList selected={selectedMenu === 'Algorism'}>
					<button onClick={handleMenuClick}>Algorism</button>
				</MenuList>
				<MenuList selected={selectedMenu === 'Other'}>
					<button onClick={handleMenuClick}>Other</button>
				</MenuList>
			</ul>
			<div>
				<GitHubLink href='https://github.com/kkj6670' target='_blank'></GitHubLink>
			</div>
		</NavBox>
	);
}

export default LeftBar;
