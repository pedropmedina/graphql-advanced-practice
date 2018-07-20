const { reposForOrg } = require('../github');

const task = (_, args, ctx) => {
	const { id: _id, name, project } = args.input;

	if (!_id && !name) {
		throw new Error('Invalid input');
	}

	return ctx.loaders.task.load(_id);
};

const tasks = async (_, args, ctx) => {
	return await ctx.models.task.find(args.input);
};

const newTask = (_, args, ctx) => {
	return ctx.models.task.create(args.input);
};

const removeTask = async (_, args, ctx) => {
	const task = await ctx.models.task.findByIdAndRemove(args.id).exec();

	if (!task) {
		throw new Error('No resource');
	}

	return task;
};

const changeStatus = (_, args, ctx) => {
	return ctx.models.task
		.findByIdAndUpdate(
			args.input.id,
			{ status: args.input.status },
			{ new: true },
		)
		.exec();
};

const taskResolvers = {
	id(task) {
		return task._id;
	},
	async project(task, args, ctx) {
		return await ctx.loaders.project.load(task.project);
		// return ctx.models.project.findById(task.project).exec();
	},
	parentTask(task, args, ctx) {
		return ctx.models.task.findById(task.parentTask).exec();
	},
};

module.exports = {
	Query: {
		task,
		tasks,
	},
	Mutation: {
		newTask,
		removeTask,
		changeStatus,
	},
	Task: {
		__resolveType(task) {
			switch (task.type) {
				case 'dev':
					return 'DevTask';
				case 'design':
					return 'DesignTask';
			}
		},
	},
	DevTask: {
		...taskResolvers,
		async repo(task, args, ctx) {
			const name = task.repoUrl.split('/').pop();
			const repo = await ctx.loaders.repo.load(name);
			// const repos = await reposForOrg();
			// const repo = repos.find(r => r.name === name);
			return {
				name: repo.name,
				description: repo.description,
				url: repo.html_url,
				issueCount: repo.open_issues,
			};
		},
	},
	DesignTask: {
		...taskResolvers,
	},
};
