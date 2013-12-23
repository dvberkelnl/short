var request = require('supertest');
var expect = require('chai').expect;

var express = require('express');

var shorten = require('../lib/routing/shorten')();

describe('shortener routing', function(){
    var app;

    beforeEach(function(){
	app = new express();
	app.use(express.bodyParser());
	app.post('/', shorten);
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
});
