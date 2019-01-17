import React, { useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import ReactTable from 'react-table';
import { useQuery } from 'react-apollo-hooks';
import { Icon, Button, Checkbox } from 'semantic-ui-react';
import styled from 'styled-components';
import formatDuration from '../../helpers/duration';
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

const LeftHeaderCell = styled.span`
	text-align : left;
`;

const RightHeaderCell = styled.span`
	float : right;
`;

const default_page_size = 15;

const GET_RUNS = gql`
	query GetRuns($id: Int, $page_size: Int, $page: Int, $sorted: [Sorted], $filtered: [Filtered], $exclude_setup: Boolean) {
		testRuns(id: $id, page_size: $page_size, page: $page, sorted: $sorted, filtered: $filtered, exclude_setup: $exclude_setup) {
			count,
			data {
				id,
				run_key,
				issue_key,
				passed,
				length,
				start,
				version,
				suites
			}
		}
	}
`;

function RunTable() {
	const [ exclude_setup, setExcludeSetup ] = useState(true);
	const [ table_state, setTableState ]     = useState({
		page_size : default_page_size,
		page      : 0,
		sorted    : [],
		filtered  : [],
	});

	const { data, loading } = useQuery(GET_RUNS, {
		variables : {
			page_size : default_page_size,
			page      : table_state.page || 0,
			sorted    : table_state.sorted.length ? table_state.sorted : [{ id : `id`, desc : true }],
			filtered  : table_state.filtered || [],
			exclude_setup,
		},
		suspend : false,
	});

	const columns = [
		{
			Header   : () => (
				<>
					<LeftHeaderCell>Runs</LeftHeaderCell>
					<RightHeaderCell><Checkbox label="Exclude setup" checked={exclude_setup} onChange={() => setExcludeSetup(!exclude_setup)} /></RightHeaderCell>
				</>
			),
			accessor : `run_key`,
			minWidth : 200,
			sortable : false,
		},
		{
			Header   : `Start`,
			accessor : `start`,
			Cell     : props => moment(props.value).format(`MM/DD/YYYY HH:mm:ss`)
		},
		{
			Header   : `Issue Key`,
			accessor : `issue_key`,
		},
		{
			Header   : `Suites`,
			accessor : `suites`,
			minWidth : 250,
			Cell     : props => props.value.replace(/,/g, `, `),
		},
		{
			Header   : `Duration`,
			accessor : `length`,
			sortable : false,
			Cell     : props => <RightCell>{props.value ? formatDuration(props.value) : `In progress`}</RightCell>
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

	function fetchData(state) {
		setTableState({
			page_size : default_page_size,
			page      : state.page || 0,
			sorted    : state.sorted.length ? state.sorted : [{ id : `id`, desc : true }],
			filtered  : state.filtered || [],
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

export default RunTable;
