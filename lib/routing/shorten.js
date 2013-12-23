var InMemory = require('../repository/memory.js');

var shorten = module.exports = function(options){
    var shortener = new Shortener(options);
    return shortener.shorten.bind(shortener);
}

var Shortener = function(options){
    options = options || {};
    this.repository = options.store || new InMemory();
}
Shortener.prototype.shorten = function(request, response){
    this.repository.store(request.body['target'], function(key, target){
	console.log(target + ' stored under ' + key);
	response.send(200);
    });
}
