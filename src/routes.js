import React from 'react';
import { Route } from 'react-router-dom';
import Runs from './views/Runs';
import Tests from './views/Tests';

function Routes() {
	return (
		<>
			<Route exact path="/" component={Runs} />
			<Route path="/tests" component={Tests} />
		</>
	);
}

export default Routes;
