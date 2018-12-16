const experss = require('express');
require('./services/passport');

const app = experss();

require('./routes/authRoutes')(app);

//Dynamic Port Binding
const PORT = process.env.PORT || 5000;
console.log(`Listening on : ${PORT}`);
app.listen(PORT);
