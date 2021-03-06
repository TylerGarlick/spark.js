'use strict';

// Third party
var querystring = require('querystring');
var request = require('request');
var _ = require('lodash');
var when = require('when');

// Internal
var helpers = require('./helpers');
var Errors = require('./errors');
var config = require('./configuration');

exports = module.exports = Collections;

/**
 * Collection abstraction to call ArangoDB api collection
 * @constructor
 */
function Collections() {
  this._databaseName = config.database.name;
  this._databaseUrl = config.database.url;
  this._auth = config.authorization.token;

  var collectionUrlPath = helpers.urls.replace(helpers.urls.api.collections.url, { db: this._databaseName});
  this.collectionUrl = helpers.urls.combine(this._databaseName, collectionUrlPath);
}

/**
 * Gets all the collections from a particular database
 * @param {Object} options
 * @returns {Promise}
 */
Collections.prototype.all = function (options) {
  var self = this;
  options = options || { excludeSystem: true };

  var url = self.collectionUrl + '?' + querystring.stringify(options);
  var deferred = when.defer();
  request.get({url: url, json: true}, function (err, res, body) {
    if (err || body.error || res.statusCode != 200) {
      deferred.reject(body);
    }
    else {
      deferred.resolve(body.collections);
    }
  });
  return deferred.promise;
};

/**
 * Gets a collection by name
 * @param name
 * @returns {Promise}
 */
Collections.prototype.get = function (name) {
  var self = this;

  var path = helpers.urls.replace(helpers.urls.api.collections.collection, { db: this._databaseName, name: name});
  var url = helpers.urls.combine(this._databaseUrl, path);

  var deferred = when.defer();
  request.get({url: url, json: true}, function (err, res, body) {
    if (err || body.error || res.statusCode != 200)
      deferred.reject(body);
    else
      deferred.resolve(body);
  });
  return deferred.promise;
};

/**
 * Does the collection already exist?
 * @param name
 * @returns {Promise}
 */
Collections.prototype.exists = function (name) {
  var self = this;
  var deferred = when.defer();
  self.get(name)
    .then(function (collection) {
      if (collection)
        deferred.resolve(true);
      else
        deferred.resolve(false);
    }, function (err) {
      deferred.resolve(false);
    });
  return deferred.promise;
};

/**
 * Create a new collection
 * @param name
 * @param options
 */
Collections.prototype.create = function (name, options) {
  var self = this;
  options = options || { };

  var deferred = when.defer();
  if (!_.isString(name) || name.length == 0) deferred.reject(new Errors.SparkValidationError('Name is required'));

  var url = self.collectionUrl;
  request({
    url: url,
    method: 'POST',
    json: true,
    body: { name: name },
    headers: {
      authorization: 'Basic ' + self._auth
    }
  }, function (err, res, body) {
    if (err || res.statusCode != 200 || body.error)
      deferred.reject(body);
    else
      deferred.resolve(body);
  });
  return deferred.promise;
};

/**
 * Rename a collection
 * @param oldName
 * @param newName
 */
Collections.prototype.rename = function (oldName, newName) { };

/**
 * Delete a collection
 * @param name
 */
Collections.prototype.destroy = function (name) {
  var self = this;
  var deferred = when.defer();

  var url = self.collectionUrlWithName;
  self.exists(name)
    .then(function (exists) {
      if (exists) {
        request.del(url, function (err, res, body) {
          if (err || body.error)
            deferred.reject(body);
          else
            deferred.resolve(true);
        });
      } else {
        deferred.resolve(true);
      }
    });
  return deferred.promise;
};

/**
 * Import data
 * @param name
 * @param json
 */
Collections.prototype.importData = function (name, json) {

};

