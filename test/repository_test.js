var expect = require('chai').expect;

var InMemory = require('../lib/repository/memory.js')

describe('A repository', function(){
    var knownShorts = { 'knownKey' : 'http://dvberkel.github.io' };
    var factories = [function inMemory(urls){ return new InMemory(urls); }];

    factories.forEach(function(factory){
	describe(factory.name, function(){
	    var repository;

	    beforeEach(function(){
		repository = factory(knownShorts);
	    });

	    it('should store an url under a key', function(done){
		var url = 'http://google.com'

		repository.store(url, function(key, target){
		    expect(target).to.equal(url);
		    expect(key).to.exist;
		    done();
		});
	    });

	    it('should store different url under a different key', function(done){
		var url = 'http://google.com'
		var differentUrl = 'http://yahoo.com'

		repository.store(url, function(key){
		    repository.store(differentUrl, function(differentKey){
			expect(key).to.not.equal(differentKey);
			done();
		    });
		});
	    });

	    it('should retrieve a previously stored url by key', function(done){
		repository.retrieve('knownKey', function(target){
		    expect(target).to.equal(knownShorts['knownKey'])
		    done();
		});
	    });
	});
    });
});
