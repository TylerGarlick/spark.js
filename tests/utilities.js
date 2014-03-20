'use strict';
var utilities = require('../lib/utilities');

describe('utilities', function () {

  describe('url', function () {

    describe('build', function () {
      it('should build out a url with the database useful for the api url', function(){
        utilities.url.build('http://localhost', 'the-database').should.be.eql('http://localhost/_db/the-database');
      });
    });

    describe('combine', function () {
      it('should combine a url and a path with an ending slash on the url and a beginning slash on the path', function () {
        var url = 'http://localhost/';
        var path = '/the/path/of/awesomeness';
        var result = utilities.url.combine(url, path);
        result.should.be.eql('http://localhost/the/path/of/awesomeness');
      });
      it('should combine a url and a path with no ending slash and a url with no ending slash', function () {
        var url = 'http://localhost';
        var path = 'the/path/of/awesomeness';
        var result = utilities.url.combine(url, path);
        result.should.be.eql('http://localhost/the/path/of/awesomeness');
      });
    });

    describe('validate', function () {
      it('should whether a url starts with the http protocol', function () {
        utilities.url.validate('http://localhost').should.be.ok;
      });
      it('should throw a SparkError if the url is invalid', function () {
        (function () {
          utilities.url.validate('bad://url')
        }).should.throw();
      });
    });

    describe('interpolate', function () {
      it('should replace parameters in url', function () {
        utilities.url.interpolate('http://localhost/{db}', { db: 'awesome'}).should.be.eql('http://localhost/awesome');
      });
      it('should work even if the parameters are not passed in with the params', function () {
        utilities.url.interpolate('http://localhost/{noParam}', {}).should.be.eql('http://localhost/{noParam}');
      });
    });

    describe('removeTrailingSlash', function () {
      it('should remove the trailing slash from a url', function () {
        utilities.url.removeTrailingSlash('http://localhost/').should.be.eql('http://localhost');
      });
      it('should return the url if there is no trailing slash', function () {
        utilities.url.removeTrailingSlash('http://localhost').should.be.eql('http://localhost');
      });
    });


  });
});
