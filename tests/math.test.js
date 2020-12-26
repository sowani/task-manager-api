//
// Goal: Test temperature conversion functions
//
// 1. Export both functions and load them into test suite
// 2. Create "Should convert 32 F to 0 C"
// 3. Create "Should convert 0 C to 32 F"
// 4. Run the Jest to test your work!

const { fahrenheitToCelsius, celsiusToFahrenheit } = require ('../src/math');

test ('Should convert 32 F to 0 C', () => {
	const temp = fahrenheitToCelsius(32);
	expect(temp).toBe(0);
})

test ('Should convert 0 C to 32 F', () => {
	const temp = celsiusToFahrenheit(0);
	expect(temp).toBe(32);
})

//test('Hello world!', () => {
//	
//})

//test ('Failing test case', () => {
//	throw new Error ('Failure!');
//})

// handling async functions.

test ('Async test', (done) => {
	setTimeout(() => {
		expect(1).toBe(2);  // something that is always to fail.
		done();
	}, 2000);  // wait for 2 sec.
})
