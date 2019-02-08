import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import ReactTable from 'react-table';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { useQuery } from 'react-apollo-hooks';
import 'react-table/react-table.css';
import '../../styles/react-table.scss';

const GET_SPECS = gql`
	query GetSpecs($page_size: Int, $page: Int, $sorted: [Sorted], $filtered: [Filtered]) {
		testSpecsUnique(page_size: $page_size, page: $page, sorted: $sorted, filtered: $filtered) {
			count,
			data {
				spec_id,
				suite_title,
				passes,
				fails,
				retries,
			}
		}
	}
`;

const CenterCell = styled.span`
	display    : block;
	text-align : center;
`;

const RightCell = styled.span`
	display    : block;
	text-align : right;
`;

function SpecTable() {
	const default_page_size = 15;
	const [ table_state, setTableState ] = useState({
		page     : 0,
		sorted   : [{ id : `spec_id`, desc : true }],
		filtered : [],
	});

	const { data, loading } = useQuery(GET_SPECS, {
		variables : {
			page_size : default_page_size,
			page      : table_state.page,
			sorted    : table_state.sorted,
			filtered  : table_state.filtered,
		},
		suspend : false,
	});

	const columns = [
		{
			Header   : `Spec`,
			accessor : `spec_id`,
		},
		{
			Header   : `Title`,
			accessor : `suite_title`,
			minWidth : 250,
		},
		{
			Header   : `Passes`,
			accessor : `passes`,
			Cell     : (props) => <RightCell>{props.value}</RightCell>
		},
		{
			Header   : `Fails`,
			accessor : `fails`,
			Cell     : (props) => <RightCell>{props.value}</RightCell>
		},
		{
			Header   : `Retries`,
			accessor : `retries`,
			Cell     : (props) => <RightCell>{props.value}</RightCell>
		},
		/*
		{
			Header   : `Query Pct Change`,
			accessor : `query_percent_change`,
			Cell     : (props) => <RightCell>{props.value}</RightCell>
		},
		*/
		{
			Header     : ``,
			accessor   : `spec_id`,
			filterable : false,
			sortable   : false,
			Cell       : props => <CenterCell><Link to={`/specs/${props.value}`}><Button positive size="small">View</Button></Link></CenterCell>
		},
	];

	function onFetchData(state) {
		setTableState({
			page     : state.page,
			sorted   : state.sorted,
			filtered : state.filtered,
		});
	}

	return (
		<>
			{!loading ? (
				<ReactTable
					manual
					filterable
					columns={columns}
					data={data.testSpecsUnique.data}
					pages={Math.ceil(data.testSpecsUnique.count / default_page_size)}
					onFetchData={onFetchData}
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
					className="-striped"
					showPageSizeOptions={false}
				/>
			)}
		</>
	)
}

export default SpecTable;
