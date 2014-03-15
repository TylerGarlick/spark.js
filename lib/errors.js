var util = require('util');
var _ = require('lodash');

function SparkError(msg) {
  SparkError.super_.call(this);
  this.message = msg;
  this.name = 'SparkError';
}
util.inherits(SparkError, Error);

function SparkValidationError(errors) {
  SparkValidationError.super_.call(this, 'There was an error');
  this.name = 'SparkValidationError';
  if (!_.isArray(errors)) {
    errors = [errors];
  }
  this.errors = errors;
}
util.inherits(SparkValidationError, SparkError);

function SparkConnectionError(msg, url) {
  SparkConnectionError.super_.call(this, msg);
  this.name = 'SparkConnectionError';
  this.url = url;
}
util.inherits(SparkConnectionError, SparkError);

function SparkUrlError(msg, url) {
  SparkConnectionError.super_.call(this, msg);
  this.name = 'SparkUrlError';
  this.url = url;
}
util.inherits(SparkUrlError, SparkError);

function SparkConnectionOptionsUrlError(msg, url) {
  SparkConnectionError.super_.call(this, msg);
  this.name = 'SparkConnectionOptionsUrlError';
  this.url = url;
}
util.inherits(SparkConnectionOptionsUrlError, SparkError);

function SparkCollectionUrlError(msg, url) {
  SparkConnectionError.super_.call(this, msg);
  this.name = 'SparkCollectionUrlError';
  this.url = url;
}
util.inherits(SparkCollectionUrlError, SparkError);


exports.SparkError = SparkError;
exports.SparkUrlError = SparkUrlError;
exports.SparkValidationError = SparkValidationError;
exports.SparkConnectionError = SparkConnectionError;
exports.SparkConnectionOptionsUrlError = SparkConnectionOptionsUrlError;