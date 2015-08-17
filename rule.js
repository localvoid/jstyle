'use strict';

/**
 * Rule
 *
 * @param {string} type
 * @param {*} data
 * @param {Array} children
 * @constructor
 * @struct
 * @final
 */
function Rule(type, data, children) {
  this.type = type;
  this.data = data;
  this.children = children;
}

module.exports = Rule;
