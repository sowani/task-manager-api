// Moved task model from mongoose.js file.
// Create a model for tasks

const mongoose = require ('mongoose');

const taskSchema = mongoose.Schema({
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	},
	description: {
		type: String,
		trim: true,
		required: true
	},
	completed: {
		type: Boolean,
		default: false
	}
}, {
	timestamps: true
});

taskSchema.pre ('save', async function (next) {
	const task = this;
	next();
});

const Task = mongoose.model ('Task', taskSchema);

module.exports = Task;
