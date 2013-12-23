var notation = require('./notation');

var KeyGenerator = module.exports = function(){
    this.current = 0;
}
KeyGenerator.prototype.nextKey = function(){
    return notation(this.current++);
}
KeyGenerator.prototype.from = function(n){
    this.current = n;
}
