const express = require('express');
const app = express();
const port = 3000;
const mustache = require('mustache-express');
const bodyParser = require('body-parser')
const libra = require('libra-core')
const utils = require('./utils.js')

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
app.get('/query', (req, res) => {
	var value = utils.getAccountByAddress(req.query.search, function(acc) {
		res.render('query', acc);
	})

})
app.get('/news', (req, res) => {
	res.render('news')
});
app.get('/restapi', (req, res) => {
	res.render('api')
});
app.get('/test', (req, res) => {

});

app.get('/api/getaddress', (req,res) => {
    
})

app.get('/api/getaddresstransactions', (req,res) => {

})


app.get('/api/gettransaction', (req,res) => {

})



app.listen(port, () => console.log(`Listening on port ${port}!`))
