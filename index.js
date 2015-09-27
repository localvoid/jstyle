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

prop.azimuth = (value) => prop('azimuth', value);
prop.background = (value) => prop('background', value);
prop.backgroundAttachment = (value) => prop('background-attachment', value);
prop.backgroundColor = (value) => prop('background-color', value);
prop.backgroundImage = (value) => prop('background-image', value);
prop.backgroundPosition = (value) => prop('background-position', value);
prop.backgroundRepeat = (value) => prop('background-repeat', value);
prop.border = (value) => prop('border', value);
prop.borderCollapse = (value) => prop('border-collapse', value);
prop.borderColor = (value) => prop('border-color', value);
prop.borderSpacing = (value) => prop('border-spacing', value);
prop.borderStyle = (value) => prop('border-style', value);
prop.borderTop = (value) => prop('border-top', value);
prop.borderRight = (value) => prop('border-right', value);
prop.borderBottom = (value) => prop('border-bottom', value);
prop.borderLeft = (value) => prop('border-left', value);
prop.borderTopColor = (value) => prop('border-top-color', value);
prop.borderRightColor = (value) => prop('border-right-color', value);
prop.borderBottomColor = (value) => prop('border-bottom-color', value);
prop.borderLeftColor = (value) => prop('border-left-color', value);
prop.borderTopStyle = (value) => prop('border-top-style', value);
prop.borderRightStyle = (value) => prop('border-right-style', value);
prop.borderBottomStyle = (value) => prop('border-bottom-style', value);
prop.borderLeftStyle = (value) => prop('border-left-style', value);
prop.borderTopWidth = (value) => prop('border-top-width', value);
prop.borderRightWidth = (value) => prop('border-right-width', value);
prop.borderBottomWidth = (value) => prop('border-bottom-width', value);
prop.borderLeftWidth = (value) => prop('border-left-width', value);
prop.borderWidth = (value) => prop('border-width', value);
prop.bottom = (value) => prop('bottom', value);
prop.captionSide = (value) => prop('caption-side', value);
prop.clear = (value) => prop('clear', value);
prop.clip = (value) => prop('clip', value);
prop.color = (value) => prop('color', value);
prop.content = (value) => prop('content', value);
prop.counterIncrement = (value) => prop('counter-increment', value);
prop.counterReset = (value) => prop('counter-reset', value);
prop.cue = (value) => prop('cue', value);
prop.cueAfter = (value) => prop('cue-after', value);
prop.cueBefore = (value) => prop('cue-before', value);
prop.cursor = (value) => prop('cursor', value);
prop.direction = (value) => prop('direction', value);
prop.display = (value) => prop('display', value);
prop.elevation = (value) => prop('elevation', value);
prop.emptyCells = (value) => prop('empty-cells', value);
prop.float = (value) => prop('float', value);
prop.font = (value) => prop('font', value);
prop.fontFamily = (value) => prop('font-family', value);
prop.fontSize = (value) => prop('font-size', value);
prop.fontSizeAdjust = (value) => prop('font-size-adjust', value);
prop.fontStretch = (value) => prop('font-stretch', value);
prop.fontStyle = (value) => prop('font-style', value);
prop.fontVariant = (value) => prop('font-variant', value);
prop.fontWeight = (value) => prop('font-weight', value);
prop.height = (value) => prop('height', value);
prop.left = (value) => prop('left', value);
prop.letterSpacing = (value) => prop('letter-spacing', value);
prop.lineHeight = (value) => prop('line-height', value);
prop.listStyle = (value) => prop('list-style', value);
prop.listStyleImage = (value) => prop('list-style-image', value);
prop.listStylePosition = (value) => prop('list-style-position', value);
prop.listStyleType = (value) => prop('list-style-type', value);
prop.margin = (value) => prop('margin', value);
prop.marginTop = (value) => prop('margin-top', value);
prop.marginRight = (value) => prop('margin-right', value);
prop.marginBottom = (value) => prop('margin-bottom', value);
prop.marginLeft = (value) => prop('margin-left', value);
prop.markerOffset = (value) => prop('marker-offset', value);
prop.marks = (value) => prop('marks', value);
prop.maxHeight = (value) => prop('max-height', value);
prop.maxWidth = (value) => prop('max-width', value);
prop.minHeight = (value) => prop('min-height', value);
prop.minWidth = (value) => prop('min-width', value);
prop.orphans = (value) => prop('orphans', value);
prop.outline = (value) => prop('outline', value);
prop.outlineColor = (value) => prop('outline-color', value);
prop.outlineStyle = (value) => prop('outline-style', value);
prop.outlineWidth = (value) => prop('outline-width', value);
prop.overflow = (value) => prop('overflow', value);
prop.padding = (value) => prop('padding', value);
prop.paddingTop = (value) => prop('padding-top', value);
prop.paddingRight = (value) => prop('padding-right', value);
prop.paddingBottom = (value) => prop('padding-bottom', value);
prop.paddingLeft = (value) => prop('padding-left', value);
prop.page = (value) => prop('page', value);
prop.pageBreakAfter = (value) => prop('page-break-after', value);
prop.pageBreakBefore = (value) => prop('page-break-before', value);
prop.pageBreakInside = (value) => prop('page-break-inside', value);
prop.pause = (value) => prop('pause', value);
prop.pauseAfter = (value) => prop('pause-after', value);
prop.pauseBefore = (value) => prop('pause-before', value);
prop.pitch = (value) => prop('pitch', value);
prop.pitchRange = (value) => prop('pitch-range', value);
prop.playDuring = (value) => prop('play-during', value);
prop.position = (value) => prop('position', value);
prop.quotes = (value) => prop('quotes', value);
prop.resize = (value) => prop('resize', value);
prop.richness = (value) => prop('richness', value);
prop.right = (value) => prop('right', value);
prop.size = (value) => prop('size', value);
prop.speak = (value) => prop('speak', value);
prop.speakHeader = (value) => prop('speak-header', value);
prop.speakNumeral = (value) => prop('speak-numeral', value);
prop.speakPunctuation = (value) => prop('speak-punctuation', value);
prop.speechRate = (value) => prop('speech-rate', value);
prop.stress = (value) => prop('stress', value);
prop.tableLayout = (value) => prop('table-layout', value);
prop.textAlign = (value) => prop('text-align', value);
prop.textDecoration = (value) => prop('text-decoration', value);
prop.textIndent = (value) => prop('text-indent', value);
prop.textShadow = (value) => prop('text-shadow', value);
prop.textTransform = (value) => prop('text-transform', value);
prop.top = (value) => prop('top', value);
prop.unicodeBidi = (value) => prop('unicode-bidi', value);
prop.verticalAlign = (value) => prop('vertical-align', value);
prop.visibility = (value) => prop('visibility', value);
prop.voiceFamily = (value) => prop('voice-family', value);
prop.volume = (value) => prop('volume', value);
prop.whiteSpace = (value) => prop('white-space', value);
prop.widows = (value) => prop('widows', value);
prop.width = (value) => prop('width', value);
prop.wordSpacing = (value) => prop('word-spacing', value);
prop.zIndex = (value) => prop('z-index', value);
prop.transition = (value) => prop('transition', value);
prop.boxShadow = (value) => prop('box-shadow', value);
prop.borderRadius = (value) => prop('border-radius', value);
prop.transitionProperty = (value) => prop('transition-property', value);
prop.transform = (value) => prop('transform', value);
prop.opacity = (value) => prop('opacity', value);
prop.boxSizing = (value) => prop('box-sizing', value);
prop.userSelect = (value) => prop('user-select', value);
prop.flex = (value) => prop('flex', value);
prop.fill = (value) => prop('fill', value);
prop.alignItems = (value) => prop('align-items', value);
prop.touchAction = (value) => prop('touch-action', value);
prop.justifyContent = (value) => prop('justify-content', value);
prop.pointerEvents = (value) => prop('pointer-events', value);
prop.willChange = (value) => prop('will-change', value);

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
