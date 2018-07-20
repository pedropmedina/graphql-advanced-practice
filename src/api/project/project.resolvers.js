const project = async (_, args, ctx, info) => {
	const project = await ctx.loaders.project.load(args.input.id);

	if (!project) {
		throw new Error('Project does not exist');
	}

	return project;
};

const projects = async (_, __, ctx) => {
	return await ctx.models.project.find({}).exec();
};

const newProject = async (_, args, ctx) => {
	return await ctx.models.project.create(args.input);
};

module.exports = {
	Query: {
		project,
		projects,
	},
	Mutation: {
		newProject,
	},
	Project: {
		id(project) {
			return project._id + '';
		},
		tasks(project, args, ctx) {
			return ctx.models.task.find({ project: project._id }).exec();
		},
	},
};
