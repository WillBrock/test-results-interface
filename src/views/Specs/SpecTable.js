import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import ReactTable from 'react-table';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { useQuery } from 'react-apollo-hooks';
import formatDuration from '../../helpers/duration';
import 'react-table/react-table.css';
import '../../styles/react-table.scss';

const default_page_size = 15;

const GET_SPECS = gql`
	query GetSpecs {
		testSpecsUnique {
			count,
			data {
				spec_id,
				suite_title,
				passes,
				fails,
				retries,
				query_percent_change,
				average_duration,
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
	const { data, loading } = useQuery(GET_SPECS, {
		suspend : false,
	});

	const columns = [
		{
			Header   : `Test Case #`,
			accessor : `spec_id`,
		},
		{
			Header   : `Title`,
			accessor : `suite_title`,
			minWidth : 250,
			Cell     : props => props.value ? props.value.replace(/FOCUS-\d.*- /, ``) : ``,
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
		{
			Header   : `Avg Duration`,
			accessor : `average_duration`,
			Cell     : props => <RightCell>{props.value ? formatDuration(Number(props.value) * .001) : ``}</RightCell>
		},
		{
			Header     : `Query Pct Change`,
			accessor   : `query_percent_change`,
			filterable : false,
			Cell       : (props) => <RightCell>{props.value}</RightCell>
		},
		{
			Header     : ``,
			accessor   : `spec_id`,
			filterable : false,
			sortable   : false,
			Cell       : props => <CenterCell><Link to={`/specs/${props.value}`}><Button positive size="small">View</Button></Link></CenterCell>
		},
	];

	return (
		<>
			{!loading ? (
				<ReactTable
					//manual
					filterable
					columns={columns}
					data={data.testSpecsUnique.data}
					pages={Math.ceil(data.testSpecsUnique.count / default_page_size)}
					//onFetchData={onFetchData}
					defaultPageSize={default_page_size}
					className="-striped"
					showPageSizeOptions={false}
				/>
			) : (
				<ReactTable
					//manual
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

export default SpecTable;
