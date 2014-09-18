"use strict";

var Uri = require('lite-url'),
    Settings = require('./settings');

var internals = {
  endpoints: {

    //Databases
    databaseUser: '/_api/database/user',
    databaseCreate: '/_api/database',
    databaseCurrent: '/_api/database/current',

    //Collections
    collectionsCreate: '/_api/collection',
    collectionsAll: '/_api/collection',
    collectionsByName: '/_api/collection/:name',
    collectionsRename: '/_api/collection/:name/rename',
    collectionsTruncate: '/_api/collection/:name/truncate',
    collectionsDelete: '/_api/collection/:name/truncate',
    collectionsProperties: '/_api/collection/:name/properties',

    documentsCreate: '/_api/document?collection=:collectionName',
    documentsAll: '/_api/document?collection=:collectionName',
    documentsById: '/_api/document/:_id',
    documentsReplace: '/_api/document/:_id',
    documentsPatch: '/_api/document/:_id',
    documentsDelete: '/_api/document/:_id',

  }
};

//var settings = new Settings();

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
 * Combine the uri
 * @param uri
 * @param kind
 * @returns {*}
 */
internals.combine = function (uri, kind) {
  uri = internals.stripTrailingSlash(uri);
  var relativePath = internals.endpoints[kind];
  if (!relativePath)
    throw new Error("Can't find an endpoint with the name " + kind);
  return uri + relativePath;
};

/**
 * Parses and returns the pieces of the uri
 * @param {string} uri
 * @returns {Uri}
 */
internals.parseUri = function (uri) {
  return new Uri(uri);
};

module.exports.urls = {
  endpoints: internals.endpoints,

  /**
   * Get an endpoint by name
   * @param {String} name
   * @returns {String}
   */
  endpoint: function (name) {
    return internals.combine(Settings.connection.baseUri, name);
  },

  /**
   * Combine the uri
   * @param uri
   * @param kind
   * @returns {*}
   */
  combine: internals.combine,

  /**
   * Removes the trailing slash
   * @param {string} uri
   * @returns {string}
   */
  sanitize: internals.stripTrailingSlash,

  /**
   * Removes the leading and trailing slashes
   * @param {string} uri
   * @returns {string}
   */
  stripLeadingAndTrailingSlashes: internals.stripTrailingAndLeadingSlash,

  /**
   * Parses and returns the pieces of the uri
   * @param {string} uri
   * @returns {Uri}
   */
  parse: internals.parseUri

};