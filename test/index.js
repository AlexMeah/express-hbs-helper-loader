var expect = require('chai').expect;
var helperLoader = require('../');
var expressApp = require('express')();
var app = require('./fixtures');
var request = require('supertest');

describe('Express Route Loader', function () {
    var agent;

    before(function () {
        agent = request(app);
    });

    it('should register non async helpers', function (done) {
        agent
            .get('/helper')
            .expect(200)
            .expect('Non-async <a href="http://barc.com">barc.com</a>')
            .end(done);
    });

    it('should register async helpers', function (done) {
        agent
            .get('/asyncHelper')
            .expect(200)
            .expect('Async tos.txt. I like test')
            .end(done);
    });

    it('should throw an error if the folder doesn\'t exist', function () {
        expect(function () {
            helperLoader(expressApp, 'idefdontexist');
        }).to.throw(/Sorry, I'm not sure where that folder is.../);
    });

    it('should throw an error a string is passed as the first argument', function () {
        expect(function () {
            helperLoader('notanexpressapp');
        }).to.throw(/Please pass in a express-hbs instance as the first argument/);
    });
});