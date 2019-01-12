import React, { useState } from 'react';
import gql from 'graphql-tag';
import ReactTable from 'react-table';
import { useQuery } from 'react-apollo-hooks';
import "react-table/react-table.css";

const default_page_size = 20;

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
	},
	{
		Header : `Passed`,
		accessor : `passed`,
	},
	{
		Header : `Length`,
		accessor : `length`,
	},
	{
		Header : `Version`,
		accessor : `version`,
	},
];

const GET_RUNS = gql`
	query GetRuns($id: Int, $page_size: Int, $page: Int, $sorted: [Sorted], $filtered: [Filtered]) {
		testRuns(id: $id, page_size: $page_size, page: $page, sorted: $sorted, filtered: $filtered) {
			id,
			run_key,
			issue_key,
			passed,
			length,
			version,
		}
	}
`;

function RunTable() {
	const [ pages, setPages ]            = useState(15);
	const [ table_state, setTableState ] = useState({
		page_size : default_page_size,
		page      : 0,
		sorted    : [],
		filtered  : [],
	});

	const { data, loading } = useQuery(GET_RUNS, {
		variables : {
			page_size : table_state.page_size || default_page_size,
			page      : table_state.page || 0,
			sorted    : table_state.sorted || [],
			filtered  : table_state.filtered || [],
		},
		suspend : false,
	});

	function fetchData(state) {
		setTableState({
			page_size : state.pageSize || default_page_size,
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
			defaultPageSize={default_page_size}
			filterable
		/>
	)
}

export default RunTable;
