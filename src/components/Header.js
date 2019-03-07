import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const HeaderContainer = styled.div`
	position : fixed;
	display: flex;
	justify-content : space-between;
	padding : 0 10px;
	height : 45px;
	width : 100%;
	background : rgb(59, 146, 222);
	z-index : 1000;
`;

const Title = styled.div`
	display : flex;
	flex-direction : column;
	justify-content : center;
	color : #fff;
	font-weight : 700;
	font-size : 16px;
`;

const CustomNav = styled(NavLink)`
	color : #fff;
	text-decoration : none;

	:visited {
		text-decoration : none;
	}

	:hover {
		color : #fff;
	}
`;

function Header() {
	return (
		<HeaderContainer>
			<Title>
				<CustomNav to="/">Test Results Reporter</CustomNav>
			</Title>
		</HeaderContainer>
	);
}

export default Header;
