import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';

const NavContainer = styled.nav`
	position       : fixed;
	flex-direction : column;
	overflow       : hidden;
	height         : 100vh;
	margin-top     : 45px;
	background     : rgb(240, 240, 240);
	border-right   : 1px solid rgb(62, 134, 193);
`;

const ListItem = styled.li`
	border-bottom : 1px solid rgba(0, 0, 0, 0.1);
`;

const CustomLink = styled(NavLink)`
	display : block;
	padding : 10px 10px 10px 14px;

	:hover {
		background : rgb(212, 212, 212);
	}
`;

const active_style = {
	borderLeft : "3px solid rgb(59,146,222)",
};

function SideNav() {
	return (
		<NavContainer>
			<ul>
				<ListItem>
					<CustomLink exact to="/" title="Branch Runs" activeStyle={active_style}><Icon name="plane" size="large" color="grey" /></CustomLink>
				</ListItem>

				<ListItem>
					<CustomLink to="/specs" title="Specs" activeStyle={active_style}><Icon name="folder open" size="large" color="grey" /></CustomLink>
				</ListItem>
				{/*
				<ListItem>
					<CustomLink to="/stats" title="Stats" activeStyle={active_style}><Icon name="plane" size="large" color="grey" /></CustomLink>
				</ListItem>
				*/}
			</ul>
		</NavContainer>
	);
}

export default SideNav;
