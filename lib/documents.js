'use strict';

function Documents(collection) {
  Object.defineProperties(this, {
    collection: { value: collection, enumerable: true, configurable: false },

    all: { value: function () { }, enumerable: true, configurable: false },
    query: { value: function () { }, enumerable: true, configurable: false },
    find: { value: function () { }, enumerable: true, configurable: false },
    findAllBy: { value: function () { }, enumerable: true, configurable: false },
    findByFullText: { value: function () { }, enumerable: true, configurable: false },
    first: { value: function () { }, enumerable: true, configurable: false },
    firstBy: { value: function () { }, enumerable: true, configurable: false },
    last: { value: function () { }, enumerable: true, configurable: false },
    exists: { value: function () { }, enumerable: true, configurable: false },

    add: { value: function () { }, enumerable: true, configurable: false },
    update: { value: function () { }, enumerable: true, configurable: false },
    updateBy: { value: function () { }, enumerable: true, configurable: false },
    replace: { value: function () { }, enumerable: true, configurable: false },
    replaceBy: { value: function () { }, enumerable: true, configurable: false },
    destroy: { value: function () { }, enumerable: true, configurable: false },
    destroyBy: { value: function () { }, enumerable: true, configurable: false },
  });
}

module.exports = Documents;

//function Document(properties) {
//  properties = properties || {};
//
//}
//
//exports.module.Document = Document;