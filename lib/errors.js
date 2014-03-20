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

function SparkConfigurationError(configuration) {
  SparkConfigurationError.super_.call(this, 'There was an error');
  this.name = 'SparkConfigurationError';
  this.configuration = configuration;
}
util.inherits(SparkConfigurationError, SparkError);


exports.SparkError = SparkError;
exports.SparkValidationError = SparkValidationError;
exports.SparkConfigurationError = SparkConfigurationError;