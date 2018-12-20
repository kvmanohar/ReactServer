const keys = require('./config/keys');
const experss = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

require('./models/User');
require('./services/passport');

//Connect to mongoDB
mongoose.connect(keys.mongoUri);

//Create an Express app and pass it to routes.
const app = experss();
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);
app.use(passport.initialize());
app.use(passport.session());
require('./routes/authRoutes')(app);

//Dynamic Port Binding
const PORT = process.env.PORT || 5000;
console.log(`Listening on : ${PORT}`);
app.listen(PORT);
