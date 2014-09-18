"use strict";

var Settings = require('../../lib/settings'),
    Utilities = require('../../lib/utilities');

require('chai').should();

describe('Utilities', function () {

  before(function () {
    Settings.setUri('http://localhost:8000/fake-db');
    Settings.connection.baseUri.should.be.eql('http://localhost:8000');
  });

  describe('urls', function () {

    it('should be able to get a valid endpoint', function () {
      Utilities.urls.endpoint('databaseUser').should.be.eql('http://localhost:8000/_api/database/user');
    });

    it('should be able to strip the trailing slash and lowercase the uri', function () {
      Utilities.urls.sanitize('http://LocalHost/').should.be.eql('http://localhost');
    });

  });

});
