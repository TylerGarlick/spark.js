'use strict';

// 3rd Party
var _ = require('lodash');

// Internal
var helpers = require('./helpers');


var database = {};
Object.defineProperties(database, {

  /**
   * Database Url
   */
  url: { enumerable: true, configurable: false, writable: true },

  /**
   * Database Name
   */
  name: { enumerable: true, configurable: false, writable: true },

  isValid: {
    get: function () {
      var valid = true;

      if (!_.isString(this.url) || this.url.length == 0) valid = false;
      if (!helpers.urls.validate(this.url)) valid = false;

      if (!_.isString(this.name) || this.url.length == 0) valid = false;

      return valid;
    },
    enumerable: true,
    configurable: false
  }
});

var authorization = {};
Object.defineProperties(authorization, {

  /**
   * Authorization Token
   */
  token: { enumerable: true, configurable: false, writable: true }
});

var privates = {};
Object.defineProperties(privates, {

  /**
   * Collection Names
   */
  collectionNames: { enumerable: false, configurable: true, writable: true }
});

Object.defineProperties(module.exports, {
  /**
   * Privates
   */
  __: {value: privates, enumerable: false, configuration: false },
  /**
   * Database settings
   */
  database: { value: database, enumerable: true, configurable: false },

  /**
   * Authorization Settings
   */
  authorization: { value: authorization, enumerable: true, configurable: false },

  reset: {
    value: function () {
      var self = this;
      self.database.url = null;
      self.database.name = null;

      self.authorization.token = null;
    },
    enumerable: true,
    configurable: false
  }
});