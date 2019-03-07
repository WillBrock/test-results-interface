import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Dimmer, Loader } from 'semantic-ui-react';
import Routes from './routes';
import Header from './components/Header';
import SideNav from './components/SideNav';
import styled from 'styled-components';
import './styles/reset.css';
import 'normalize.css';
import 'semantic-ui-css/semantic.min.css';
import PageContainer from './components/PageContainer';

const FlexContainer = styled.div`
	display : flex;
`;

function App() {
	return (
		<Router basename="/test-results-interface/">
			<div>
				<Header />
				<FlexContainer>
					<SideNav />
						<Suspense fallback={<PageContainer><Dimmer active><Loader>Loading</Loader></Dimmer></PageContainer>}>
							<Routes />
						</Suspense>
				</FlexContainer>
			</div>
		</Router>
	);
}

export default App;
