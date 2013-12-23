var InMemory = module.exports = function(){
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
