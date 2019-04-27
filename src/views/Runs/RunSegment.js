import React from 'react';
import styled from 'styled-components';
import FlexBox from '../../components/FlexBox';
import { Segment } from 'semantic-ui-react';

const CustomFlexBox = styled(FlexBox)`
	justify-content : space-around;
`;

function RunSegment({ run }) {
	return (
		<Segment>
			<CustomFlexBox>
				<div>
					{run.user || `Invalid User`}
				</div>
				<div>
					{run.run_key}
				</div>
				<div>
					{run.issue_key}
				</div>
				<div>
					{run.suites ? run.suites.replace(/,/g, `, `) : ``}
				</div>
			</CustomFlexBox>
		</Segment>
	);
}

export default RunSegment;
