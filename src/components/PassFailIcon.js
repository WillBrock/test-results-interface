import React from 'react';
import { Icon } from 'semantic-ui-react';

function PassFailIcon({ passed, failed }) {
	let name  = null;
	let color = null;

	if(passed) {
		name  = `check`;
		color = `green`;
	}
	else if(failed) {
		name  = `cancel`;
		color = `red`;
	}
	else {
		name  = `minus`;
		color = `yellow`;
	}

	return <Icon name={name} color={color} />;
}

export default PassFailIcon;
