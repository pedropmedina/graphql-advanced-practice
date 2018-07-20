module.exports = {
	typeDefs: require('../../utils/gqlLoader')('search/search.graphql'),
	resolvers: require('./search.resolvers'),
};
