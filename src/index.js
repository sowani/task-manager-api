// Moved original content to app.js for superTest functionality.

const app = require ('./app');

app.listen (port, () => {
	console.log ('Server is up on port '+ port);
});
