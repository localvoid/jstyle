'use strict';

var util = require('util');
var Visitor = require('./visitor');

function ConvertToStringVisitor() {
  this.result = '';
  this.depth = 0;
}
util.inherits(ConvertToStringVisitor, Visitor);

ConvertToStringVisitor.prototype.visitSelectorRule = function(rule) {
  this._writePadding();
  this.result += rule.data.join(',') + ' {\n';
  this.depth++;
  Visitor.prototype.visitSelectorRule.call(this, rule);
  this.depth--;
  this._writePadding();
  this.result += '}\n\n';
};

ConvertToStringVisitor.prototype.visitMediaRule = function(rule) {
  this._writePadding();
  this.result += '@media ' + rule.data + ' {\n';
  this.depth++;
  Visitor.prototype.visitMediaRule.call(this, rule);
  this.depth--;
  this._writePadding();
  this.result += '}\n\n';
};

ConvertToStringVisitor.prototype.visitKeyframesRule = function(rule) {
  this._writePadding();
  this.result += '@keyframes ' + rule.data + ' {\n';
  this.depth--;
  Visitor.prototype.visitKeyframesRule.call(this, rule);
  this.depth--;
  this._writePadding();
  this.result += '}\n\n';
};

ConvertToStringVisitor.prototype.visitProperty = function(property) {
  this._writePadding();
  this.result += property.name + ': ' + property.value + ';\n';
};

ConvertToStringVisitor.prototype._writePadding = function() {
  for (var i = 0; i < this.depth; i++) {
    this.result += '  ';
  }
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
