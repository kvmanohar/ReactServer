const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

//Load mongoose and get user collection
const mongoose = require('mongoose');
const User = mongoose.model('users');

//Getting the passport ready for adding id to browser cookies
passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => {
		done(null, user);
	});
});

//Inform PassportJS that we are going to using Google Strategy and pass client id and secret.
passport.use(
	new googleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback',
			proxy: true
		},
		async (accessToken, refreshToken, profile, done) => {
			const existingUser = await User.findOne({ googleId: profile.id });
			if (existingUser) {
				return done(null, existingUser);
			}
			const user = await new User({ googleId: profile.id }).save();
			done(null, user);
		}
	)
);
