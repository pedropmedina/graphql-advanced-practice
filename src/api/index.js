const merge = require('lodash/merge');

const loaders = require('./loaders');

const project = require('./project');
const task = require('./task');

module.exports = {
	typeDefs: [project.typeDefs, task.typeDefs].join(' '),
	resolvers: merge({}, project.resolvers, task.resolvers),
	context: {
		models: {
			project: project.model,
			task: task.model,
		},
		loaders: loaders(),
	},
};

/*
const merge = require('lodash/merge');

const obj1 = {
	person1: {
		name: 'Pedro',
	},
	person2: {
		name: 'Bianca',
		age: 32,
	},
};

const obj2 = {
	person1: {
		age: 29,
		gender: 'male',
	},
	person2: {
		gender: 'female',
	},
};

const obj3 = merge({}, obj1, obj2);

console.log(obj3);

*/
