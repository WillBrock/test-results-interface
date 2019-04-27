import React, { useState } from 'react';
import ReactTable from 'react-table';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'semantic-ui-react';
import 'react-table/react-table.css';
import '../../styles/react-table.scss';

const CenterCell = styled.span`
	display    : block;
	text-align : center;
`;

const default_page_size = 15;

const GET_USERS = gql`
	query GetRuns($id: Int, $page_size: Int, $page: Int, $sorted: [Sorted], $filtered: [Filtered], $exclude_setup: Boolean) {
		testRuns(id: $id, page_size: $page_size, page: $page, sorted: $sorted, filtered: $filtered, exclude_setup: $exclude_setup) {
			count,
			data {
				id,
				run_key,
				issue_key,
				passed,
				duration,
				start,
				version,
				suites
			}
		}
	}
`;

function StatTable() {
	const [ table_state, setTableState ] = useState({
		page     : 0,
		sorted   : [{ id : `id`, desc : true }],
		filtered : [],
	});

	const { data, loading } = useQuery(GET_USERS, {
		variables : {
			page_size : default_page_size,
			page      : table_state.page,
			sorted    : table_state.sorted.length ? table_state.sorted : [{ id : `id`, desc : true }],
			filtered  : table_state.filtered,
		},
		suspend : false,
	});

	const columns = [
		{
			Header   : `User`,
			accessor : `user`,
		},
		{
			Header   : `Passed`,
			accessor : `passed`,
		},
		{
			Header   : `Failed`,
			accessor : `failed`,
		},
		{
			Header   : `Pct Failed`,
			accessor : `percent_failed`,
		},
		{
			Header     : ``,
			accessor   : `spec_id`,
			filterable : false,
			sortable   : false,
			Cell       : props => (
				<CenterCell>
					<Link to={`/stats/${props.value}`}>
						<Button positive size="small">View</Button>
					</Link>
				</CenterCell>
			),
		},
	];

	function fetchData(state) {
		setTableState({
			page_size : state.pageSize || default_page_size,
			page      : state.page || 0,
			sorted    : state.sorted.length ? state.sorted : [{ id : `failed`, desc : true }, { id : `passed`, desc : true }],
			filtered  : state.filtered.length ? state.filtered : [],
		});
	}

	return (
		<>
			{!loading ? (
				<ReactTable
					manual
					filterable
					loading={loading}
					columns={columns}
					data={data.testRuns.data}
					pages={Math.ceil(data.testRuns.count / default_page_size)}
					onFetchData={fetchData}
					defaultPageSize={default_page_size}
					className="-striped"
					showPageSizeOptions={false}
				/>
			) : (
				<ReactTable
					manual
					filterable
					loading={loading}
					columns={columns}
					data={[]}
					defaultPageSize={default_page_size}
					className="-striped"
					showPageSizeOptions={false}
				/>
			)}
		</>
	)
}

export default StatTable;
