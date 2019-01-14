import React from 'react';
import { Route } from 'react-router-dom';
import Runs from './views/Runs';
import Run from './views/Runs/Run';
import Tests from './views/Tests';

function Routes() {
	return (
		<>
			<Route exact path="/runs" component={Runs} />
			<Route path="/runs/:run_id" component={Run} />
			<Route path="/tests" component={Tests} />
		</>
	);
}

export default Routes;
