const sgMail = require ('@sendgrid/mail');
const sendgridAPIKey = process.env.SENDGRID_API_KEY;

sgMail.setApiKey (sendgridAPIKey);

const sendWelcomeEmail = (email, name) => {
	sgMail.send ({
		to: email,
		from: 'sowani@gmail.com',
		subject: 'Welcome mail.',
		text: `Welcome, ${name}!`
	});
}

const sendCancelationEmail = (email, name) => {
	sgMail.send ({
		to: email,
		from: 'sowani@gmail.com',
		subject: 'Cancellation mail.'
		text: `Sorry to see you go, ${name}.`
	});
}

module.exports = {
	sendWelcomeEmail,
	sendCancelationEmail
}
