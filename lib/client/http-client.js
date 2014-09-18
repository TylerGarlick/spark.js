"use strict";

var Promise = require('bluebird'),
    Wreck = Promise.promisifyAll(require('wreck')),
    Utilities = require('../utilities');


/**
 * Issue a get request
 * @param {string} uri
 * @param [options]
 * @returns {*}
 */
exports.get = function (uri, options) {
  options = options || {};
  return Wreck.getAsync(uri, options)
      .get(1)
      .then(JSON.parse)
      .get('result');
};

/**
 * Issue a post request
 * @param {string} uri
 * @param {string|array|object} body
 * @param [options]
 * @returns {*}
 */
exports.post = function (uri, body, options) {
  options = options || {};
  options.payload = body;
  return Wreck.postAsync(uri, options)
      .get(1)
      .then(JSON.parse)
      .get('result');
};

/**
 * Issue a put request
 * @param {string} uri
 * @param {string|array|object} body
 * @param [options]
 * @returns {*}
 */
exports.put = function (uri, body, options) {
  options = options || {};
  options.payload = body;
  return Wreck.putAsync(uri, options)
      .get(1)
      .then(JSON.parse)
      .get('result');
};

/**
 * Issue a delete request
 * @param {string} uri
 * @param [options]
 * @returns {*}
 */
exports.delete = function (uri, options) {
  options = options || {};
  return Wreck.deleteAsync(uri, options)
      .get(1)
      .then(JSON.parse)
      .get('result');
};