import React, { useState } from 'react';
import moment from 'moment';
import gql from 'graphql-tag';
import ReactTable from 'react-table';
import { useQuery } from 'react-apollo-hooks';
import { Popup, Button } from 'semantic-ui-react';
import formatDuration from '../../helpers/duration';
import styled from 'styled-components';
import PassFailIcon from '../../components/PassFailIcon';
import Error from '../../components/ErrorPopup';
import SpecErrors from './SpecErrors';
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
				id,
				spec_id,
				suite_title,
				passed,
				failed,
				retries,
				duration,
				start,
				issue_key,
				queries,
				errors {
					id,
					error_message,
					stacktrace,
				}
			}
		}
	}
`;

function SpecHistoryTable({ spec }) {
	const default_page_size   = 15;

	const [ showModal, setShowModal ]      = useState(false);
	const [ current_spec, setCurrentSpec ] = useState({});
	const [ table_state, setTableState ]   = useState({
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
			accessor : `start`,
			Cell     : props => moment(props.value).format(`MM/DD/YYYY HH:mm:ss`)
		},
		{
			Header   : `Issue Key`,
			accessor : `issue_key`,
		},
		{
			Header   : `User`,
			accessor : `user`,
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
				const { passed, failed, errors } = props.original;
				const icon = PassFailIcon({ passed, failed })

				if(failed) {
					return <Popup trigger={<CenterCell>{icon}</CenterCell>} content={<Error errors={errors} />} />
				}

				return <CenterCell>{icon}</CenterCell>
			}
		},
		{
			Header     : ``,
			accessor   : `id`,
			filterable : false,
			sortable   : false,
			Cell       : props => {
				const { errors } = props.original;

				if(!errors.length) {
					return <CenterCell></CenterCell>;
				}

				return <CenterCell><Button onClick={() => handleErrorClick(props.value)} primary size="small">Errors</Button></CenterCell>
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

	function handleErrorClick(result_id) {
		setShowModal(true);

		const spec = data.specResults.data.find(result => result.id === result_id);
		setCurrentSpec(spec);
	}

	function handleClose() {
		setShowModal(false);
	}

	return (
		<>
			<SpecErrors
				open={showModal}
				handleClose={handleClose}
				spec={current_spec}
			/>

			{!loading ? (
				<ReactTable
					manual
					filterable
					loading={loading}
					columns={columns}
					data={data.specResults.data}
					pages="10000"
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
