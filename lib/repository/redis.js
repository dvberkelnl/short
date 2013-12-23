var redis = require('redis');

var KeyGenerator = require('../keygenerator.js');

var NUMBER_OF_LINKS_KEY = 'count:links';
var redisKeyFor = function(key){ return 'link:' + key }

var Redis = module.exports = function(urls, options){
    KeyGenerator.call(this);
    this.options = options || {};
    this.options.port = '6380';
    this.options.host = '127.0.0.1';
    this.ready = false;
    this.client = undefined;
    this.initialize(urls);

}
Redis.prototype = new KeyGenerator();
Redis.prototype.initialize = function(urls){
    if (!this.client) {
	this.client = redis.createClient(this.options.port, this.options.host);
	this.client.on('ready', function(){
	    this.ready = true;
	    this.initializeKeys();
	    this.initializeKnownShorts(urls);
	}.bind(this));
    }
}
Redis.prototype.initializeKeys = function(){
    this.client.get(NUMBER_OF_LINKS_KEY, function(error, value){
	this.from(value || 0);
    }.bind(this));
}
Redis.prototype.initializeKnownShorts = function(urls){
    for (key in urls) {
	this.client.multi()
	    .incr(NUMBER_OF_LINKS_KEY)
	    .set(redisKeyFor(key), urls[key])
	    .exec();
    }
}
Redis.prototype.store = function(url, callback){
    var key = this.nextKey();
    this.client.multi()
	.incr(NUMBER_OF_LINKS_KEY)
	.set(redisKeyFor(key), url)
	.exec(function(){
	    callback.call(null, key, url);
	});
}
Redis.prototype.retrieve = function(key, callback){
    this.client.get(redisKeyFor(key), function(error, url){
	callback.call(null, url);
    })
}
