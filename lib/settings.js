"use strict";

var Uri = require('lite-url');

var internals = {
  connection: {}
};

/**
 * Removes the trailing slash
 * @param {string} uri
 * @returns {string}
 */
internals.stripTrailingSlash = function (uri) {
  return uri.toLowerCase().replace(/\/+$/, "");
};

/**
 * Removes the leading and trailing slashes
 * @param {string} uri
 * @returns {string}
 */
internals.stripTrailingAndLeadingSlash = function (uri) {
  return uri.toLowerCase().replace(/^\/+|\/+$/g, '');
};

/**
 * Parses and returns the pieces of the uri
 * @param {string} uri
 * @returns {Uri}
 */
internals.parseUri = function (uri) {
  return new Uri(uri);
};


var Settings = { connection: {} };

Object.defineProperties(Settings.connection, {

  uri: {
    enumerable: true, configurable: false,
    get: function () {
      return internals.connection.uri;
    }
  },

  baseUri: {
    enumerable: true, configurable: false,
    get: function () {
      return internals.connection.base;
    }
  },

  database: {
    enumerable: true, configurable: false,
    get: function () {
      return internals.connection.database;
    }
  },

  databaseUriPath: {
    enumerable: true, configurable: false,
    get: function () {
      return internals.connection.database;
    }
  },

  username: {
    enumerable: true, configurable: false,
    get: function () {
      return internals.connection.username;
    }
  },

  password: {
    enumerable: true, configurable: false,
    get: function () {
      return internals.connection.password;
    }
  }
});

Settings.setDatabase = function (database) {
  internals.connection.database = database;
};

Settings.setUri = function (uri) {

  internals.connection.uri = uri;
  var uriPieces = internals.parseUri(uri);

  var origin = uriPieces.origin;
  if (!origin || origin.length == 0)
    throw new Error("Invalid Uri: Origin not valid");
  internals.connection.base = origin;

  var path = uriPieces.pathname,
      name = internals.stripTrailingAndLeadingSlash(path);
  if (!path || path.length == 0 || !name || name.length == 0)
    throw new Error("Invalid Uri: Database path is invalid");

  if (name.indexOf('/') > -1)
    throw new Error("Invalid Uri: Database path is invalid, resulting in an improper database name");

  internals.connection.databaseUriPath = path;
  internals.connection.database = name;

  internals.connection.username = uriPieces.username;
  internals.connection.password = uriPieces.password;
};


module.exports = Settings;