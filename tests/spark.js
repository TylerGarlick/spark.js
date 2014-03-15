'use strict';

var _ = require('lodash');

var Spark = require('../');

var databaseUrl = 'http://proton.arangohosting.com';
var databaseName = 'testing';

describe('Spark', function () {

  describe('setup', function () {
    it('should require a databaseUrl as a parameter', function () {
      var spark = new Spark(databaseUrl, databaseName);
      spark.should.be.ok;
      spark.databaseUrl.should.be.eql(databaseUrl);
      spark.databaseName.should.be.eql(databaseName);

      (function () {
        new Spark('', databaseName);
      }).should.throw();
    });
    it('should require a valid url', function () {
      (function () {
        new Spark('hhttp://', databaseName);
      }).should.throw();
    });
    it('should strip off the trailing slash on the databaseUrl', function () {
      var urlWithTrailingSlash = databaseUrl + '/';
      var spark = new Spark(urlWithTrailingSlash, databaseName);
      spark.databaseUrl.should.be.eql(databaseUrl);
    });
    it('should set the databaseName', function () {
      var spark = new Spark(databaseUrl, databaseName);
      spark.databaseName.should.be.eql(databaseName);
    });
  });

  describe('collections', function () {
    var spark;
    beforeEach(function () {
      spark = new Spark(databaseUrl, databaseName, { username: 'root' });
      spark.should.be.ok;
      spark.databaseUrl.should.be.eql(databaseUrl);
      spark.databaseName.should.be.eql(databaseName);
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
});