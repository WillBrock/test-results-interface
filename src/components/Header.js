import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
	display: flex;
	justify-content : space-between;
	padding : 0 10px;
	height : 40px;
	background : #474544;
	box-shadow : 0 8px 6px -6px gray;
`;

const Title = styled.div`
	display : flex;
	flex-direction : column;
	justify-content : center;
	color : #fff;
	font-weigth : 700;
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
