var express = require('express');
var app = express();
var server = require('http').createServer(app);

var shortener = require('./lib/routing/shorten')();

app.set('port', process.env.PORT || 3435);
app.use(express.json());
app.use('/static', express.static(__dirname + '/public'));

app.post('/', shortener.shorten);
app.get('/:key', shortener.redirect);

server.listen(app.get('port'));
console.log('listening on port ' + app.get('port'));
