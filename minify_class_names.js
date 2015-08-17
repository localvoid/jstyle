var util = require('util');
var Visitor = require('./visitor');

/**
 * RegExp that matches classNames in selectors.
 *
 * @const {RegExp}
 * @private
 */
var CLASS_NAME_SELECTOR_REGEXP = new RegExp('\\.[a-zA-Z0-9_-]+', 'g');

function MinifyClassNamesVisitor(context) {
  this.context = context;
}
util.inherits(MinifyClassNamesVisitor, Visitor);

MinifyClassNamesVisitor.prototype.visitSelectorRule = function(rule) {
  rule.data = rule.data.map(function(s) {
    return s.replace(CLASS_NAME_SELECTOR_REGEXP, function(x) {
      return x[0] + this.context.getMinifiedClassName(x.slice(1));
    }.bind(this));
  }.bind(this));
  Visitor.prototype.visitSelectorRule.call(this, rule);
};

/**
 * Minify classNames.
 *
 * @param {Array<Rule>} rules
 * @param {!Context} context
 * @returns {Array<Rule>}
 */
function minifyClassNames(rules, context) {
  var visitor = new MinifyClassNamesVisitor(context);
  visitor.visitChildren(rules);
  return rules;
}

module.exports = minifyClassNames;