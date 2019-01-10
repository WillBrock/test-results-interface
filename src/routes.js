import React from 'react';
import { Route } from 'react-router-dom';
import Runs from './views/Runs';

function Routes() {
	return (
		<div>
			<Route exact path="/" component={Runs} />
		</div>
	);
}

export default Routes;
