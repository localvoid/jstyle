'use strict';

/**
 * Context
 *
 * @constructor
 * @struct
 * @final
 */
function Context() {
  /**
   * Map of minified classNames.
   *
   * @type {Object<string,string>}
   **/
  this.map = {};

  /**
   * Next unique id for className.
   *
   * @type {number}
   * @private
   */
  this._nextClassNameId = 0;
}

/**
 * Returns minified className for the given name.
 *
 * @param {string} name
 * @returns {string}
 */
Context.prototype.getMinifiedClassName = function(name) {
  var id = this.map[name];
  if (id === void 0) {
    id = this.map[name] = _minifiedClassName(this._nextClassNameId++);
  }
  return id;
};

/**
 * Letters used to generate minified classNames.
 *
 * @const {string}
 * @private
 */
var CLASS_NAME_LETTERS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

/**
 * Get minified className.
 *
 * @param {number} id
 * @returns {string}
 * @private
 */
function _minifiedClassName(id) {
  var letters = CLASS_NAME_LETTERS;
  var llen = letters.length;
  var result = '';

  while (id > llen) {
    result += letters[id % llen];
    id = id / llen | 0;
  }
  result += letters[id % llen];

  return result;
}

module.exports = Context;
