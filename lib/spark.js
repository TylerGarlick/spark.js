'use strict';

// Third Party

// Internal
var helpers = require('./helpers/index');
var Collections = require('./collections');

Object.defineProperties(Spark, {
  dbUrl: { enumerable: false, configurable: false, writable: true },
  dbName: { enumerable: false, configurable: false, writable: true },
  auth: {enumerable: false, configurable: false, writable: true}
});


/**
 * Spark Client
 * @constructor
 * @param databaseUrl
 * @param databaseName
 */
function Spark(databaseUrl, databaseName, options) {
  options = options || {};
  helpers.urls.validate(databaseUrl);
  databaseUrl = helpers.urls.removeTrailingSlash(databaseUrl);

  this.databaseUrl = databaseUrl;
  this.databaseName = databaseName;

  if (options.username && options.username.length > 0) {
    var credentials = options.username;
    if (options.password && options.password.length > 0) {
      credentials = credentials + ":" + options.password;
    }
    Spark.auth = helpers.database.base64.encode(credentials);
  }
}

Object.defineProperties(Spark.prototype, {
  _auth: {
    get: function () {
      return Spark.auth;
    },
    enumerable: false
  },
  databaseUrl: {
    get: function () {
      return Spark.dbUrl;
    },
    set: function (value) {
      Spark.dbUrl = value;
    },
    enumerable: true
  },
  databaseName: {
    get: function () {
      return Spark.dbName;
    },
    set: function (value) {
      Spark.dbName = value;
    },
    enumerable: true
  },
  collections: {
    get: function () {
      var self = this;
      var options = null;
      if (self._auth)
        options = { auth: self._auth};
      return new Collections(self.databaseUrl, self.databaseName, options);
    },
    enumerable: true
  }
});


module.exports = Spark;