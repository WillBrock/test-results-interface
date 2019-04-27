import React from 'react';
import { Message } from 'semantic-ui-react';

function Error({ errors }) {
	const last_error = errors[errors.length - 1];

	return (
		<>
			<Message negative>{last_error.error_message}</Message>
			<Message negative>{last_error.stacktrace}</Message>
		</>
	);
}

export default Error;
