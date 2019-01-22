import React from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import { Modal, Tab } from 'semantic-ui-react';
import formatDuration from '../../helpers/duration';
import FlexBox from '../../components/FlexBox';
import Overview from './Overview';
import History from './History';

const CustomFlexBox = styled(FlexBox)`
	justify-content : space-around;
`;

const FlexGrow = styled.div`
	min-width : 200px;
`;

const Duration = styled(FlexGrow)`
	text-align : right;
`;

const GET_SPEC_DATA = gql`
	query getSpecResults($spec_id: String, $page_size: Int, $page: Int, $sorted: [Sorted]) {
		specResults(spec_id: $spec_id, page_size: $page_size, page: $page, sorted: $sorted) {
			data {
				id,
				spec_id,
				test_run_id,
				suite_title,
				passed,
				failed,
				skipped,
				duration,
				number_sql_queries,
				retries,
				run_date,
				error_message,
			}
		}
	}
`;

function SpecDetails({ open, handleClose, spec, getIcon }) {
	const results = useQuery(GET_SPEC_DATA, {
		variables : {
			spec_id   : spec.spec_id,
			page_size : 50,
			sorted    : [{
				id : `id`,
				desc : true,
			}]
		},
	});

	const specs = results.data.specResults;

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
			render   : () => <Tab.Pane attached={false}><History specs={specs} getIcon={getIcon} /></Tab.Pane>
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
					<FlexGrow>
						{getIcon({ passed : spec.passed, failed : spec.failed })} {spec.spec_id}
					</FlexGrow>
					<div>
						{spec.suite_title}
					</div>
					<Duration>
						Duration: {spec.duration ? formatDuration(Number(spec.duration) * .001) : ``}
					</Duration>
				</CustomFlexBox>
			</Modal.Header>

			<Modal.Content scrolling>
				<Tab menu={{ secondary : true, pointing : true }} panes={panes} />
			</Modal.Content>
		</Modal>
	);
}

export default SpecDetails;
