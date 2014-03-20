'use strict';

var S = require('string');
var _ = require('lodash');

var SparkConfigurationError = require('./errors').SparkConfigurationError;
var SparkError = require('./errors').SparkError;

module.exports = {
  url: {
    /**
     * Builds the url with the database
     * @param url
     * @param database
     */
    build: function (url, database, path) {
      this.validate(url);
      if (!database) throw new SparkError('Database is required');
      url = this.combine(url, '/_db/{db}');
      url = this.interpolate(url, {db: database});
      if (path)
        url = this.combine(url, path);
      return url;
    },
    /**
     * Replaces parameters wrapped with '{' and '}' from the parameter's hash
     *  - Example: /some/{name}/{that}/{rocks}, -> { name: 'boss', that: 'this', rocks: 'socks' }
     *      would yield: /some/boss/this/socks
     * @param {String} url
     * @param {Object} [parameters]
     * @returns {String}
     */
    interpolate: function (url, parameters) {
      if (!_.isString(url) || url.length == 0) throw new SparkConfigurationError('Url is required and invalid');
      parameters = parameters || {};
      _.forEach(_.keys(parameters), function (key) {
        var value = parameters[key];
        var wrappedKey = '{' + key + '}';
        url = S(url).replaceAll(wrappedKey, value).s;
      });
      return url;
    },

    /**
     * Remove the trailing slash in a url.
     *  - Example: http://localhost/
     *    would yield: http://localhost
     * @param {String} url
     */
    removeTrailingSlash: function (url) {
      if (S(url).endsWith('/'))
        return S(url).chompRight('/').s;
      return url;
    },

    /**
     * Validate the url
     * @param {String} url
     */
    validate: function (url) {
      if (!_.isString(url))
        throw new SparkError('Database Url is required');
      if (!S(url).startsWith('http://') && !S(url).startsWith('https://'))
        throw new SparkError('Url must start with http(s)://', url);

      return true;
    },

    /**
     * Combines the url's which will remove the trailing slash from the url, and combine the path appropriately
     *  - Example: http://localhost/, and /my/path -> http://localhost/my/path
     *
     * @param {String} url
     * @param {String} path
     */
    combine: function (url, path) {
      if (S(url).endsWith('/') && S(path).startsWith('/'))
        url = S(url).chompRight('/').s;
      if (!S(url).endsWith('/') && !S(path).startsWith('/'))
        url = url + '/';
      return url + path;
    }
  }
}
