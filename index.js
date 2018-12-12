const experss = require('express');
const app = experss();

app.get('/', (req, res) => {
	res.send({ hi: 'there' });
});

//Dynamic Port Binding
const PORT = process.env.PORT || 5000;
console.log(`Listening on : ${PORT}`);
app.listen(PORT);
