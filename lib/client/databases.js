"use strict";

var HttpClient = require('./http-client'),
    Utilities = require('../utilities');

exports.accessible = function () {
  var uri = Utilities.urls.endpoint('databaseUser');
  return HttpClient.get(uri);
};

exports.current = function () {
  var uri = Utilities.urls.endpoint('databaseCurrent');
  return HttpClient.get(uri);
};