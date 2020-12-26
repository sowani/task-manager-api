const request = require ('supertest');
const app = require ('../src/app');
const User = require ('../src/models/user');

const userOne = {
	name: "testUser",
	email: "testUser@example.com",
	password: "somePass123"
};

beforeEach(async () => {
	await User.deleteMany();
	await new User(userOne).save();
} );

afterEach(() => {
	console.log ("afterEach");
});

test('signup a new user', async () => {
	await request(app).post('/users').send({
		name: 'Atul',
		email: 'atul@example.com',
		password: 'myPass123!'
	}).expect(201)
})

test ('log in existing user', async () => {
	await request(app).post('/users/login').send({
		email: userOne.email
		password: userOne.password
	}).expect (200);
})

test ('should not log in nonexistent user', aync () => {
	await request(app).post('/users/login').send({
		email: oneUser.email,
		password: 'invalidpassword'
	}).expect(400);
})
