'use strict';

var S = require('string'),
  _ = require('lodash'),
  Errors = require('../errors');

module.exports = {
  api: {
    collections: {
      url: '/_db/{db}/_api/collection',
      collection: '/_db/{db}/_api/collection/{name}'
    },
    documents: {
      url: '/_api/document',
      document: '/_api/document/{id}'
    },
    system: {
      echo: "/_admin/echo"
    }
  },
  replace: function (url, params) {
    if (!_.isString(url) || url.length == 0) throw new Errors.SparkUrlError('Url is required and invalid', url);
    params = params || {};
    _.forEach(_.keys(params), function (key) {
      var value = params[key];
      var wrappedKey = '{' + key + '}';
      url = S(url).replaceAll(wrappedKey, value).s;
    });
    return url;
  },
  removeTrailingSlash: function (url) {
    if (S(url).endsWith('/'))
      return S(url).chompRight('/').s;
    return url;
  },
  validate: function (url) {
    if (!_.isString(url))
      throw new Errors.SparkUrlError('Database Url is required');
    if (!S(url).startsWith('http://') && !S(url).startsWith('https://'))
      throw new Errors.SparkUrlError('Url must start with http(s)://', url);
  },
  combine: function (url, path) {
    if (S(url).endsWith('/') && S(path).startsWith('/'))
      url = S(url).chompRight('/').s;
    if (!S(url).endsWith('/') && !S(path).startsWith('/'))
      url = url + '/';
    return url + path;
  }
};
