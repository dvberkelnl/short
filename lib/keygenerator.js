var KeyGenerator = module.exports = function(){
    this.current = 0;
}
KeyGenerator.prototype.nextKey = function(){
    return notation(this.current++);
}
KeyGenerator.prototype.from = function(n){
    this.current = n;
}

var digits = 'abcdefghijklmnopqrstuvwxyz'.split('');
function notation(n){
    if (n < digits.length) {
	return digits[n];
    } else {
	return notation(n / digits.length - 1) + digits[n % digits.length];
    }
}
