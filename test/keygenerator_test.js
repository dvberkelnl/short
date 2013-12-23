var expect = require('chai').expect

var KeyGenerator = require('../lib/keygenerator');

describe('Key Generator', function(){
    var generator;

    beforeEach(function(){
	generator = new KeyGenerator();
    })


    it('should generate key', function(){
	var key = generator.nextKey();

	expect(key).to.exist;
    });

    it('should subsequent keys should be different', function(){
	var first = generator.nextKey();
	var second = generator.nextKey();

	expect(first).not.to.equal(second);
    });

    describe('strategy', function(){
	it('should run through a-z', function(){
	    var expected = 'abcdefghijklmnopqrstuvwxyz';

	    var actual = '';
	    for (var index = 0; index < expected.length; index++) {
		actual += generator.nextKey();
	    }

	    expect(actual).to.equal(expected);
	});

	it('should start from an index', function(){
	    generator.from(1);

	    var key = generator.nextKey();

	    expect(key).to.equal('b');
	});

	it('should continue past z with aa', function(){
	    generator.from(1*26);

	    var key = generator.nextKey();

	    expect(key).to.equal('aa');
	});

	it('should continue past az with ba', function(){
	    generator.from(2*26);

	    var key = generator.nextKey();

	    expect(key).to.equal('ba');
	});
    });
})
