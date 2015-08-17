'use strict';

/**
 * CSS Property
 *
 * @param {string} name
 * @param {string} value
 * @constructor
 * @struct
 * @final
 */
function Property(name, value) {
  this.name = name;
  this.value = value;
}

module.exports = Property;
