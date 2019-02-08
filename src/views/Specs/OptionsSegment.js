import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import { Segment } from 'semantic-ui-react';

const Label = styled.label`
	display       : block;
	font-weight   : 800;
	margin-bottom : 10px;
`;

function OptionsSegment() {
	const options = [
		{ value : `1 day`, label : `1 Day` },
		{ value : `3 day`, label : `3 Day` },
		{ value : `1 week`, label : `1 Week` },
		{ value : `2 week`, label : `2 Weeks` },
		{ value : `1 month`, label : `1 Month` },
		{ value : `3 month`, label : `3 Months` },
		{ value : `6 month`, label : `6 Months` },
	];

	return (
		<>
			<Segment>
				<Label>Query Percent Change</Label>
				<Select
					defaultValue={{ value : `1 week`, label : `1 Week` }}
					name="percent-change-length"
					options={options}
				/>
			</Segment>
		</>
	);
}

export default OptionsSegment;
