module.exports = function(input){
    input = input || 'abcdefghijklmnopqrstuvwxyz'
    var digits = input.split('');
    var m = digits.length;
    return function notation(n){
	if (n < m) {
	    return digits[n];
	} else {
	    return notation(n / m - 1) + digits[n % m];
	}
    }
}
