import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';

const NavContainer = styled.nav`
	flex-direction : column;
	overflow       : hidden;
	height         : 100vh;
	background     : #474544;
	box-shadow     : 4px 0 1px -2px grey;
`;

const ListItem = styled.li`
	border-top : 1px solid #1A1817;

	:last-child {
		border-bottom : 1px solid #1A1817;
	}
`;

const CustomLink = styled(Link)`
	display : block;
	padding : 10px 12px 10px 15px;

	:hover {
		background : gray;
	}
`;

function SideNav() {
	return (
		<NavContainer>
			<ul>
				<ListItem>
					<CustomLink to="/" title="Test Runs"><Icon inverted name="plane" size="large" color="grey" /></CustomLink>
				</ListItem>
				<ListItem>
					<CustomLink to="/tests" title="Specs"><Icon inverted name="folder open" size="large" color="grey" /></CustomLink>
				</ListItem>
			</ul>
		</NavContainer>
	);
}

export default SideNav;
