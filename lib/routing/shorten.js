var shorten = module.exports = function(options){
    var shortener = new Shortener(options);
    return shortener.shorten.bind(shortener);
}

var Shortener = function(options){}
Shortener.prototype.shorten = function(request, response){
	console.log(request.body);
	response.send(200);
}
