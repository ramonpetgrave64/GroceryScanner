const express = require('express');
const passport = require('../middlewares/authentication');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const router = express.Router();
/*router.get('/', 
	(req, res) => {
  		res.render('login', { error: req.flash('error')});
});*/

router.post('/', (req, res) => {
   passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true,
      successFlash: true,
      session: false
    }, (err, user, info) =>{
    	if(err || !user) return res.status(400).json({message: 'Wrong username or password', user: user});
    	req.login(user, {session: false}, (err) => {
    		if(err)res.send(err); 
	    	let payload = {username: user.username};
	    	const token = jwt.sign(payload, keys.jwtSecret);
	    	res.status(200).send({auth: true, token: token});
	    });
    });
});

/*router.post('/jwt', passport.authenticate('jwt', {session: false}));

router.get(
		'/google', 
		passport.authenticate('google', {
			scope: ['profile', 'email']
		})
	);

router.get('/google/callback',passport.authenticate('google', {
	failureRedirect: '/login',
	failureFlash: true,
	successFlash: true,
	}), (req, res) => {
	res.redirect('/');
	
});*/

module.exports = router;