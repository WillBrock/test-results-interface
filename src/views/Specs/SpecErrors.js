import React from 'react';
import styled from 'styled-components';
import { Modal } from 'semantic-ui-react';
import Overview from '../Runs/Overview';
import FlexBox from '../../components/FlexBox';

const CustomFlexBox = styled(FlexBox)`
	justify-content : space-around;
`;

function SpecErrors({ open, handleClose, spec }) {
	return (
		<Modal
			size="large"
			centered={false}
			open={open}
			onClose={handleClose}
		>
			<Modal.Header>
				<CustomFlexBox>
					<div>
						{spec.suite_title}
					</div>
				</CustomFlexBox>
			</Modal.Header>

			<Modal.Content scrolling>
				<Overview spec={spec} />
			</Modal.Content>
		</Modal>
	);
}

export default SpecErrors;
