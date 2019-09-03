const express = require('express');
const app = express();
const port = 3000;
const mustache = require('mustache-express');
const bodyParser = require('body-parser')
const libra = require('libra-core')

app.engine('html', mustache());
app.set('etag', false)
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static('public'));
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.get('/', (req, res) => {
	res.render('index')
});
app.post('/query', (req, res) => {
	console.log(req.body.search)

	var object = {
		"accountPublicAddress": "accountPublicAddress",
		"accountBalance": "accountBalance",
		"sentEventsCount": "sentEventsCount",
		"receivedEventsCount": "receivedEventsCount"
	}

	res.render('query', object);
})
app.get('/news', (req, res) => {
	res.render('news')
});
app.get('/api', (req, res) => {
	res.render('api')
});
app.get('/test', (req, res) => {
	
	async function asyncFunc() {
		const LibraClient = libra.LibraClient;
		const client = new LibraClient({ network: libra.LibraNetwork.Testnet });
		const accountAddress = '323654352ef60d980568e55658840bfb954e127a61232d5fc4cd3ed77a175565';
		const accountState = await client.getAccountState(accountAddress);
		console.log(accountState.balance.toNumber())
	}

	asyncFunc()

});




app.listen(port, () => console.log(`Listening on port ${port}!`))