const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = {
	name: {
		type: String,
		required: true,
		unique: true,
	},
	description: {
		type: String,
		trim: true,
	},
};

const projectSchema = new Schema(schema, { timestamps: true });

projectSchema.index({ name: 'text' });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
