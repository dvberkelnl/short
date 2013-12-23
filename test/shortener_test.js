var request = require('supertest');
var expect = require('chai').expect;

var express = require('express');

var InMemory = require('../lib/repository/memory');
var shortener = require('../lib/routing/shorten')({
    repository : new InMemory({
	'known': 'http://google.com'
    })
});

describe('shortener routing', function(){
    var app;

    beforeEach(function(){
	app = new express();
	app.use(express.bodyParser());
	app.post('/', shortener.shorten);
	app.get('/:key', shortener.redirect);
    });

    it('should shorten a target', function(done){
	request(app).post('/')
	    .type('application/json')
	    .send({ 'target': 'http://google.com' })
	    .expect(200)
	    .expect('Content-Type', /json/)
	    .end(function(error, response){
		expect(response.body).to.have.property('key');
		done();
	    });
    });

    it('should redirect a known key', function(done){
	request(app).get('/known')
	    .expect(200)
	    .end(function(error, response){
		expect(response.header.location).to.equal('http://google.com');
		done();
	    });
    });

    it('should give error message upon unknown key', function(done){
	request(app).get('/unknown')
	    .expect(404)
	    .expect('Content-Type', /json/)
	    .end(function(error, response){
		expect(response.body).to.have.property('message');
		expect(response.body.message).to.match(/'unknown' is not a known key/);
		done();
	    });
    });
});
