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

var InMemory = function(){
    this.urls = {};
    this.currentKey = 'a';
}
InMemory.prototype.store = function(url, callback){
    var key = this.nextKey();
    this.urls[key] = url;
    callback.call(null, key, url);
}
InMemory.prototype.nextKey = function(){
    var key  = this.currentKey;
    this.currentKey += 'a';
    return key;
}
