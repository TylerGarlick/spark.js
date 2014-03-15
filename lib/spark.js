'use strict';

// Third Party

// Internal
var helpers = require('./helpers/index');
var Collections = require('./collections');
var config = require('./configuration');

var statics = {};
Object.defineProperties(statics, {
  _collectionNames: {enumerable: false, configuration: false, writable: true}
});

/*
 * Setup Authorization
 */

/**
 * Setup authorization
 * @param [params]
 */
var setupAuthorization = function (params) {
  params = params || {};
  if (params.username && params.username.length > 0) {
    var credentials = params.username;
    if (params.password && params.password.length > 0) {
      credentials = credentials + ":" + params.password;
    }
    config.authorization.token = helpers.database.base64.encode(credentials);
  }
};

Object.defineProperties(module.exports, {
  /**
   * Configuration
   */
  configuration: { value: config, enumerable: true, configurable: true},

  /**
   * Initialize
   */
  initialize: {

    /**
     * Initialize Spark and save the databaseUrl and databaseName in the configuration
     *
     * @param {String} databaseUrl
     * @param {String} databaseName
     * @param {Object} [options]
     */
    value: function (databaseUrl, databaseName, options) {
      options = options || {};

      // Validate url and remove trailing slash
      helpers.urls.validate(databaseUrl);
      databaseUrl = helpers.urls.removeTrailingSlash(databaseUrl);

      setupAuthorization(options);

      // Set configuration params
      config.database.url = databaseUrl;
      config.database.name = databaseName;

    },
    enumerable: true,
    configurable: false
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