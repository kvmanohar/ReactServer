const keys = require('./config/keys');
const experss = require('express');
const mongoose = require('mongoose');
require('./models/User');
require('./services/passport');

//Connect to mongoDB
mongoose.connect(keys.mongoUri);

//Create an Express app and pass it to routes.
const app = experss();
require('./routes/authRoutes')(app);

//Dynamic Port Binding
const PORT = process.env.PORT || 5000;
console.log(`Listening on : ${PORT}`);
app.listen(PORT);
