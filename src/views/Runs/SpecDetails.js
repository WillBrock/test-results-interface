import React from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import { Modal, Tab } from 'semantic-ui-react';
import FlexBox from '../../components/FlexBox';
import Overview from './Overview';
import History from './History';

const CustomFlexBox = styled(FlexBox)`
	justify-content : space-around;
`;

/*
const GET_SPEC_DATA = gql`

`;
*/

function SpecDetails({ open, handleClose, spec, getIcon }) {
	/*
	const { data } = useQuery(GET_SPEC_DATA, {
		variables : {},
	});
	*/

	const panes = [
		{
			menuItem : `Overview`,
			render   : () => <Tab.Pane attached={false}><Overview spec={spec} /></Tab.Pane>
		},
		{
			menuItem : `Logs`,
			render   : () => <Tab.Pane attached={false}>Logs</Tab.Pane>
		},
		{
			menuItem : `Screenshots`,
			render   : () => <Tab.Pane attached={false}>Screenshots</Tab.Pane>
		},
		{
			menuItem : `History`,
			render   : () => <Tab.Pane attached={false}><History /></Tab.Pane>
		}
	];

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
						{getIcon({ passed : spec.passed, failed : spec.failed })} {spec.spec_id}
					</div>
					<div>
						{spec.suite_title}
					</div>
					<div>
						Duration: {spec.formatted_duration} seconds
					</div>
				</CustomFlexBox>
			</Modal.Header>

			<Modal.Content scrolling>
				<Tab menu={{ secondary : true, pointing : true }} panes={panes} />
			</Modal.Content>
		</Modal>
	);
}

export default SpecDetails;
