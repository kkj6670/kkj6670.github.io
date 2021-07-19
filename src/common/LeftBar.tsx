import React, {useCallback} from 'react';
import styled from 'styled-components';

const NavBox = styled.nav`
	display: flex;
	flex-direction: column;
	width: 250px;
	height: 100%;
  ${({theme}) => `
    color: ${theme.textColor};
    background-color: ${theme.name === 'dark' ? theme.color.darkGray : theme.color.lightGray};
  `};
	padding: 1rem;
`;

const Profile = styled.div`
	& > p {
		margin: 1rem 0;
		font-size: 1.4rem;
	}
	& > a {
    ${({theme}) => `
	    color: ${theme.textColor};
	  `};
		font-size: 1.4rem;
	}
  margin-bottom: 3rem;
`;

interface IMenuList {
	selected: boolean;
};

const MenuList = styled.li<IMenuList>`
	display: flex;
	align-items: center;
	border-bottom: 1px solid ${({theme}) => theme.textColor};
	
	&:last-child {
		border-bottom: 0 none;
	}
	
	& > button {
		display: block;
		width: 100%;
    cursor: pointer;
    padding: 1.5rem 0;
    ${({theme}) => `
	    color: ${theme.textColor};
	    background-color: transparent;
	  `};
	}
`;

function LeftBar() {

	const handleMenuClick = useCallback((e) => {
		console.log("click");
	}, []);

	return (
		<NavBox>
			<Profile>
				<h2>Study Note</h2>
				{/*<p>jjy7201@gmail.com</p>*/}
				{/*<a href='https://github.com/kkj6670' target='_blank'>github</a>*/}
			</Profile>
			<ul>
				<MenuList selected={true}>
					<button onClick={handleMenuClick}>JavaScript</button>
				</MenuList>
				<MenuList selected={true}>
					<button onClick={handleMenuClick}>React</button>
				</MenuList>
			</ul>
		</NavBox>
	);
}

export default LeftBar;
