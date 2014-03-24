'use strict';

var _ = require('lodash');
var Q = require('q');
var request = require('request');

var Errors = require('./errors');
var utilities = require('./utilities')

var storage = {};
Object.defineProperties(Spark, {
  storage: { enumerable: false, configurable: false, value: storage }
});


var config = {};

// Private
var validateName = function (name) {
  if (!name || name.length == 0) throw new Error('Name is required');
};
var sanitizeName = function (name) {
  validateName(name);
  name = name.toLowerCase();
  return name;
};
Object.defineProperties(config, {

  all: {
    /**
     * Get all configuration parameters
     * @return {Object}
     */
    value: function () {
      return Spark.storage;
    },
    enumerable: true,
    configurable: false
  },

  can: {
    /**
     * Can the configuration name be resolved?
     * @param name - The configuration name
     * @return {Boolean}
     */
    value: function (name) {
      name = sanitizeName(name);
      return _.has(Spark.storage, name);
    },
    enumerable: true,
    configurable: false
  },

  get: {
    /**
     * Get the configuration parameter by name
     * @param name
     */
    value: function (name) {
      name = sanitizeName(name);
      if (!config.can(name)) throw new Error('Can not resolve configuration parameter ' + name);
      return Spark.storage[name];
    },
    enumerable: true,
    configurable: false
  },

  set: {
    /**
     * Set the configuration parameter
     * @param name
     * @param value
     * @returns {Object}
     */
    value: function (name, value) {
      name = sanitizeName(name);
      Spark.storage[name] = value;
      return value;
    },
    enumerable: true,
    configurable: false
  },

  remove: {
    /**
     * Remove config parameter
     * @param name
     */
    value: function (name) {
      name = sanitizeName(name);
      if (!config.can(name)) throw new Error('Can not resolve configuration parameter ' + name);
      delete Spark.storage[name];
    },
    enumerable: true,
    configurable: false
  },

  reset: {
    value: function () {
      Spark.storage = {};
    },
    enumerable: true,
    configurable: false
  },

  valid: {
    /**
     * Determine of vital config parameters are set:
     *
     *  url,
     *  Database,
     *  [Username],
     *  [Password]
     * @returns {boolean}
     */
    get: function () {
      return true;
    },
    enumerable: true,
    configurable: false
  }

});


/**
 * @property config
 */
Object.defineProperties(Spark.prototype, {


  config: { value: config, enumerable: true, configurable: false },

  //manage: { value: function () {}, enumerable: true, configurable: false},

  // document base functions
  all: {
    /**
     * All documents from a collection
     * @param collection - the collection's name
     * @param {Object} [options]
     * @param {Number} [options.limit]
     * @param {Number} [options.skip]
     * @returns {Array<Object>|Object}
     */
    value: function (collection, options) {
      var self = this;
      options = options || {};
      var deferred = Q.defer();

      self._checkConfiguration();
      var url = self._apiUrl('/_api/simple/all');
      options.collection = collection;

      request({
        method: 'PUT',
        url: url,
        body: options,
        json: true
      }, function (err, res, body) {
        if (err || body && body.error)
          deferred.reject(new Error(body.errorMessage));
        else {
          if (options.skip || options.limit) {
            deferred.resolve({
              results: body.result,
              hasMore: body.hasMore,
              count: body.count
            });
          } else {
            deferred.resolve(body.result);
          }
        }
      });
      return deferred.promise;
    },
    enumerable: true, configurable: false },

  query: {
    /**
     * AQL Query
     * @param query
     * @param parameters
     */
    value: function (query, parameters) {
      var self = this;
      var deferred = Q.defer();
      parameters = parameters || {};
      if (query && query.length > 0) {
        self._checkConfiguration();
        var url = self._apiUrl('/_api/cursor');
        var req = { query: query };
        _.merge(req, parameters);
        request({
          method: 'POST',
          url: url,
          body: req,
          json: true
        }, function (err, res, body) {
          if (err || body && body.error)
            deferred.reject(new Error(body.errorMessage));
          else {
            if (req.count) {
              deferred.resolve({
                results: body.result,
                hasMore: body.hasMore,
                count: body.count
              });
            } else {
              deferred.resolve(body.result);
            }
          }
        });
        return deferred.promise;
      } else throw new Errors.SparkError('Query is required');
    }, enumerable: true, configurable: false },


  find: {
    /**
     * Find a document by document handle 'collection/key'
     * @param collection
     */
    value: function (collection) {

    }, enumerable: true, configurable: false },

  findBy: {
    value: function (collection, predicate, options) {

    }, enumerable: true, configurable: false },

  search: {
    /**
     * Perform a full text search
     * @param {String} collection - the collection
     * @param {String} attribute - the attribute
     * @param {String} text - the text to search
     * @param {Object} options
     */
    value: function (collection, attribute, text, options) {

    }, enumerable: true, configurable: false },


  first: { value: function (collection) { }, enumerable: true, configurable: false },
  firstBy: { value: function (collection) { }, enumerable: true, configurable: false },
  last: { value: function (collection) { }, enumerable: true, configurable: false },
  exists: { value: function (collection) { }, enumerable: true, configurable: false },

  add: { value: function (collection) { }, enumerable: true, configurable: false },
  update: { value: function (collection) { }, enumerable: true, configurable: false },
  updateBy: { value: function (collection) { }, enumerable: true, configurable: false },
  replace: { value: function (collection) { }, enumerable: true, configurable: false },
  replaceBy: { value: function (collection) { }, enumerable: true, configurable: false },
  destroy: { value: function (collection) { }, enumerable: true, configurable: false },
  destroyBy: { value: function (collection) { }, enumerable: true, configurable: false },

//  Todo
//  random: { value: function (collection) { }, enumerable: true, configurable: false },
//  near: { value: function (collection) { }, enumerable: true, configurable: false },
//  within: { value: function (collection) { }, enumerable: true, configurable: false },



  // privates
  _checkConfiguration: {
    value: function () {
      var self = this;
      if (!self.config.valid) {
        throw new Errors.SparkConfigurationError(self.config.all());
      }
      return true;
    },
    enumerable: false,
    configurable: false
  },

  _apiUrl: {
    value: function (path) {
      var self = this;
      var baseUrl = self.config.get('url');
      var database = self.config.get('database');
      return utilities.url.build(baseUrl, database, path);
    },
    enumerable: false,
    configurable: false
  }

});


/**
 * Spark ArangoDB Client
 * @param {Object} [parameters]
 * @param {String} [parameters.url] - the database url, for example: http://locahost:8000
 * @param {String} [parameters.database] - the name of the database
 * @param {String} [parameters.username] - the username
 * @param {String} [parameters.password] - the password
 * @constructor
 */
function Spark(parameters) {
  parameters = parameters || {};

  if (parameters.url && parameters.url.length > 0)
    this.config.set('url', parameters.url);

  if (parameters.database && parameters.database.length > 0)
    this.config.set('database', parameters.database);

  if (parameters.username && parameters.username.length > 0)
    this.config.set('username', parameters.username);

  if (parameters.password && parameters.password.length > 0)
    this.config.set('password', parameters.password);
}

module.exports = Spark;