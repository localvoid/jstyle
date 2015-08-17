'use strict';

var util = require('util');

/**
 * Letters used to generate minified classNames.
 *
 * @const {string}
 * @private
 */
var CLASS_NAME_LETTERS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

/**
 * RegExp that matches classNames in selectors.
 *
 * @const {RegExp}
 * @private
 */
var CLASS_NAME_SELECTOR_REGEXP = new RegExp('\\.[a-zA-Z0-9_-]+', 'g');

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

/**
 * StyleSheet unique id.
 *
 * @type {number}
 * @private
 */
var _nextStyleSheetId = 0;

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

/**
 * Rule Type
 *
 * @enum {number}
 */
var RuleType = {
  selector:  0x0001,
  media:     0x0002,
  keyframes: 0x0004
};

/**
 * Rule
 *
 * @param {number} flags
 * @param {*} data
 * @param {Array<!Property|!Rule>} children
 * @constructor
 * @struct
 * @final
 */
function Rule(flags, data, children) {
  this.flags = flags;
  this.data = data;
  this.children = children;
}

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
 * StyleSheet
 *
 * @param {{require:Array<StyleSheet>|StyleSheet, rules:{function(!Context):Array<!Rule>}}} opts
 * @constructor
 * @struct
 * @final
 */
function StyleSheet(opts) {
  this.id = _nextStyleSheetId++;
  if (opts.require !== void 0) {
    /** @type {Array<!StyleSheet>} */
    this.require = Array.isArray(opts.require) ? opts.require : [opts.require];
  } else {
    this.require = null;
  }
  /** @type {function(!Context):Array<!Rule>} */
  this.rules = opts.rules || null;
}

/**
 * Collect StyleSheet dependencies.
 *
 * @param {!StyleSheet} stylesheet
 * @returns {!Array<!StyleSheet>}
 */
function collectDependencies(stylesheet) {
  var result = [];
  _collectDependencies(stylesheet, result, {});
  return result;
}

/**
 *
 * @param {!StyleSheet} stylesheet
 * @param {!Array<!StyleSheet>} result
 * @param {!Object<string,!StyleSheet>} visited
 * @protected
 */
function _collectDependencies(stylesheet, result, visited) {
  visited[stylesheet.id] = stylesheet;
  if (stylesheet.require != null) {
    for (var i = 0; i < stylesheet.require.length; i++) {
      var r = stylesheet.require[i];
      if (visited[r.id] === void 0) {
        _collectDependencies(r, result, visited);
      }
    }
  }
  result.push(stylesheet);
}

function TreeVisitor() {}
TreeVisitor.prototype.visitRule = function(rule) {
  if ((rule.flags & RuleType.selector) !== 0) {
    this.visitSelectorRule(rule);
  } else if ((rule.flags & RuleType.media) !== 0) {
    this.visitMediaRule(rule);
  } else if ((rule.flags & RuleType.keyframes) !== 0) {
    this.visitKeyframesRule(rule);
  }
};
TreeVisitor.prototype.visitSelectorRule = function(rule) {
  this.visitChildren(rule.children);
};
TreeVisitor.prototype.visitMediaRule = function(rule) {
  this.visitChildren(rule.children);
};
TreeVisitor.prototype.visitKeyframesRule = function(rule) {
  this.visitChildren(rule.children);
};
TreeVisitor.prototype.visitChildren = function(children) {
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
TreeVisitor.prototype.visitProperty = function(property) {};

/**
 * Create a Selector rule.
 *
 * @param {Array<string>|string} selectors
 * @param {Array<Property>} children
 * @returns {!Rule}
 */
function select(selectors, children) {
  if (!Array.isArray(selectors)) {
    selectors = [selectors];
  }
  return new Rule(RuleType.selector, selectors, children);
}

/**
 * Create a Media rule.
 *
 * @param {string} conditions
 * @param {Array<Rule>} children
 * @returns {!Rule}
 */
function media(conditions, children) {
  return new Rule(RuleType.media, conditions, children);
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

function ConvertToStringVisitor() {
  this.result = '';
  this._propsWritten = false;
}
util.inherits(ConvertToStringVisitor, TreeVisitor);

ConvertToStringVisitor.prototype.visitSelectorRule = function(rule) {
  this.result += rule.data.join(',') + '{';
  TreeVisitor.prototype.visitSelectorRule.call(this, rule);
  if (this._propsWritten) {
    this._propsWritten = false;
    this.result = this.result.slice(0, -1); // remove ";"
  }
  this.result += '}';
};

ConvertToStringVisitor.prototype.visitMediaRule = function(rule) {
  this.result += '@media ' + rule.data + '{';
  TreeVisitor.prototype.visitMediaRule.call(this, rule);
  this.result += '}';
};

ConvertToStringVisitor.prototype.visitKeyframesRule = function(rule) {
  this.result += '@keyframes ' + rule.data + '{';
  TreeVisitor.prototype.visitKeyframesRule.call(this, rule);
  this.result += '}';
};

ConvertToStringVisitor.prototype.visitProperty = function(property) {
  this.result += property.name + ':' + property.value + ';';
  this._propsWritten = true;
};

function build(stylesheet, context) {
  var result = [];
  var ss = collectDependencies(stylesheet);
  for (var i = 0; i < ss.length; i++) {
    result.push(ss[i].rules(context));
  }
  return result;
}

/**
 * Convert StyleSheets to string.
 *
 * @param {Array<Rule>} rules
 * @param {!Context} context
 * @returns {string}
 */
function convertToString(rules, context) {
  var visitor = new ConvertToStringVisitor();
  visitor.visitChildren(rules);
  return visitor.result;
}

function MinifyClassNamesVisitor(context) {
  this.context = context;
}
util.inherits(MinifyClassNamesVisitor, TreeVisitor);

MinifyClassNamesVisitor.prototype.visitSelectorRule = function(rule) {
  rule.data = rule.data.map(function(s) {
    return s.replace(CLASS_NAME_SELECTOR_REGEXP, function(x) {
      return x[0] + this.context.getMinifiedClassName(x.slice(1));
    }.bind(this));
  }.bind(this));
  TreeVisitor.prototype.visitSelectorRule.call(this, rule);
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

module.exports = {
  Property: Property,
  RuleType: RuleType,
  Rule: Rule,
  Context: Context,
  StyleSheet: StyleSheet,
  build: build,
  TreeVisitor: TreeVisitor,
  select: select,
  media: media,
  prop: prop,
  convertToString: convertToString,
  minifyClassNames: minifyClassNames
};
