const express = require('express');
const Task = require ('../models/task');
const auth = require ('../middleware/auth');

const router = new express.Router();

// task manager code.

router.post ("/tasks", auth, async (req, res) => {
	//const task = new Task (req.body);
	const task = new Task( {
		// Use new ES6 notation to copy contents of req to this object
		...req.body,
		// now add extra piece of data
		owner: req.user._id
	} );
	
	try {
		await task.save();
		res.status(201).send (task);
	} catch (e) {
		e.status(400).send(e);
	}
});

// Read tasks
// GET /tasks?completed=true
// GET /tasks?limit=10&skip=20 <-- this could be 0 (pg 1), 10 (pg 2), 20 (pg 3)...
// GET /tasks?sortBy=createdAt:asc/desc

router.get ('/tasks', auth, async (req, res) => {
	const match = {};
	const sort = {};
	
	if (req.query.completed) {
		match.completed = req.query.completed === 'true';
	}
	
	if (req.query.sortBy) {
		const parts = req.query.sortBy.split(':');
		sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
	}
	
	try {
		//const tasks = await Task.find({ owner: req.user._id });
		//res.send (tasks);
		// Alternate way is using populate.
		// const tasks = await req.user.populate('tasks').execPopulate();
		// res.send (req.user.tasks);
		
		await req.user.populate({
			path: 'tasks',
			match,
			options: {
				limit: parseInt(req.query.limit),
				skip: parseInt(req.query.skip),
				sort
			}
		}).execPopulate();
		res.send (req.user.tasks);
	} catch (e) {
		res.status(500).send();
	}
});

// Read task by ID.

router.get ('/tasks/:id', auth, async (req, res) => {
	const _id = req.params.id;
	
	try {
		//const task = await Task.findById(_id);
		const task = await Task.findOne ({ _id, owner: req.user._id });
		if (!task) {
			return res.status(404).send({ error: "Tasks not found!"});
		}
		
		res.send (task);
	} catch (e) {
		res.status(500).send();
	}
});

// Update task.

router.patch ( '/tasks/:id', auth, async (req, res) => {
	const updates = Object.keys (req.body);
	const allowedUpdates = [ 'description', 'completed' ];
	const isValidOp = updates.every ( (update) => {
		return allowedUpdates.includes (update);
	} );
	
	if (!isValidOp) {
		return res.status(400).send({error: 'Invalid updates.'});
	}
	
	try {
		//const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
		
		// Modification to user Mongoose middleware.
		//const task = await Task.findById (req.params.id);
		
		const task = await Task.findOne ( { _id: req.params.id, owner: req.user._id } );
		
		// check if task exists.
		if (!task) {
			return res.status(404).send();
		}
		
		// Update task only if it exists.
		updates.forEach ( (update) => {
			task[update] = req.body[update];
		} );
		await task.save();
		
		res.send (task);
	} catch (e) {
		res.status(400).send();
	}
} );

// Delete task.

router.delete ( '/tasks/:id', auth, async (req, res) => {
	try {
		//const task = await Task.findByIdAndDelete (req.params.id);
		const task = await Task.findOneAndDelete ( { _id: req.params.id, owner: req.user._id } );
		
		if (!task) {
			return res.status(404).send();
		}
		
		res.send (task);
	} catch (e) {
		res.status(500).send();
	}
} );

module.exports = router;
