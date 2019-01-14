import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';

const NavContainer = styled.nav`
	flex-direction : column;
	overflow       : hidden;
	height         : 100vh;
	/*background     : #474544;*/
	background : rgb(240, 240, 240);
	/*box-shadow     : 4px 0 1px -2px grey;*/
	border-right : 1px solid rgb(62, 134, 193);
`;

const ListItem = styled.li`
	/*border-top : 1px solid #1A1817;*/
	border-bottom : 1px solid rgba(0, 0, 0, 0.1);

	/*
	:last-child {
		border-bottom : 1px solid #1A1817;
	}
	*/
`;

const CustomLink = styled(Link)`
	display : block;
	padding : 10px 10px 10px 14px;

	:hover {
		background : rgb(212, 212, 212);
	}
`;

function SideNav() {
	return (
		<NavContainer>
			<ul>
				<ListItem>
					<CustomLink to="/runs" title="Test Runs"><Icon name="plane" size="large" color="grey" /></CustomLink>
				</ListItem>
				<ListItem>
					<CustomLink to="/tests" title="Specs"><Icon name="folder open" size="large" color="grey" /></CustomLink>
				</ListItem>
			</ul>
		</NavContainer>
	);
}

export default SideNav;
