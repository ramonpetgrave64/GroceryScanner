const express = require('express');
const models = require('../models');
const passport = require('../middlewares/authentication');
const keys = require('../config/keys');
const jwt = require('jsonwebtoken');

const router = express.Router();




router.post('/', (req, res) => {
	req.checkBody('firstName', 'firstName is required').notEmpty();
  	req.checkBody('email', 'Invalid email').isEmail();
  	req.checkBody('lastName', 'lastName is required').notEmpty();
  	req.checkBody('username', 'username is required').notEmpty();
  	req.checkBody('email', 'email is required').notEmpty();
  	req.checkBody('password', 'password is required').notEmpty();
	
	let errors = req.validationErrors();
	const {firstName, lastName, username, email, password} = req.body;

	if(errors)res.status(400).send(errors);
	else{
		models.Users.create({
			firstName: firstName,
			lastName: lastName,
			username: username,
			email: email,
			password_hash: password
		})
		.then(user => {
			req.login(user, {session: false}, (err) => {
	    		if(err)res.status(400).send(err); 
		    	let payload = {username: user.username};
		    	const token = jwt.sign(payload, keys.jwtSecret);
		    	res.status(200).send({auth: true, token: token});
	    	})
		})
		.catch(err => {
			res.status(500).send('There was a problem registering the user.' + err);
		});
	}
});



module.exports = router;