import React from 'react';
import { Message } from 'semantic-ui-react';
import styled from 'styled-components';

const CustomDiv = styled.div`
	margin-top : 15px;
`;

function Overview({ spec }) {
	if(!spec.errors.length) {
		return (
			<Message positive>
				Spec Passed!
			</Message>
		);
	}

	return (
		<>
			{
				spec.errors.map((error, index) => (
					<CustomDiv key={error.id}>
						<div>Error: {index + 1}</div>

						<Message negative>
							{error.error_message}
						</Message>

						<Message negative>
							{error.stacktrace}
						</Message>
					</CustomDiv>
				))
			}
		</>
	);
}

export default Overview;
