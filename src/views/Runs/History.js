import React from 'react';
import moment from 'moment';
import formatDuration from '../../helpers/duration';
import { Table, Icon, Popup, Message } from 'semantic-ui-react';

function History({ specs, getIcon }) {
	const TableRows = specs.map(spec => (
		<Table.Row key={spec.id}>
			<Table.Cell>{getIcon({ passed : spec.passed, failed : spec.failed })}</Table.Cell>
			<Table.Cell>{moment(spec.start).format(`MM/DD/YYYY HH:mm:ss`)}</Table.Cell>
			<Table.Cell>{spec.duration ? formatDuration(Number(spec.duration) * .001) : ``}</Table.Cell>
			<Table.Cell>{spec.retries}</Table.Cell>
			<Table.Cell>{spec.queries}</Table.Cell>
			<Table.Cell>
				{spec.failed && spec.errors ? (
					<Popup
						basic
						trigger={<Icon name="info circle" color="red"></Icon>}
						content={<><Message negative>{spec.errors[spec.errors.length - 1].error_message}</Message><Message negative>{spec.errors[spec.errors.length - 1].stacktrace}</Message></>}
					/>
				) : (
					``
				)}
			</Table.Cell>
		</Table.Row>
	));

	return (
		<>
			<Table basic="very">
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Result</Table.HeaderCell>
						<Table.HeaderCell>Date</Table.HeaderCell>
						<Table.HeaderCell>Duration</Table.HeaderCell>
						<Table.HeaderCell>Retries</Table.HeaderCell>
						<Table.HeaderCell>Queries</Table.HeaderCell>
						<Table.HeaderCell></Table.HeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{TableRows}
				</Table.Body>
			</Table>
		</>
	);
}

export default History;
