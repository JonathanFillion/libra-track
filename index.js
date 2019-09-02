const express = require('express');
const app = express();
const port = 3000;
const mustache = require('mustache-express');

app.engine('html', mustache());
app.set('etag', false)
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static('public'));


app.get('/', (req, res) => res.render('index'));


app.listen(port, () => console.log(`Example app listening on port ${port}!`))