'use strict';

/**
 * StyleSheet unique id.
 *
 * @type {number}
 * @private
 */
var nextStyleSheetId = 0;

/**
 * StyleSheet
 *
 * @param {{require:Array<StyleSheet>|StyleSheet, rules:{function(!Context):Array<!Rule>}}} opts
 * @constructor
 * @struct
 * @final
 */
function StyleSheet(opts) {
  this.id = nextStyleSheetId++;
  if (opts.require !== void 0) {
    /** @type {Array<!StyleSheet>} */
    this.require = Array.isArray(opts.require) ? opts.require : [opts.require];
  } else {
    this.require = null;
  }
  /** @type {function(!Context):Array<!Rule>} */
  this.rules = opts.rules || null;
}

module.exports = StyleSheet;
