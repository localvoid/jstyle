'use strict';

var util = require('util');
var Visitor = require('./visitor');

function ConvertToStringVisitor() {
  this.result = '';
  this._propsWritten = false;
}
util.inherits(ConvertToStringVisitor, Visitor);

ConvertToStringVisitor.prototype.visitSelectorRule = function(rule) {
  this.result += rule.data.join(',') + '{';
  Visitor.prototype.visitSelectorRule.call(this, rule);
  if (this._propsWritten) {
    this._propsWritten = false;
    this.result = this.result.slice(0, -1); // remove ";"
  }
  this.result += '}';
};

ConvertToStringVisitor.prototype.visitMediaRule = function(rule) {
  this.result += '@media ' + rule.data + '{';
  Visitor.prototype.visitMediaRule.call(this, rule);
  this.result += '}';
};

ConvertToStringVisitor.prototype.visitKeyframesRule = function(rule) {
  this.result += '@keyframes ' + rule.data + '{';
  Visitor.prototype.visitKeyframesRule.call(this, rule);
  this.result += '}';
};

ConvertToStringVisitor.prototype.visitProperty = function(property) {
  this.result += property.name + ':' + property.value + ';';
  this._propsWritten = true;
};

/**
 * Convert Rules to string.
 *
 * @param {Array} rules
 * @param {!Context} context
 * @returns {string}
 */
function convertToString(rules, context) {
  var visitor = new ConvertToStringVisitor();
  visitor.visitChildren(rules);
  return visitor.result;
}

module.exports = convertToString;
