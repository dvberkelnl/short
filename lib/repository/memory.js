var InMemory = module.exports = function(urls){
    this.urls = {};
    for (key in urls) {
	this.urls[key] = urls[key];
    }
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
InMemory.prototype.retrieve = function(key, callback){
    var url = this.urls[key];
    callback.call(null, url);
}
