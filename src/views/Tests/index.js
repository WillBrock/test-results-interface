import React, { useState } from 'react';
import gql from 'graphql-tag';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import { useQuery } from 'react-apollo-hooks';

const columns = [
	{
		Header : `Run`,
		accessor : `run_key`,
	},
	{
		Header : `Issue Key`,
		accessor : `issue_key`,
	},
	{
		Header : `Suites`,
		accessor : `suites`,
	}
];

const GET_RUNS = gql`
	query GetRunsTest($id: Int, $page_size: Int, $page: Int, $sorted: [Sorted], $filtered: [Filtered]) {
		testRuns(id: $id, page_size: $page_size, page: $page, sorted: $sorted, filtered: $filtered) {
			id,
			run_key,
			issue_key,
		}
	}
`;

function Tests() {
	const [ pages ] = useState(15);
	const [ table_state, setTableState ] = useState({
		pageSize : 10,
		page     : 0,
		sorted   : [],
		filtered : [],
	});

	const { data, loading } = useQuery(GET_RUNS, {
		variables : {
			page_size : table_state.page_size,
			page      : table_state.page,
			sorted    : table_state.sorted,
			filtered  : table_state.filtered
		},
		suspend : false,
	});

	function fetchData(state) {
		setTableState({
			page_size : state.pageSize || 10,
			page      : state.page || 0,
			sorted    : state.sorted || [],
			filtered  : state.filtered || [],
		});
	}

	return (
		<ReactTable
			manual
			columns={columns}
			data={data.testRuns}
			loading={loading}
			pages={pages}
			onFetchData={fetchData}
			defaultPageSize={10}
			filterable
		/>
	)
}

export default Tests;
