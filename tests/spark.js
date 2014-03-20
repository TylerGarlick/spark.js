'use strict';
var Spark = require('../lib/spark');
var util = require('util');

describe('Spark', function () {
  describe('constructor', function () {
    it('should save the constructor parameters', function () {
      // with parameters
      var spark = new Spark({url: 'http://localhost:8000', database: 'testing'});

      spark.config.can('url').should.be.ok;
      spark.config.can('database').should.be.ok;

      spark.config.get('url').should.be.eql('http://localhost:8000');
      spark.config.get('database').should.be.eql('testing');

      // without parameters
      spark = new Spark();

      spark.config.can('url').should.be.ok;
      spark.config.can('database').should.be.ok;

      spark.config.get('url').should.be.eql('http://localhost:8000');
      spark.config.get('database').should.be.eql('testing');

    });
  });

  describe('all', function () {
    it('should return all the documents from a collection', function (done) {
      var spark = new Spark({url: 'http://localhost:8000', database: 'testing'});
      spark.all('first')
        .then(function (docs) {
          done();
        }, function (err) {
          console.log(util.inspect(err));
          done(err);
        })
    });
  });

  describe('query', function () {
    var spark;
    before(function (done) {
      spark = new Spark({url: 'http://localhost:8000', database: 'testing'});
      done();
    });
    it('should be able to execute a valid aql query', function (done) {
      spark.query('FOR p IN people RETURN p')
        .then(function (people) {
          people.should.be.ok;
          people.length.should.be.eql(2);
          done();
        }, function (err) {
          console.log(err);
          done(err);
        });

    });
  });


});