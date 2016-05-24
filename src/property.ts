/**
 * CSS Property
 */
export class Property {
  readonly name: string;
  readonly value: string;

  constructor(name: string, value: string) {
    this.name = name;
    this.value = value;
  }
}

export class PropertyFactory {
  create(name: string, value: string): Property {
    return new Property(name, value);
  }

  azimuth(value: string): Property {
    return new Property("azimuth", value);
  }
  background(value: string): Property {
    return new Property("background", value);
  }
  backgroundAttachment(value: string): Property {
    return new Property("background-attachment", value);
  }
  backgroundColor(value: string): Property {
    return new Property("background-color", value);
  }
  backgroundImage(value: string): Property {
    return new Property("background-image", value);
  }
  backgroundPosition(value: string): Property {
    return new Property("background-position", value);
  }
  backgroundRepeat(value: string): Property {
    return new Property("background-repeat", value);
  }
  border(value: string): Property {
    return new Property("border", value);
  }
  borderCollapse(value: string): Property {
    return new Property("border-collapse", value);
  }
  borderColor(value: string): Property {
    return new Property("border-color", value);
  }
  borderSpacing(value: string): Property {
    return new Property("border-spacing", value);
  }
  borderStyle(value: string): Property {
    return new Property("border-style", value);
  }
  borderTop(value: string): Property {
    return new Property("border-top", value);
  }
  borderRight(value: string): Property {
    return new Property("border-right", value);
  }
  borderBottom(value: string): Property {
    return new Property("border-bottom", value);
  }
  borderLeft(value: string): Property {
    return new Property("border-left", value);
  }
  borderTopColor(value: string): Property {
    return new Property("border-top-color", value);
  }
  borderRightColor(value: string): Property {
    return new Property("border-right-color", value);
  }
  borderBottomColor(value: string): Property {
    return new Property("border-bottom-color", value);
  }
  borderLeftColor(value: string): Property {
    return new Property("border-left-color", value);
  }
  borderTopStyle(value: string): Property {
    return new Property("border-top-style", value);
  }
  borderRightStyle(value: string): Property {
    return new Property("border-right-style", value);
  }
  borderBottomStyle(value: string): Property {
    return new Property("border-bottom-style", value);
  }
  borderLeftStyle(value: string): Property {
    return new Property("border-left-style", value);
  }
  borderTopWidth(value: string): Property {
    return new Property("border-top-width", value);
  }
  borderRightWidth(value: string): Property {
    return new Property("border-right-width", value);
  }
  borderBottomWidth(value: string): Property {
    return new Property("border-bottom-width", value);
  }
  borderLeftWidth(value: string): Property {
    return new Property("border-left-width", value);
  }
  borderWidth(value: string): Property {
    return new Property("border-width", value);
  }
  bottom(value: string): Property {
    return new Property("bottom", value);
  }
  captionSide(value: string): Property {
    return new Property("caption-side", value);
  }
  clear(value: string): Property {
    return new Property("clear", value);
  }
  clip(value: string): Property {
    return new Property("clip", value);
  }
  color(value: string): Property {
    return new Property("color", value);
  }
  content(value: string): Property {
    return new Property("content", value);
  }
  counterIncrement(value: string): Property {
    return new Property("counter-increment", value);
  }
  counterReset(value: string): Property {
    return new Property("counter-reset", value);
  }
  cue(value: string): Property {
    return new Property("cue", value);
  }
  cueAfter(value: string): Property {
    return new Property("cue-after", value);
  }
  cueBefore(value: string): Property {
    return new Property("cue-before", value);
  }
  cursor(value: string): Property {
    return new Property("cursor", value);
  }
  direction(value: string): Property {
    return new Property("direction", value);
  }
  display(value: string): Property {
    return new Property("display", value);
  }
  elevation(value: string): Property {
    return new Property("elevation", value);
  }
  emptyCells(value: string): Property {
    return new Property("empty-cells", value);
  }
  float(value: string): Property {
    return new Property("float", value);
  }
  font(value: string): Property {
    return new Property("font", value);
  }
  fontFamily(value: string): Property {
    return new Property("font-family", value);
  }
  fontSize(value: string): Property {
    return new Property("font-size", value);
  }
  fontSizeAdjust(value: string): Property {
    return new Property("font-size-adjust", value);
  }
  fontStretch(value: string): Property {
    return new Property("font-stretch", value);
  }
  fontStyle(value: string): Property {
    return new Property("font-style", value);
  }
  fontVariant(value: string): Property {
    return new Property("font-variant", value);
  }
  fontWeight(value: string): Property {
    return new Property("font-weight", value);
  }
  height(value: string): Property {
    return new Property("height", value);
  }
  left(value: string): Property {
    return new Property("left", value);
  }
  letterSpacing(value: string): Property {
    return new Property("letter-spacing", value);
  }
  lineHeight(value: string): Property {
    return new Property("line-height", value);
  }
  listStyle(value: string): Property {
    return new Property("list-style", value);
  }
  listStyleImage(value: string): Property {
    return new Property("list-style-image", value);
  }
  listStylePosition(value: string): Property {
    return new Property("list-style-position", value);
  }
  listStyleType(value: string): Property {
    return new Property("list-style-type", value);
  }
  margin(value: string): Property {
    return new Property("margin", value);
  }
  marginTop(value: string): Property {
    return new Property("margin-top", value);
  }
  marginRight(value: string): Property {
    return new Property("margin-right", value);
  }
  marginBottom(value: string): Property {
    return new Property("margin-bottom", value);
  }
  marginLeft(value: string): Property {
    return new Property("margin-left", value);
  }
  markerOffset(value: string): Property {
    return new Property("marker-offset", value);
  }
  marks(value: string): Property {
    return new Property("marks", value);
  }
  maxHeight(value: string): Property {
    return new Property("max-height", value);
  }
  maxWidth(value: string): Property {
    return new Property("max-width", value);
  }
  minHeight(value: string): Property {
    return new Property("min-height", value);
  }
  minWidth(value: string): Property {
    return new Property("min-width", value);
  }
  orphans(value: string): Property {
    return new Property("orphans", value);
  }
  outline(value: string): Property {
    return new Property("outline", value);
  }
  outlineColor(value: string): Property {
    return new Property("outline-color", value);
  }
  outlineStyle(value: string): Property {
    return new Property("outline-style", value);
  }
  outlineWidth(value: string): Property {
    return new Property("outline-width", value);
  }
  overflow(value: string): Property {
    return new Property("overflow", value);
  }
  padding(value: string): Property {
    return new Property("padding", value);
  }
  paddingTop(value: string): Property {
    return new Property("padding-top", value);
  }
  paddingRight(value: string): Property {
    return new Property("padding-right", value);
  }
  paddingBottom(value: string): Property {
    return new Property("padding-bottom", value);
  }
  paddingLeft(value: string): Property {
    return new Property("padding-left", value);
  }
  page(value: string): Property {
    return new Property("page", value);
  }
  pageBreakAfter(value: string): Property {
    return new Property("page-break-after", value);
  }
  pageBreakBefore(value: string): Property {
    return new Property("page-break-before", value);
  }
  pageBreakInside(value: string): Property {
    return new Property("page-break-inside", value);
  }
  pause(value: string): Property {
    return new Property("pause", value);
  }
  pauseAfter(value: string): Property {
    return new Property("pause-after", value);
  }
  pauseBefore(value: string): Property {
    return new Property("pause-before", value);
  }
  pitch(value: string): Property {
    return new Property("pitch", value);
  }
  pitchRange(value: string): Property {
    return new Property("pitch-range", value);
  }
  playDuring(value: string): Property {
    return new Property("play-during", value);
  }
  position(value: string): Property {
    return new Property("position", value);
  }
  quotes(value: string): Property {
    return new Property("quotes", value);
  }
  resize(value: string): Property {
    return new Property("resize", value);
  }
  richness(value: string): Property {
    return new Property("richness", value);
  }
  right(value: string): Property {
    return new Property("right", value);
  }
  size(value: string): Property {
    return new Property("size", value);
  }
  speak(value: string): Property {
    return new Property("speak", value);
  }
  speakHeader(value: string): Property {
    return new Property("speak-header", value);
  }
  speakNumeral(value: string): Property {
    return new Property("speak-numeral", value);
  }
  speakPunctuation(value: string): Property {
    return new Property("speak-punctuation", value);
  }
  speechRate(value: string): Property {
    return new Property("speech-rate", value);
  }
  stress(value: string): Property {
    return new Property("stress", value);
  }
  tableLayout(value: string): Property {
    return new Property("table-layout", value);
  }
  textAlign(value: string): Property {
    return new Property("text-align", value);
  }
  textDecoration(value: string): Property {
    return new Property("text-decoration", value);
  }
  textIndent(value: string): Property {
    return new Property("text-indent", value);
  }
  textShadow(value: string): Property {
    return new Property("text-shadow", value);
  }
  textTransform(value: string): Property {
    return new Property("text-transform", value);
  }
  top(value: string): Property {
    return new Property("top", value);
  }
  unicodeBidi(value: string): Property {
    return new Property("unicode-bidi", value);
  }
  verticalAlign(value: string): Property {
    return new Property("vertical-align", value);
  }
  visibility(value: string): Property {
    return new Property("visibility", value);
  }
  voiceFamily(value: string): Property {
    return new Property("voice-family", value);
  }
  volume(value: string): Property {
    return new Property("volume", value);
  }
  whiteSpace(value: string): Property {
    return new Property("white-space", value);
  }
  widows(value: string): Property {
    return new Property("widows", value);
  }
  width(value: string): Property {
    return new Property("width", value);
  }
  wordSpacing(value: string): Property {
    return new Property("word-spacing", value);
  }
  zIndex(value: string): Property {
    return new Property("z-index", value);
  }
  transition(value: string): Property {
    return new Property("transition", value);
  }
  boxShadow(value: string): Property {
    return new Property("box-shadow", value);
  }
  borderRadius(value: string): Property {
    return new Property("border-radius", value);
  }
  transitionProperty(value: string): Property {
    return new Property("transition-property", value);
  }
  transform(value: string): Property {
    return new Property("transform", value);
  }
  opacity(value: string): Property {
    return new Property("opacity", value);
  }
  boxSizing(value: string): Property {
    return new Property("box-sizing", value);
  }
  userSelect(value: string): Property {
    return new Property("user-select", value);
  }
  flex(value: string): Property {
    return new Property("flex", value);
  }
  fill(value: string): Property {
    return new Property("fill", value);
  }
  alignItems(value: string): Property {
    return new Property("align-items", value);
  }
  touchAction(value: string): Property {
    return new Property("touch-action", value);
  }
  justifyContent(value: string): Property {
    return new Property("justify-content", value);
  }
  pointerEvents(value: string): Property {
    return new Property("pointer-events", value);
  }
  willChange(value: string): Property {
    return new Property("will-change", value);
  }
}

export const DefaultPropertyFactory = new PropertyFactory();
