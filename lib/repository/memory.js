var KeyGenerator = require('../keygenerator.js');

var InMemory = module.exports = function(urls){
    KeyGenerator.call(this);
    this.urls = {};
    for (key in urls) {
	this.urls[key] = urls[key];
    }
}
InMemory.prototype = new KeyGenerator();
InMemory.prototype.store = function(url, callback){
    var key = this.nextKey();
    this.urls[key] = url;
    callback.call(null, key, url);
}
InMemory.prototype.retrieve = function(key, callback){
    var url = this.urls[key];
    callback.call(null, url);
}
