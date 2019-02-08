import React from 'react';
import { Message } from 'semantic-ui-react';

function Overview({ spec }) {
	return (
		<div>
			{spec.failed ? (
				<>
					<Message negative>
						{spec.error_message}
					</Message>

					<Message negative>
						{spec.stacktrace}
					</Message>
				</>
			) : (
				<Message positive>
					Spec Passed!
				</Message>
			)}
		</div>
	);
}

export default Overview;
