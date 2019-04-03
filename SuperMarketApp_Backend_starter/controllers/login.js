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
   passport.authenticate('local', {session: false}, (err, user) =>{
	if(err) return res.status(400).json({message: 'Incorrect username or password', user: user});
	if(!user) return res.status(400).json({message: 'Incorrect username or password', user: user});
    let payload = {id: user.username};
    const token = jwt.sign(payload, keys.jwtSecret);
    res.status(200).send({auth: true, token: token});
    })(req, res);
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