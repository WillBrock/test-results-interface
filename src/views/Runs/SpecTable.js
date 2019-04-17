import React, { useState } from 'react';
import gql from 'graphql-tag';
import ReactTable from 'react-table';
import { useQuery } from 'react-apollo-hooks';
import { Icon, Button, Popup, Message } from 'semantic-ui-react';
import SpecDetails from './SpecDetails';
import formatDuration from '../../helpers/duration';
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

const default_page_size = 13;

const GET_SPECS = gql`
	query GetSpecsFromRun($test_run_id: Int, $page_size: Int, $page: Int, $sorted: [Sorted], $filtered: [Filtered]) {
		testRunResults(test_run_id: $test_run_id, page_size: $page_size, page: $page, sorted: $sorted, filtered: $filtered) {
			count,
			data {
				id,
				test_run_id,
				spec_id,
				suite_title,
				retries,
				passed,
				failed,
				skipped,
				duration,
				error_message,
				stacktrace,
				queries,
			}
		}
	}
`;

function SpecTable({ match, run }) {
	const columns = [
		{
			Header   : `Test Case #`,
			accessor : `spec_id`,
		},
		{
			Header   : `Title`,
			accessor : `suite_title`,
			minWidth : 400,
			Cell     : props => props.value ? props.value.replace(/FOCUS-\d.*- /, ``) : ``,
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
				const {
					passed,
					failed,
					error_message,
					stacktrace
				} = props.original;

				const icon = getIcon({ passed, failed });

				if(failed) {
					return <Popup trigger={<CenterCell>{icon}</CenterCell>} content={<><Message negative>{error_message}</Message><Message negative>{stacktrace}</Message></>} />
				}

				return <CenterCell>{icon}</CenterCell>
			}
		},
		{
			Header     : ``,
			accessor   : `id`,
			filterable : false,
			sortable   : false,
			Cell       : props => <CenterCell><Button onClick={() => handleDetailClick(props.value)} primary size="small">Details</Button></CenterCell>
		}
	];

	const [ showModal, setShowModal ]      = useState(false);
	const [ current_spec, setCurrentSpec ] = useState({});
	const [ table_state, setTableState ]   = useState({
		page_size : default_page_size,
		page      : 0,
		sorted    : [],
		filtered  : [],
	});

	const { data, loading } = useQuery(GET_SPECS, {
		variables : {
			test_run_id : run.id,
			page_size   : table_state.page_size || default_page_size,
			page        : table_state.page || 0,
			sorted      : table_state.sorted.length ? table_state.sorted : [{ id : `failed`, desc : true }, { id : `passed`, desc : true }],
			filtered    : table_state.filtered.length ? table_state.filtered : [],
		},
		suspend : false,
	});

	function getIcon({ passed, failed }) {
		let name  = null;
		let color = null;

		if(passed) {
			name  = `check`;
			color = `green`;
		}
		else if(failed) {
			name  = `cancel`;
			color = `red`;
		}
		else {
			name  = `minus`;
			color = `yellow`;
		}

		return <Icon name={name} color={color} />;
	}

	function fetchData(state) {
		setTableState({
			page_size : state.pageSize || default_page_size,
			page      : state.page || 0,
			sorted    : state.sorted.length ? state.sorted : [{ id : `failed`, desc : true }, { id : `passed`, desc : true }],
			filtered  : state.filtered.length ? state.filtered : [],
		});
	}

	function handleDetailClick(result_id) {
		setShowModal(true);

		const spec = data.testRunResults.data.find(result => result.id === result_id);
		setCurrentSpec(spec);
	}

	function handleClose() {
		setShowModal(false);
	}

	return (
		<>
			<SpecDetails
				open={showModal}
				handleClose={handleClose}
				spec={current_spec}
				getIcon={getIcon}
			/>

			{!loading ? (
				<ReactTable
					manual
					filterable
					loading={loading}
					columns={columns}
					data={data.testRunResults.data}
					pages={Math.ceil(data.testRunResults.count / default_page_size)}
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
	);
}

export default SpecTable;
