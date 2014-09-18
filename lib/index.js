"use strict";

var _ = require('lodash'),
    Promise = require('bluebird'),
    Client = require('./client'),
    Settings = require('./settings');

var internals = {};

var Spark = {
  management: {
    databases: {}
  }
};

Spark.connect = function (uri) {
  Settings.setUri(uri);
  return Spark;
};

/**
 * Change between databases
 * @param {string} name
 * @param [checkAccessibility]
 * @returns {*|Promise<U>|Promise.Thenable<U>}
 *
 */
Spark.management.databases.change = function (name, checkAccessibility) {
  if (!name || name.length == 0)
    throw new Error('Database name is required to switch databases');

  return Client.database.accessible()
      .then(function (databases) {
        if (checkAccessibility && !_.contains(databases, name))
          throw new Error("Invalid database name or the database is currently not accessible");
        return Promise.resolve(Settings.setDatabase(name));
      });
};


Object.defineProperties(Spark, {
  settings: { enumerable: false, configurable: false, value: Settings }
});


module.exports = Spark;
