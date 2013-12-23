var express = require('express');
var app = express();
var server = require('http').createServer(app);

var shorten = require('./lib/routing/shorten');

app.set('port', process.env.PORT || 3435);
app.use(express.bodyParser());
app.use('/static', express.static(__dirname + '/public'));

app.get('/', function(request, response){
    response.send(200, "Hello World");
});
app.post('/', shorten);

server.listen(app.get('port'));
console.log('listening on port ' + app.get('port'));
