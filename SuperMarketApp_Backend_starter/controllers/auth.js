const express = require('express');
const passport = require('../middlewares/authentication');

const router = express.Router();
router.get('/', 
	(req, res) => {
  		res.render('login', { error: req.flash('error')});
});

router.post('/', (req, res) => {
   passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true,
      successFlash: true,
    })(req, res);
});

router.post('/jwt', passport.authenticate('jwt', {session: false}));

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
	
});

module.exports = router;