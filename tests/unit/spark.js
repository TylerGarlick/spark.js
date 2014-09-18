"use strict";

var Spark = require('../../lib');

require('chai').should();

describe('Spark', function () {

  describe('connect', function () {

    it('should be able to call the connect function and set the uri', function () {
      var db = Spark.connect('http://localhost:8000/testing');
      db.should.be.ok;
      db.settings.connection.uri.should.be.eql('http://localhost:8000/testing');
    });

    it('should retain the uri', function () {
      Spark.settings.connection.uri.should.be.eql('http://localhost:8000/testing');
    });

  });

  describe('management', function () {

    describe('databases', function () {

      describe('change', function () {

        before(function (next) {
          Spark.management.databases.change('testing')
              .then(next);
        });

        it("should be able to change the database without accessiblity when turned off", function (next) {
          Spark.settings.connection.database.should.be.eql('testing');
          Spark.management.databases.change('blah')
              .then(function () {
                Spark.settings.connection.database.should.be.eql('blah');
                next();
              }).done(null, next);
        });

        it("should be able to change the database and check for accessibility", function (next) {
          Spark.settings.connection.database.should.be.eql('blah');
          Spark.management.databases.change('_system', true)
              .then(function () {
                Spark.settings.connection.database.should.be.eql('_system');
                next();
              }).done(null, next);
        });



      });


    });

  });

});

