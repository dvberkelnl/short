var KeyGenerator = module.exports = function(){
    this.currentKey = 'a';
}
KeyGenerator.prototype.nextKey = function(){
    var key  = this.currentKey;
    this.currentKey += 'a';
    return key;
}
