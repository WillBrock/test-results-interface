import React from 'react';
import styled from 'styled-components';

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

function Header() {
	return (
		<HeaderContainer>
			<Title>
				Test Results Reporter
			</Title>
		</HeaderContainer>
	);
}

export default Header;
