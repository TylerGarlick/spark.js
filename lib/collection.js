'use strict';

var Documents = require('./documents');

/**
 * Collection
 * @param params
 * @constructor
 */
function Collection(params) {
  params = params || {};
  var documents = new Documents(params.name);
  Object.defineProperties(Collection.prototype, {
    documents: { value: documents, enumerable: true, configurable: false}
  });
}

module.exports = Collection;