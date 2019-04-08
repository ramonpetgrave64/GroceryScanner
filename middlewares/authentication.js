const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy,
	  ExtractJwt = require('passport-jwt').ExtractJwt;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const keys = require('../config/keys');

const User = require('../models').Users;

function passwordMatch(passwordSubmitted, storedPassword){
	return bcrypt.compareSync(passwordSubmitted, storedPassword);
}

//Local Strategy
passport.use(new LocalStrategy({usernameField: 'username',}, (username, password, done) => {
	User.findOne({
		where: { username },
	}).then( user => {
		if(!user) return done(null, false, { message: 'Incorrect username or password.'});
		if(passwordMatch(password, user.password_hash) === false) return done(null, false, { message: 'Incorrect username or password.'});
		return done(null, user, { message: 'Successfully Logged In!'});
	});
}));



//JWT Strategy
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.jwtSecret;

passport.use(new JWTStrategy(opts, (jwt_payload, done) =>{
	User.findOne({
		where: {username: jwt_payload.id}
	}).then( user =>{
		if(!user) return done(null, false, {message: 'User not found!'});
		return done(null, user, { message: 'User found!'});
	});
}));


//Google Strategy
passport.use(
	new GoogleStrategy(
	{
		clientID: keys.googleClientID,
		clientSecret: keys.googleClientSecret,
		callbackURL: '/auth/google/callback'
	}, 
	(accessToken, refreshToken, profile, done) => {
		User.findOrCreate({ googleId: profile.id}, function(err, user){
			return cb(err, user);
		});

	}));



passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => {
		if(!user) return done(null, false);
		return done(null, user);
	});
})

module.exports = passport;