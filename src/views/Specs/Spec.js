import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import { Tab } from 'semantic-ui-react';
import SpecSegment from './SpecSegment';
import SpecHistoryTable from './SpecHistoryTable';
import Charts from './Charts';

const GET_SPEC = gql`
	query getSingleSpec($spec_id: String) {
		specResults(spec_id: $spec_id) {
			data {
				spec_id,
				suite_title,
			}
		}
	}
`;

function Run({ match }) {
	const { data, loading } = useQuery(GET_SPEC, {
		variables : {
			spec_id : match.params.spec_id,
			limit   : 1,
		},
	});

	if(loading) {
		return `Loading...`
	}

	const panes = [
		{
			menuItem : `History`,
			render   : () => (
				<Tab.Pane attached={false}>
					<SpecHistoryTable spec={data.specResults.data[0]} />
				</Tab.Pane>
			)
		},
		{
			menuItem : `Charts`,
			render   : () => (
				<Tab.Pane attached={false}>
					<Charts />
				</Tab.Pane>
			)
		}
	];

	return (
		<>
			<SpecSegment spec={data.specResults.data[0]} />
			<Tab menu={{ secondary : true, pointing : true }} panes={panes} />
		</>
	)
}

export default Run;
