// Start the app with "npm run dev" command.

const express = require ('express');
require ('./db/mongoose');
const User = require ('./models/user');
const Task = require ('./models/task');

const app = express();
const port = process.env.PORT || 3000;

app.use (express.json());

app.post ("/users", (req, res) => {
	//console.log (req.body);
	//res.send ("testing...");
	
	const me = new User (req.body);
	
	me.save().then(() => {
		res.status(201).send (me);
	}).catch ((e) => {
		res.status(400).send (e);
	});
});

// Read users.

app.get ('/users', (req, res) => {
	User.find({}).then( (users) => {
		res.send(users);
	} ).catch ( (e) => {
		res.status(500).send();
	} );
});

// Read user by ID.

app.get ('/users/:id', (req, res) => {
	const _id = req.params.id;
	
	User.findById(_id).then((user) => {
		if (!user) {
			return res.status(404).send();
		}
		
		res.send (user);
	}).catch( (e) => {
		res.status(500).send();
	} );
})

app.post ("/tasks", (req, res) => {
	const task = new Task (req.body);
	
	task.save().then(() => {
		res.status(201).send (task);
	}).catch((e) => {
		e.status(400).send(e);
	});
});

// Read tasks

app.get ('/tasks', (req, res) => {
	Task.find({}).then( (tasks) => {
		res.send (tasks);
	} ).catch ( (e) => {
		res.status(500).send();
	} );
});

// Read task by ID.

app.get ('/tasks/:id', (req, res) => {
	const _id = req.params.id;
	
	Task.findById(_id).then((task) => {
		if (!task) {
			return res.status(404).send();
		}
		
		res.send (task);
	}).catch ( (e) => {
		res.status(500).send();
	} );
});

app.listen (port, () => {
	console.log ('Server is up on port '+ port);
});