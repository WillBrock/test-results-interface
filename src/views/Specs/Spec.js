import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import SpecSegment from './SpecSegment';
import SpecHistoryTable from './SpecHistoryTable';

// Tabs - History, charts

// Charts - queries ran, duration, pass/fail scatter plot, retry scatter plot

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

	return (
		<>
			<SpecSegment spec={data.specResults.data[0]} />
			<SpecHistoryTable
				spec={data.specResults.data[0]}
			/>
		</>
	)
}

export default Run;
