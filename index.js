'use strict';

var Rule = require('./rule');
var Property = require('./property');

/**
 * Create a Selector rule.
 *
 * @param {Array<string>|string} selectors
 * @param {Array} children
 * @returns {!Rule}
 */
function select(selectors, children) {
  if (!Array.isArray(selectors)) {
    selectors = [selectors];
  }
  return new Rule('selector', selectors, children);
}

/**
 * Create a Media rule.
 *
 * @param {string} conditions
 * @param {Array} children
 * @returns {!Rule}
 */
function media(conditions, children) {
  return new Rule('media', conditions, children);
}

/**
 * Create a Keyframes rule.
 *
 * @param {string} id
 * @param {Array} children
 * @returns {!Rule}
 */
function keyframes(id, children) {
  return new Rule('keyframes', id, children);
}

/**
 * Create a Property.
 *
 * @param {string} name
 * @param {string} value
 * @return {!Property}
 */
function prop(name, value) {
  return new Property(name, value);
}

module.exports = {
  select: select,
  media: media,
  keyframes: keyframes,
  prop: prop,
  Context: require('./context'),
  StyleSheet: require('./stylesheet'),
  Rule: require('./rule'),
  Property: require('./property'),
  build: require('./build')
};
