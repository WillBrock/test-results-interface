import React from 'react';
import styled from 'styled-components';
import FlexBox from '../../components/FlexBox';
import { Segment } from 'semantic-ui-react';

const CustomFlexBox = styled(FlexBox)`
	justify-content : space-around;
`;

function SpecSegment({ spec }) {
	return (
		<Segment>
			<CustomFlexBox>
				<div>
					{spec.spec_id}
				</div>
				<div>
					{spec.suite_title.replace(/FOCUS-\d.*-/, ``)}
				</div>
			</CustomFlexBox>
		</Segment>
	);
}

export default SpecSegment;
