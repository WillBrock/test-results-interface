import React from 'react';
import { Segment } from 'semantic-ui-react';
import Select from 'react-select';
import styled from 'styled-components';

const CustomSelect = styled(Select)`
	width : 500px;
`;

function SelectRun(props) {
	return (
		<Segment>
			<>
				<CustomSelect
					options={props.runs}
					placeholder="Runs..."
					isSearchable="true"
					onChange={props.handleSelectRun}
				/>
			</>
		</Segment>
	);
}

export default SelectRun;
