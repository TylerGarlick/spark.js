"use strict";

require('chai').should();

var Client = require('../../lib/client'),
    Settings = require('../../lib/settings');

describe('Client', function () {

  before(function () {
    Settings.setUri('http://localhost:8000/testing');
  });

  describe('databases', function () {

    it('should be able to get all accessible databases', function (next) {
      Client.database.accessible()
          .then(function (databases) {
            databases.should.have.length.gte(1);
            next();
          }).done(null, next);

    });


  });

});
