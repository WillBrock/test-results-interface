import ApolloClient from 'apollo-boost';
import config from '../config';

export default new ApolloClient({
	uri : config.graphql_endpoint,
});
