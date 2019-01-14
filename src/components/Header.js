import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
	display: flex;
	justify-content : space-between;
	padding : 0 10px;
	height : 45px;
	background : rgb(59, 146, 222);
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
