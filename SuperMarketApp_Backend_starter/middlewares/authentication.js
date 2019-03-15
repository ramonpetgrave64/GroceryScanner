const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const User = require('../models').Users;

function passwordMatch(passwordSubmitted, storedPassword){
	return bcrypt.compareSync(passwordSubmitted, storedPassword);
}

passport.use(new LocalStrategy({usernameField: username,}, (username, password, done) => {
	User.find0ne({
		where: { username },
	}).then( user => {
		if(!user) return done(null, false, { message: 'Incorrect username or password.'});
		if(passwordMatch(password, user.password_hash) === false) return done(null, false, { message: 'Incorrect username or password.'});
		return done(null, user, { message: 'Successfully Logged In!'});
	})
}))


//To implement jwt, google and maybe facebook strategy and remember me options






passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => {
		if(!user) return done(null, false);
		return done(null, user);
	});
})