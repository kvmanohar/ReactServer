const experss = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./services/passport');

//Connect to mongoDB
mongoose.connect(keys.mongoUri);

const app = experss();

require('./routes/authRoutes')(app);

//Dynamic Port Binding
const PORT = process.env.PORT || 5000;
console.log(`Listening on : ${PORT}`);
app.listen(PORT);
