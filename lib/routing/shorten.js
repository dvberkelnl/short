var InMemory = require('../repository/memory.js');

module.exports = function(options){
    var shortener = new Shortener(options);
    return {
	'shorten': shortener.shorten.bind(shortener),
	'redirect': shortener.redirect.bind(shortener),
    };
}

var Shortener = function(options){
    options = options || {};
    this.repository = options.repository || new InMemory();
}
Shortener.prototype.shorten = function(request, response){
    response.set('Content-Type', 'application/json');
    this.repository.store(request.body['target'], function(key, target){
	response.send(200, { 'key': key });
    });
}
Shortener.prototype.redirect = function(request, response) {
    this.repository.retrieve(request.params['key'], function(target){
	if (target) {
	    response.redirect(target);
	}
    });
}
