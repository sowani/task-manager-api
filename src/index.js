// Start the app with "npm run dev" command.

const express = require ('express');
require ('./db/mongoose');
//const User = require ('./models/user');
//const Task = require ('./models/task');
const userRouter = require ('./routers/user');
const taskRouter = require ('./routers/task');

const app = express();
//const port = process.env.PORT || 3000;
const port = process.env.PORT;

// Block only GET route.
//app.user ((req, res, next) => {
//	if (req.method === 'GET') {
//		res.send ('GET requests are disabled.');
//	} else {
//		next();
//	}
//});

// Generic maintainance mode.
//app.use ( (req, res, next) => {
//	res.status(503).send('Site is under maintainance.');
//} );

app.use (express.json());
app.use (userRouter);
app.use (taskRouter);

app.listen (port, () => {
	console.log ('Server is up on port '+ port);
});
