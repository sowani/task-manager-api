// CRUD: create, read, update, delete

/*
const mongodb = require ('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;
*/

// Above three lines re-written using de-structuring.
const { MongoClient, ObjectID } = require ('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

// Generate custom ID.
const id = new ObjectID();
console.log (id);

MongoClient.connect (connectionURL, { useNewUrlParser: true, useUnifiedTopology: true}, (error, client) => {
	if (error) {
		return console.log ("Unable to connect to database.")
	}

	//console.log ("Connected to database.");

	// Create a database.
	const db = client.db (databaseName);

	// Create a collection (table) and insert a document (row).
	/*
	db.collection ('users').insertOne ({
		name: "Atul",
		age: 47
	}, (error, result) => {
		if (error) {
			return console.log ("Unable to insert user record");
		}

		console.log (result.ops);
	});

	// Insert multiple documents,
	db.collection ('users').insertMany ( [
		{
			name: "Naresh",
			age: 45
		}, {
			name: "Suresh",
			age: 49
		}
	], (error, result) => {
		if (error) {
			return console.log ("Unable to insert documents.");
		}

		console.log (result.ops);
	});

	// Insert 3 tasks into a new tasks collection
	db.collection ('tasks').insertMany ( [
		{
			description: "Task 1",
			completed: true
		}, {
			description: "Task 2",
			completed: false
		}, {
			description: "Task 3",
			completed: true
		}
	], (error, result) => {
		if (error) {
			return console.log ('Unable to insert new tasks.');
		}

		console.log (result.ops);
	} ); */

	// READ

	/*
	// Search using matching criteria.
	db.collection ('users').findOne ( { name: "Suresh" }, (error, user) => {
		if (error) {
			return console.log ("User not found.")
		}

		console.log (user);
	} );

	// find using ID (Naresh).
	db.collection ('users').findOne ( { _id: new ObjectID("5fcb503b1375930e825795dc")}, (error, user) => {
		if (error) {
			return console.log ("User with specificnot found.");
		}

		console.log (user);
	} );

	db.collection ('users').find ( { age: 47 } ).toArray ( (error, users) => {
		if (error) {
			return console.log ("Did not find users matching given criteria.");
		}

		console.log (users);
	} );
	
	// User find and findOne with "tasks".
	
	// fetch last task by its ID.
	db.collection ('tasks').findOne ( { _id: new ObjectID ("5fcb51f60833020f50127c4c") }, (error, task) => {
		if (error) {
			return console.log ("Matching task not found.")
		}

		console.log (task);
	} );
	
	// fetch all tasks that are not completed.
	db.collection ('tasks').find ( { completed: false } ).toArray( (error, tasks) => {
		if (error) {
			return console.log ("No tasks found matching given criteria.")
		}
		
		console.log ("Last task:");
		console.log (tasks);
	} );

	db.collection ('tasks').find ( { completed: false } ).count( (error, count) => {
		if (error) {
			return console.log ("No tasks found matching given criteria.")
		}
		
		console.log (count);
	} ); */
	
	// Update

	/*
	const updatePromise = db.collection ('users').updateOne ( {
		_id: new ObjectID ("5fcb503b1375930e825795db");
	}, {
		$set: {
			name: "Sanket"
		}
	} );
	
	updatePromise.then ( (result) => {
		console.log (result);
	}).catch ( (error) => {
		console.log (error);
	});

	db.collection ('tasks').updateMany ( {
		completed: false
	}, {
		$set: {
			completed: true
		}
	} ).then ( (result) => {
		console.log (result);
		console.log (result.modifiedCount);
	} ).catch ( (error) => {
		console.log (error);
	} ); */

	// Delete
	/*
	db.collection ('users').deleteMany ( {
		age: 47
	} ).then ( (result) => {
		console.log (result);
	} ).catch ( (error) => {
		console.log (error);
	} ); */
	
	db.collection ('tasks').deleteOne ( {
		description: "Task 1"
	} ).then ( (result) => {
		console.log (result);
	} ).catch ( (error) => {
		console.log (error);
	} );
});
