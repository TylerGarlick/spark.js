'use strict';

var helpers = require('../lib/helpers');
var databaseUrl = 'http://proton.arangohosting.com';

describe('Utilities', function () {
  describe('database', function () {
    it('should be able to ping a valid server', function (done) {
      helpers.database.ping(databaseUrl).then(function () { done();}, function (err) { done(err)});
      done();
    });
  });
  describe('urls', function () {

  });
});