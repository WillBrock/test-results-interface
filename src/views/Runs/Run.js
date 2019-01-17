import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import RunSegment from './RunSegment';
import SpecTable from './SpecTable';

const GET_RUN = gql`
	query getRun($id: Int) {
		testRuns(id: $id) {
			data {
				id,
				run_key,
				issue_key
			}
		}
	}
`;

function Run({ match }) {
	const [ run, setRun ] = useState({});

	const { data } = useQuery(GET_RUN, {
		variables : { id : match.params.run_id }
	});

	useEffect(() => {
		setRun(data.testRuns.data[0]);
	}, [data]);

	return (
		<>
			<RunSegment run={run} />
			<SpecTable
				run={run}
			/>
		</>
	)
}

export default Run;
