import React from 'react';
import { Route } from 'react-router-dom';
import Runs from './views/Runs';
import Run from './views/Runs/Run';
import Specs from './views/Specs';
import Spec from './views/Specs/Spec';
import Tests from './views/Tests';
import PageContainer from './components/PageContainer';

function Routes() {
	return (
		<PageContainer>
			<Route exact path="/" component={Runs} />
			<Route exact path="/runs/:run_id" component={Run}/>
			<Route exact path="/tests" component={Tests}/>
			<Route exact path="/specs" component={Specs}/>
			<Route exact path="/specs/:spec_id" component={Spec}/>
		</PageContainer>
	);
}

export default Routes;
