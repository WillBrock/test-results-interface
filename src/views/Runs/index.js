import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import PageContainer from '../../components/PageContainer';
import RunTable from './RunTable';

function Runs() {
	return (
		<PageContainer>
			<RunTable />
		</PageContainer>
	);
}

export default Runs;
