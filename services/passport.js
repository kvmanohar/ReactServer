const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

//Load mongoose and get user collection
const mongoose = require('mongoose');
const User = mongoose.model('users');

//Inform PassportJS that we are going to using Google Strategy and pass client id and secret.
passport.use(
	new googleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback'
		},
		(accessToken, refreshToken, profile, done) => {
			new User({
				googleId: profile.id
			}).save();
			console.log('accessToken:', accessToken);
			console.log('refresh token:', refreshToken);
			console.log('profile:', profile);
			console.log('done:', done);
		}
	)
);
