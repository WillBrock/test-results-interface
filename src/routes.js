import React from 'react';
import { Route } from 'react-router-dom';
import Runs from './views/Runs';
import Run from './views/Runs/Run';
import Specs from './views/Specs';
import Spec from './views/Specs/Spec';
import Tests from './views/Tests';
import Stats from './views/Stats';
import PageContainer from './components/PageContainer';

function Routes() {
	return (
		<PageContainer>
			<Route exact path="/" component={Runs} />
			<Route exact path="/runs/:run_id" component={Run} />
			<Route exact path="/tests" component={Tests} />
			<Route exact path="/specs" component={Specs} />
			<Route exact path="/specs/:spec_id" component={Spec} />
			<Route exact path="/stats" component={Stats} />
			<Route exact path="/stats/:user_id" component={Stats} />
		</PageContainer>
	);
}

export default Routes;
