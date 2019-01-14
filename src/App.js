import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import Header from './components/Header';
import SideNav from './components/SideNav';
import styled from 'styled-components';
import './styles/reset.css';
import 'normalize.css';
import 'semantic-ui-css/semantic.min.css';

const FlexContainer = styled.div`
	display : flex;
`;

function App() {
	return (
		<Router>
			<div>
				<Header />
				<FlexContainer>
					<SideNav />
						<Suspense fallback={<div>Loading...</div>}>
							<Routes />
						</Suspense>
				</FlexContainer>
			</div>
		</Router>
	);
}

export default App;
