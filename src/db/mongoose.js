const mongoose = require ('mongoose');

const connectionURL = process.env.MONGODB_URL;

mongoose.connect(connectionURL, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	// Added after getting Deprecation warning.
	useUnifiedTopology: true
} );

// Users model moved to its own JS file.

/*
// User creation is moved to index.js in POST function.
const me = new User({
	name: "Atul",
	email: "sowani@gmail.com",
	age: 47,
	password: "mypass123"
});

me.save().then(() => {
	console.log (me);
}).catch ((error) => {
	console.log ("Error: ", error);
})
*/

// Moved tasks model to its own JS file.

/*
// Create instance of it.
const task = new Task ({
	description: "Task 1",
	completed: false
});

// Save the instance.
task.save().then (() => {
	console.log (task);
}).catch ((error) => {
	console.log ("Error: ", error);
});
*/
