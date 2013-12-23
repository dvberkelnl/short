var expect = require('chai').expect;

var factory = require('../lib/notation');

describe('notation', function(){
    var notations = {
	'abcdefghijklmnopqrstuvwxyz' : {
	    0 : 'a',
	    1 : 'b',
	    26: 'aa'
	},
	'abc' : {
	    0  : 'a',
	    1  : 'b',
	    2  : 'c',
	    3  : 'aa',
	    4  : 'ab',
	    5  : 'ac',
	    6  : 'ba',
	    7  : 'bb',
	    8  : 'bc',
	    9  : 'ca',
	    10 : 'cb',
	    11 : 'cc',
	    12 : 'aaa'
	}
    }

    for (digits in notations) {
	var notation = factory(digits);
	var cases = notations[digits];
	describe(digits, function(){
	    for (input in cases) {
		it('should convert a \'' + input + '\' to \'' + cases[input] + '\'', function(){
		    expect(notation(input)).to.equal(cases[input]);
		});
	    }
	});
    };
});
