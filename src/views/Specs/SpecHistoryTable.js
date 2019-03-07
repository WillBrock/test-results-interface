import React, { useState } from 'react';
import moment from 'moment';
import gql from 'graphql-tag';
import ReactTable from 'react-table';
import { useQuery } from 'react-apollo-hooks';
import { Popup, Message } from 'semantic-ui-react';
import formatDuration from '../../helpers/duration';
import styled from 'styled-components';
import PassFailIcon from '../../components/PassFailIcon';
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

const GET_SPECS = gql`
	query GetSpecs($spec_id: String, $page_size: Int, $page: Int, $sorted: [Sorted], $filtered: [Filtered]) {
		specResults(spec_id: $spec_id, page_size: $page_size, page: $page, sorted: $sorted, filtered: $filtered) {
			count,
			data {
				spec_id,
				suite_title,
				passed,
				failed,
				retries,
				duration,
				run_date,
				issue_key,
				error_message,
				queries,
			}
		}
	}
`;

function SpecHistoryTable({ spec }) {
	const default_page_size = 15;
	const [ table_state, setTableState ] = useState({
		page     : 0,
		sorted   : [{ id : `id`, desc : true }],
		filtered : [],
	});

	const { data, loading } = useQuery(GET_SPECS, {
		variables : {
			spec_id   : spec.spec_id,
			page_size : default_page_size,
			page      : table_state.page,
			sorted    : table_state.sorted,
			filtered  : table_state.filtered,
		},
		suspend : false,
	});

	const columns = [
		{
			Header   : `Run Date`,
			accessor : `run_date`,
			Cell     : props => moment(props.value).format(`MM/DD/YYYY HH:mm:ss`)
		},
		{
			Header  : `Issue Key`,
			accessor : `issue_key`,
		},
		{
			Header   : `Duration`,
			accessor : `duration`,
			Cell     : props => <RightCell>{props.value ? formatDuration(Number(props.value) * .001) : ``}</RightCell>
		},
		{
			Header   : `Retries`,
			accessor : `retries`,
			Cell     : props => <RightCell>{props.value}</RightCell>
		},
		{
			Header   : `Queries`,
			accessor : `queries`,
			Cell     : props => <RightCell>{props.value}</RightCell>
		},
		{
			Header   : `Result`,
			accessor : `status`,
			Cell     : props => {
				const { passed, failed, error_message } = props.original;
				const icon = PassFailIcon({ passed, failed })

				if(failed) {
					return <Popup trigger={<CenterCell>{icon}</CenterCell>} content={<Message negative>{error_message}</Message>} />
				}

				return <CenterCell>{icon}</CenterCell>
			}
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
					loading={loading}
					columns={columns}
					data={data.specResults.data}
					pages={Math.ceil(data.specResults.count / default_page_size)}
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
					defaultPageSize={default_page_size}
					className="-striped"
					showPageSizeOptions={false}
				/>
			)}
		</>
	);
}

export default SpecHistoryTable;
