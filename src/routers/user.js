const express = require('express');
const multer = require ('multer');
const sharp = require ('sharp');
const User = require ('../models/user');
const auth = require ('../middleware/auth');
//const { sendWelcomeEmail, sendCancelationEmail } = require ('../emails/account');

const router = new express.Router();

// sign in
router.post ("/users", async (req, res) => {
	const me = new User (req.body);

	try {
		await me.save();
		//sendWelcomeEmail (user.email, user.name);
		const token = await me.generateAuthToken();
		res.status(201).send ( { me, token } );
	} catch (e) {
		res.status(400).send (e);
	}
});

// Generate token when user logs in.
router.post ('/users/login', async (req, res) => {
	try {
		const user = await User.findByCredentials (req.body.email, req.body.password);
		const token = await user.generateAuthToken();
		
		// Manual method to filter out unwanted fields from user data.
		//res.send ( { user: user.getPublicProfile(), token } );
		// Second method is to override toJSON method.
		res.send ( { user, token } );
	} catch (e) {
		res.status(400).send();
	}
} );

// logout the user.
router.post ('/users/logout', auth, async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter( (token) => {
			return token.token !== req.token;
		} );
		
		await req.user.save();
		res.send();
	} catch (e) {
		res.status(500).send();
	}
});

// log out of all sessions for a user.
router.post ('/users/logoutAll', auth, async (req, res) => {
	try {
		req.user.tokens = [];
		await req.user.save();
		res.send();
	} catch (e) {
		res.status(500).send();
	}
} );

// Read users.

router.get ('/users', auth, async (req, res) => {
	try {
		const users = await User.find({});
		res.send(users);
	} catch (e) {
		res.status(500).send();
	}
});

router.get ('/users/me', auth, async (req, res) => {
	res.send (req.user);
} );

// Read user by ID.

router.get ('/users/:id', async (req, res) => {
	const _id = req.params.id;
	
	try {
		const user = await User.findById(_id);
		
		if (!user) {
			return res.status(404).send();
		}
		
		res.send (user);
	} catch (e) {
		res.status(500).send();
	}
})

// Update user.
/*
router.patch ( '/users/:id', async (req, res) => {
	const updates = Object.keys (req.body);
	const allowedUpdates = [ 'name', 'email', 'password', 'age' ];
	const isValidOp = updates.every( (update) => {
		return allowedUpdates.includes(update);
	} );
	
	if (!isValidOp) {
		return res.status(400).send({error: 'Invalid updates.'});
	}

	try {
		//const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true});
		
		const user = await User.findById (req.params.id);
		updates.forEach ( (update) => {
			user[update] = req.body[update];
		} );
		await user.save();
		
		if (!user) {
			return res.status(404).send();
		}
		
		res.send (user);
	} catch (e) {
		res.status(400).send();
	}
});
*/

// Update me.
router.patch ('/users/me', auth, async (req, res) => {
	console.log ("received request");
	const updates = Object.keys (req.body);
	const allowedUpdates = [ 'name', 'email', 'password', 'age' ];
	const isValidOp = updates.every ( (update) => {
		return allowedUpdates.includes (update);
	} );
	
	if (!isValidOp) {
		return res.status(400).send ( { error: 'Invalid update.'} );
	}
	
	try {
		const user = req.user;
		updates.forEach ( (update) => {
			user[update] = req.body[update];
		} );
		
		await user.save();
		res.send (user);
	} catch (e) {
		res.status(400).send();
	}
});

// Delete user.
/*
router.delete ( '/users/:id', async (req, res) => {
	try {
		const user = await User.findByIdAndDelete (req.params.id);
		
		if (!user) {
			return res.status(404).send();
		}
		
		res.send (user);
	} catch (e) {
		res.status(500).send();
	}
} );
*/

// Delete me.

router.delete ( '/users/me', auth, async (req, res) => {
	console.log (req);
	try {
		const user = await User.findByIdAndDelete (req.user._id);
		
		// Alternate method to delete user:
		// await req.user.remove();
		
		// since we fetched it just now, not need for re-verification.
		//if (!user) {
		//	return res.status(404).send();
		//}
		
		//sendCancelationEmail (user.email, user.name);
		
		res.send (user);
	} catch (e) {
		res.status(500).send();
	}
} );

const upload = multer({
	//dest: 'avatars',
	limits: {
		fileSize: 1000000
	},
	fileFilter (req, file, cb) {
		if (!file.originalname.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/)) {
			return cb(new Error ('Please upload a JPG file.'));
		}
		
		cb (undefined, true);
	}
});

router.post ('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
	//req.user.avatar = req.file.buffer;
	
	// modify image using sharp.
	const buffer = await sharp (req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
	req.user.avatar = buffer;
	await req.user.save();
	res.send();
}, (error, req, res, next) => {
	res.status(400).send({ error: error.message });
});

router.delete ('/users/me/avatar', auth, async (req, res) => {
	req.user.avatar = undefined;
	await req.user.save();
	res.send();
}, (error, req, res, next) => {
	req.status(400).send ({ error: 'Could not delete avatar.' });
});

router.get ('/users/:id/avatar', async (req, res) => {
	try {
		const user = await User.findById (req.params.id);
		if (!user || !user.avatar) {
			throw new Error();
		}
		
		res.set ('Content-Type', 'image/png');
		res.send (user.avatar);
	} catch (e) {
		res.status(404).send();
	}
});

module.exports = router;
