const experss = require('express');
const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = experss();

//Inform PassportJS that we are going to using Google Strategy and pass client id and secret.
passport.use(
	new googleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback'
		},
		(accessToken, refreshToken, profile, done) => {
			console.log('accessToken:', accessToken);
			console.log('refresh token:', refreshToken);
			console.log('profile:', profile);
			console.log('done:', done);
		}
	)
);

//Route Handlers
app.get('/', (req, res) => {
	res.send({ hi: 'there' });
});

app.get(
	'/auth/google',
	passport.authenticate('google', {
		scope: ['profile', 'email']
	})
);

app.get('/auth/google/callback', passport.authenticate('google'));

//Dynamic Port Binding
const PORT = process.env.PORT || 5000;
console.log(`Listening on : ${PORT}`);
app.listen(PORT);
