var digits = 'abcdefghijklmnopqrstuvwxyz'.split('');
module.exports = function notation(n){
    if (n < digits.length) {
	return digits[n];
    } else {
	return notation(n / digits.length - 1) + digits[n % digits.length];
    }
}
