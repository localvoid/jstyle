'use strict';

var Rule = require('./rule');
var Property = require('./property');

/**
 * Tree Visitor
 *
 * @constructor
 */
function Visitor() {}

/**
 * Visit children
 *
 * @param {Array} children
 */
Visitor.prototype.visitChildren = function(children) {
  for (var i = 0; i < children.length; i++) {
    var c = children[i];
    if (Array.isArray(c)) {
      this.visitChildren(c);
    } else if (c instanceof Rule) {
      this.visitRule(c);
    } else if (c instanceof Property) {
      this.visitProperty(c);
    }
  }
};

/**
 * Visit rule
 *
 * @param {!Rule} rule
 */
Visitor.prototype.visitRule = function(rule) {
  if (rule.type === 'selector') {
    this.visitSelectorRule(rule);
  } else if (rule.type === 'media') {
    this.visitMediaRule(rule);
  } else if (rule.type === 'keyframes') {
    this.visitKeyframesRule(rule);
  }
};

/**
 * Visit selector rule
 *
 * @param {!Rule} rule
 */
Visitor.prototype.visitSelectorRule = function(rule) {
  this.visitChildren(rule.children);
};

/**
 * Visit media rule
 *
 * @param {!Rule} rule
 */
Visitor.prototype.visitMediaRule = function(rule) {
  this.visitChildren(rule.children);
};

/**
 * Visit keyframes rule
 *
 * @param {!Rule} rule
 */
Visitor.prototype.visitKeyframesRule = function(rule) {
  this.visitChildren(rule.children);
};

/**
 * Visit property
 *
 * @param {!Property} property
 */
Visitor.prototype.visitProperty = function(property) {};

module.exports = Visitor;
