var express = require('express');
var app = express();
var server = require('http').createServer(app);

app.set('port', process.env.PORT || 3435);

app.get('/', function(request, response){
    response.send(200, "Hello World");
});

server.listen(app.get('port'));
console.log('listening on port ' + app.get('port'));
