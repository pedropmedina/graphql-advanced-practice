const _ = require('lodash');
const DataLoader = require('dataloader');

const Project = require('./project/project.model');

const { reposForOrg } = require('./github');

const createProjectLoader = () => {
	return new DataLoader(projectIds => {
		return Project.find({ _id: { $in: projectIds } })
			.exec()
			.then(projects => {
				console.log('projects loader batch: ', projectIds.length);
				/**
				 * THIS:
				 * [{_id: 1, name: 'pedro'}, {_id: 2, name: 'bianca'}]
				 * BECOMES:
				 * {
				 * 	1: {_id: 1, name: 'pedro'},
				 * 	2: {_id: 2, name: 'bianca'}
				 * }
				 */
				const projectsById = _.keyBy(projects, '_id');
				return projectIds.map(projectId => projectsById[projectId]);
			});
	});
};

const createTaskLoader = () => {
	// create task loader
};

const createGitHubLoader = () => {
	return new DataLoader(repoNames => {
		return reposForOrg().then(repos => {
			const reposByName = _.keyBy(repos, 'name');
			return repoNames.map(repoName => reposByName[repoName]);
		});
	});
};

module.exports = () => {
	return {
		project: createProjectLoader(),
		task: createTaskLoader(),
		repo: createGitHubLoader(),
	};
};
