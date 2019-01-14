import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import ReactTable from 'react-table';
import { useQuery } from 'react-apollo-hooks';
import { Icon, Button } from 'semantic-ui-react';
import styled from 'styled-components';
import 'react-table/react-table.css';
import '../../styles/react-table.scss';

const CenterCell = styled.span`
	display    : block;
	text-align : center;
`;

const RightCell = styled.span`
	display    : block;
	text-align : right;
`;

const default_page_size = 15;

const GET_RUNS = gql`
	query GetRuns($id: Int, $page_size: Int, $page: Int, $sorted: [Sorted], $filtered: [Filtered]) {
		testRuns(id: $id, page_size: $page_size, page: $page, sorted: $sorted, filtered: $filtered) {
			id,
			run_key,
			issue_key,
			passed,
			length,
			start,
			version,
		}
	}
`;

function RunTable() {
	const columns = [
		{
			Header   : `Run`,
			accessor : `run_key`,
		},
		{
			Header   : `Issue Key`,
			accessor : `issue_key`,
		},
		{
			Header   : `Suites`,
			accessor : `suites`,
		},
		{
			Header   : `Start`,
			accessor : `start`,
			Cell     : props => <RightCell>{props.value}</RightCell>
		},
		{
			Header   : `Duration`,
			accessor : `length`,
			Cell     : props => <RightCell>{props.value}</RightCell>
		},
		{
			Header   : `Version`,
			accessor : `version`,
			Cell     : props => <RightCell>{props.value}</RightCell>
		},
		{
			Header   : `Result`,
			accessor : `passed`,
			Cell     : props => {
				const passed = Number(props.value) === 1;
				const name   = passed ? `check` : `cancel`;
				const color  = passed ? `green` : `red`;

				return <CenterCell><Icon name={name} color={color} /></CenterCell>
			}
		},
		{
			Header     : ``,
			accessor   : `id`,
			filterable : false,
			sortable   : false,
			Cell       : props => <CenterCell><Link to={`/runs/${props.value}`}><Button positive size="small">View</Button></Link></CenterCell>
		}
	];

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
			className="-striped"
			filterable
		/>
	)
}

export default RunTable;
