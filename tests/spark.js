'use strict';

var _ = require('lodash');

var spark = require('../');
var Collection = require('../lib/collection');
var databaseUrl = 'http://localhost:8000';
var databaseName = 'testing';

describe('Spark', function () {

  describe('initialize', function () {
    it('should set the configuration parameters', function () {
      spark.initialize(databaseUrl, databaseName);
      spark.configuration.database.url.should.be.eql(databaseUrl, 'Database url should be ' + databaseUrl);
      spark.configuration.database.name.should.be.eql(databaseName, 'Database name should be ' + databaseName);
    });
    it('should require the database url', function () {
      spark.configuration.reset();
      (function () {
        spark.initialize('', databaseName);
      }).should.throw();
    });
  });



  describe('collections', function () {
    beforeEach(function () {
      spark.initialize(databaseUrl, databaseName, { username: 'root' })
      spark.should.be.ok;
      spark.configuration.database.url.should.be.eql(databaseUrl, 'Database url should be ' + databaseUrl);
      spark.configuration.database.name.should.be.eql(databaseName, 'Database name should be ' + databaseName);
    });

    describe('all', function () {
      it('should return all collections that are non system specific by default', function (finished) {
        spark.collections.all().then(function (collections) {
            collections.should.be.ok;
            _.contains(_.pluck(collections, 'name'), 'first').should.be.true;
            finished();
          },
          function (err) {
            console.log(err);
            finished(err);
          });
      });
      it('should return all collections including system collections when excludeSystem is set to false', function (finished) {
        spark.collections.all({ excludeSystem: false })
          .then(function (collections) {
            collections.should.be.ok;
            _.contains(_.pluck(collections, 'name'), '_users').should.be.true;
            finished();
          },
          function (err) {
            finished(err);
          });
      });
    });

    describe('get', function () {
      it('should get a collection by name when the collection exists', function (done) {
        spark.collections.get('first')
          .then(function (collection) {
            collection.should.be.ok;
            collection.name.should.be.eql('first');
            done();
          },
          function (err) { done(err);});
      });
    });

    describe('exists', function () {
      it('should be true if the collection exists', function (done) {
        spark.collections.exists('first')
          .then(function (exists) {
            exists.should.be.true;
            done();
          },
          function (err) { done(err);});
      });
      it('should be false if the collection does not exist', function (done) {
        spark.collections.exists('bogus')
          .then(function (exists) {
            exists.should.be.false;
            done();
          },
          function (err) { done(err);});
      });
    });

    describe('create', function () {

      beforeEach(function (done) {
        spark.collections.destroy('people')
          .then(function (result) {
            done();
          }, function (err) {
            done(err)
          });
      });

      it('should be able to create a new collection', function (done) {
        spark.collections.create('people')
          .then(function (collection) {
            spark.collections.exists('people')
              .then(function (exists) {
                if (!exists) done('The collection people was not created successfully')
                else done();
              }, function (err) {
                done(err);
              });
          }, function (err) {
            done(err);
          });
      });
    });
  });

  describe('collection', function () {
    it('should have a documents array', function () {
      var collection = new Collection({name: 'people'});
      console.log(collection.documents);
    });
  });
});