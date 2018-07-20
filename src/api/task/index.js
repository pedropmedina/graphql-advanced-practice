module.exports = {
	typeDefs: require('../../utils/gqlLoader')('task/task.graphql'),
	resolvers: require('./task.resolvers'),
	model: require('./task.model'),
};
