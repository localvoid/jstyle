import {Color} from "./color";

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

export interface PropertyFactoryOptions {
  defaultSizeUnit?: string;
}

export type Size = number | string;
export type Display = "none" | "inline" | "block" | "inline-block" | "contents" | "list-item" | "inline-list-item" |
  "table" | "inline-table" | "table-cell" | "table-column" | "table-column-group" | "table-footer-group" |
  "table-header-group" | "table-row" | "table-row-group" | "table-caption" | "flex" | "inline-flex" | "grid" |
  "inline-grid" | "ruby" | "ruby-base" | "ruby-text" | "ruby-base-container" | "ruby-text-container" | "run-in" |
  "inherit" | "initial" | "unset";

export class PropertyFactory {
  readonly defaultSizeUnit: string;

  constructor(options?: PropertyFactoryOptions) {
    this.defaultSizeUnit = options && options.defaultSizeUnit || "px";
  }

  create(name: string, value: string): Property {
    return new Property(name, value);
  }

  getSizeValue(value: Size): string {
    if (typeof value === "string") {
      return value;
    } else if (value === 0) {
      return value.toString();
    }
    return value.toString() + this.defaultSizeUnit;
  }

  getColorValue(value: Color | string): string {
    if (typeof value === "string") {
      return value;
    }
    if (value.isOpaque) {
      return value.toHexString();
    }
    return value.toRgbString();
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

  backgroundColor(value: Color | string): Property {
    return new Property("background-color", this.getColorValue(value));
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

  borderCollapse(value: "separate" | "collapse" | "initial" | "inherit"): Property {
    return new Property("border-collapse", value);
  }

  borderColor(value: Color | string): Property {
    return new Property("border-color", this.getColorValue(value));
  }

  borderSpacing(value: Size): Property {
    return new Property("border-spacing", this.getSizeValue(value));
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

  borderTopColor(value: Color | string): Property {
    return new Property("border-top-color", this.getColorValue(value));
  }

  borderRightColor(value: Color | string): Property {
    return new Property("border-right-color", this.getColorValue(value));
  }

  borderBottomColor(value: Color | string): Property {
    return new Property("border-bottom-color", this.getColorValue(value));
  }

  borderLeftColor(value: Color | string): Property {
    return new Property("border-left-color", this.getColorValue(value));
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

  borderTopWidth(value: Size): Property {
    return new Property("border-top-width", this.getSizeValue(value));
  }

  borderRightWidth(value: Size): Property {
    return new Property("border-right-width", this.getSizeValue(value));
  }

  borderBottomWidth(value: Size): Property {
    return new Property("border-bottom-width", this.getSizeValue(value));
  }

  borderLeftWidth(value: Size): Property {
    return new Property("border-left-width", this.getSizeValue(value));
  }

  borderWidth(value: Size): Property {
    return new Property("border-width", this.getSizeValue(value));
  }

  bottom(value: Size): Property {
    return new Property("bottom", this.getSizeValue(value));
  }

  captionSide(value: string): Property {
    return new Property("caption-side", value);
  }

  clear(value: "none" | "left" | "right" | "both" | "inline-start" | "inline-end" | "inherit"): Property {
    return new Property("clear", value);
  }

  clip(value: string): Property {
    return new Property("clip", value);
  }

  color(value: Color | string): Property {
    return new Property("color", this.getColorValue(value));
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

  display(value: Display): Property {
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

  fontSize(value: Size): Property {
    return new Property("font-size", this.getSizeValue(value));
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

  fontWeight(value: "normal" | "bold" | "bolder" | "lighter" | "100" | "200" | "300" | "400" | "500" | "600" | "700" |
      "800" | "900"): Property {
    return new Property("font-weight", value);
  }

  height(value: Size): Property {
    return new Property("height", this.getSizeValue(value));
  }

  left(value: Size): Property {
    return new Property("left", this.getSizeValue(value));
  }

  letterSpacing(value: string): Property {
    return new Property("letter-spacing", value);
  }

  lineHeight(value: Size): Property {
    return new Property("line-height", this.getSizeValue(value));
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

  margin(value: Size): Property {
    return new Property("margin", this.getSizeValue(value));
  }

  marginTop(value: Size): Property {
    return new Property("margin-top", this.getSizeValue(value));
  }

  marginRight(value: Size): Property {
    return new Property("margin-right", this.getSizeValue(value));
  }

  marginBottom(value: Size): Property {
    return new Property("margin-bottom", this.getSizeValue(value));
  }

  marginLeft(value: Size): Property {
    return new Property("margin-left", this.getSizeValue(value));
  }

  markerOffset(value: string): Property {
    return new Property("marker-offset", value);
  }

  marks(value: string): Property {
    return new Property("marks", value);
  }

  maxHeight(value: Size): Property {
    return new Property("max-height", this.getSizeValue(value));
  }

  maxWidth(value: Size): Property {
    return new Property("max-width", this.getSizeValue(value));
  }

  minHeight(value: Size): Property {
    return new Property("min-height", this.getSizeValue(value));
  }

  minWidth(value: Size): Property {
    return new Property("min-width", this.getSizeValue(value));
  }

  orphans(value: string): Property {
    return new Property("orphans", value);
  }

  outline(value: string): Property {
    return new Property("outline", value);
  }

  outlineColor(value: Color | string): Property {
    return new Property("outline-color", this.getColorValue(value));
  }

  outlineStyle(value: string): Property {
    return new Property("outline-style", value);
  }

  outlineWidth(value: Size): Property {
    return new Property("outline-width", this.getSizeValue(value));
  }

  overflow(value: "visible" | "hidden" | "scroll" | "auto" | "inherit" | "initial" | "unset"): Property {
    return new Property("overflow", value);
  }

  padding(value: Size): Property {
    return new Property("padding", this.getSizeValue(value));
  }

  paddingTop(value: Size): Property {
    return new Property("padding-top", this.getSizeValue(value));
  }

  paddingRight(value: Size): Property {
    return new Property("padding-right", this.getSizeValue(value));
  }

  paddingBottom(value: Size): Property {
    return new Property("padding-bottom", this.getSizeValue(value));
  }

  paddingLeft(value: Size): Property {
    return new Property("padding-left", this.getSizeValue(value));
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

  right(value: Size): Property {
    return new Property("right", this.getSizeValue(value));
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

  top(value: Size): Property {
    return new Property("top", this.getSizeValue(value));
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

  width(value: Size): Property {
    return new Property("width", this.getSizeValue(value));
  }

  wordSpacing(value: string): Property {
    return new Property("word-spacing", value);
  }

  zIndex(value: number | "auto" | "inherit" | "initial" | "unset"): Property {
    return new Property("z-index", typeof value === "string" ? value : value.toString());
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
