const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = {
	name: {
		type: String,
		required: true,
	},
	parentTask: {
		type: Schema.Types.ObjectId,
		ref: 'Task',
	},
	dueDate: Date,
	project: {
		type: Schema.Types.ObjectId,
		ref: 'Project',
		required: true,
	},
	type: {
		type: String,
		required: true,
		enum: ['design', 'dev'],
	},
	status: {
		type: String,
		required: true,
		enum: ['OPEN', 'IN_PROGRESS', 'REVIEWING', 'DONE'],
		default: 'OPEN',
	},
	description: String,
	repoUrl: {
		type: String,
		required() {
			return this.type === 'dev';
		},
	},
	assetUrl: {
		type: String,
		required() {
			return this.type === 'design';
		},
	},
};

const taskSchema = new Schema(schema, { timestamps: true });

taskSchema.index({ name: 'text' });
taskSchema.index({ project: 1, name: 1 }, { unique: true });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
