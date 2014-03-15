'use strict';

var request = require('request');
var when = require('when');

var urls = require('./urls');
var Errors = require('../errors');

exports.ping = function (databaseUrl) {
  var url = urls.combine(databaseUrl, urls.api.system.echo);
  var deferred = when.defer();
  request.get(url, function (err, response) {
    if (err || response.statusCode != 200)
      deferred.reject(new Errors.SparkConnectionError('There was an error connecting to ' + databaseUrl));
    else
      deferred.resolve(true)
  });
  return deferred.promise;
};

exports.base64 = {
  encode: function (unencoded) {
    return new Buffer(unencoded).toString('base64');
  },
  decode: function (encoded) {
    return new Buffer(encoded, 'base64').toString('utf8');
  }
};