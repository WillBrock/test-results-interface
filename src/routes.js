import React from 'react';
import { Route } from 'react-router-dom';
import Runs from './views/Runs';
import Run from './views/Runs/Run';
import Tests from './views/Tests';
import PageContainer from './components/PageContainer';

function Routes() {
	return (
		<PageContainer>
			<Route exact path="/runs" component={Runs} />
			<Route path="/runs/:run_id" component={Run} />
			<Route path="/tests" component={Tests} />
		</PageContainer>
	);
}

export default Routes;
