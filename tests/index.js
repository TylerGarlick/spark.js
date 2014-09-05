'use strict';


require('traceur/bin/traceur-runtime');
var System = require('systemjs');
var Chai = require('chai');
Chai.should();


describe('spark.js', function () {

  var Spark;
  before(function (next) {
    System.import('../dist/spark')
      .then(function (m) {
        Spark = m.Spark;
        next();
      }, function (err) {
        console.log(err);
        throw err;
      });

  })


  describe('defaults', function () {

    it("should be able to intantiate", function () {
      var spark = new Spark();
      spark.should.be.ok;
    });

  });

});