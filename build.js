'use strict';

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

function build(stylesheet, context) {
  var result = [];
  var ss = collectDependencies(stylesheet);
  for (var i = 0; i < ss.length; i++) {
    result.push(ss[i].rules(context));
  }
  return result;
}

module.exports = build;
