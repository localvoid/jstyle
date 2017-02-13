import { Size } from "./size";

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

export type SizeValue = Size | number | string;

export const DEFAULT_SIZE_UNIT = "px";

export function getSizeValue(value: Size | string | number): string {
    if (typeof value === "string") {
        return value;
    } else if (typeof value === "number") {
        if (value === 0) {
            return value.toString();
        }
        return value.toString() + DEFAULT_SIZE_UNIT;
    }
    return value.toString();
}

export type RectSizeValue = [SizeValue, SizeValue] | [SizeValue, SizeValue, SizeValue, SizeValue] | SizeValue;

export type RectString = [string, string] | [string, string, string, string] | string;

export interface BackgroundDetails {
    attachment?: string;
    box?: string;
    color?: string;
    image?: string;
    position?: string;
    repeat?: string;
    size?: Size | number | string;
}

export interface BorderDetails {
    width?: Size | number | string;
    style?: "none" | "hidden" | "dotted" | "dashed" | "solid" | "double" | "groove" | "ridge" | "inset" | "outset";
    color?: string;
}

export type BackgroundValue = BackgroundDetails | BackgroundDetails[] | string;

export type BorderValue = BorderDetails | string;

export type BlendMode = "normal" | "multiply" | "screen" | "overlay" | "darken" | "lighten" | "color-dodge" |
    "color-burn" | "hard-light" | "soft-light" | "difference" | "exclusion" | "hue" | "saturation" | "color" |
    "luminosity";

function rectSizePropertyToString(p: RectSizeValue): string {
    if (Array.isArray(p)) {
        return p.map((v) => getSizeValue(v)).join(" ");
    }
    return getSizeValue(p);
}

function rectColorPropertyToString(p: RectString): string {
    if (Array.isArray(p)) {
        return p.join(" ");
    }
    return p;
}

function backgroundDetailsToString(p: BackgroundDetails): string {
    const result = [] as string[];
    if (p.attachment !== undefined) {
        result.push(p.attachment);
    }
    if (p.box !== undefined) {
        result.push(p.box);
    }
    if (p.color !== undefined) {
        result.push(p.color);
    }
    if (p.image !== undefined) {
        result.push(p.image);
    }
    if (p.position !== undefined) {
        result.push(p.position);
    }
    if (p.repeat !== undefined) {
        result.push(p.repeat);
    }
    if (p.size !== undefined) {
        result.push(getSizeValue(p.size));
    }
    return result.join(" ");
}

function borderDetailsToString(p: BorderDetails): string {
    const result = [] as string[];
    if (p.width !== undefined) {
        result.push(getSizeValue(p.width));
    }
    if (p.style !== undefined) {
        result.push(p.style);
    }
    if (p.color !== undefined) {
        result.push(p.color);
    }

    return result.join(" ");
}

function borderPropertyToString(p: BorderValue): string {
    if (typeof p === "string") {
        return p;
    }
    return borderDetailsToString(p);
}

export type Display = "none" | "inline" | "block" | "inline-block" | "contents" | "list-item" | "inline-list-item" |
    "table" | "inline-table" | "table-cell" | "table-column" | "table-column-group" | "table-footer-group" |
    "table-header-group" | "table-row" | "table-row-group" | "table-caption" | "flex" | "inline-flex" | "grid" |
    "inline-grid" | "ruby" | "ruby-base" | "ruby-text" | "ruby-base-container" | "ruby-text-container" | "run-in" |
    "inherit" | "initial" | "unset";

export const p = {
    new: function (name: string, value: string): Property {
        return new Property(name, value);
    },

    azimuth: function (value: string): Property {
        return new Property("azimuth", value);
    },

    background: function (value: BackgroundDetails[] | BackgroundDetails | string): Property {
        if (typeof value === "string") {
            return new Property("background", value);
        } else if (Array.isArray(value)) {
            return new Property("background", value.map((v) => backgroundDetailsToString(v)).join(", "));
        }
        return new Property("background", backgroundDetailsToString(value));
    },

    backgroundAttachment: function (value: string): Property {
        return new Property("background-attachment", value);
    },

    backgroundColor: function (value: string): Property {
        return new Property("background-color", value);
    },

    backgroundImage: function (value: string): Property {
        return new Property("background-image", value);
    },

    backgroundPosition: function (value: string): Property {
        return new Property("background-position", value);
    },

    backgroundRepeat: function (value: string): Property {
        return new Property("background-repeat", value);
    },

    border: function (value: BorderValue): Property {
        return new Property("border", borderPropertyToString(value));
    },

    borderCollapse: function (value: "separate" | "collapse" | "initial" | "inherit"): Property {
        return new Property("border-collapse", value);
    },

    borderColor: function (value: RectString): Property {
        return new Property("border-color", rectColorPropertyToString(value));
    },

    borderSpacing: function (value: RectSizeValue): Property {
        return new Property("border-spacing", rectSizePropertyToString(value));
    },

    borderStyle: function (value: string): Property {
        return new Property("border-style", value);
    },

    borderTop: function (value: BorderValue): Property {
        return new Property("border-top", borderPropertyToString(value));
    },

    borderRight: function (value: BorderValue): Property {
        return new Property("border-right", borderPropertyToString(value));
    },

    borderBottom: function (value: BorderValue): Property {
        return new Property("border-bottom", borderPropertyToString(value));
    },

    borderLeft: function (value: BorderValue): Property {
        return new Property("border-left", borderPropertyToString(value));
    },

    borderTopColor: function (value: string): Property {
        return new Property("border-top-color", value);
    },

    borderRightColor: function (value: string): Property {
        return new Property("border-right-color", value);
    },

    borderBottomColor: function (value: string): Property {
        return new Property("border-bottom-color", value);
    },

    borderLeftColor: function (value: string): Property {
        return new Property("border-left-color", value);
    },

    borderTopStyle: function (value: string): Property {
        return new Property("border-top-style", value);
    },

    borderRightStyle: function (value: string): Property {
        return new Property("border-right-style", value);
    },

    borderBottomStyle: function (value: string): Property {
        return new Property("border-bottom-style", value);
    },

    borderLeftStyle: function (value: string): Property {
        return new Property("border-left-style", value);
    },

    borderTopWidth: function (value: SizeValue): Property {
        return new Property("border-top-width", getSizeValue(value));
    },

    borderRightWidth: function (value: SizeValue): Property {
        return new Property("border-right-width", getSizeValue(value));
    },

    borderBottomWidth: function (value: SizeValue): Property {
        return new Property("border-bottom-width", getSizeValue(value));
    },

    borderLeftWidth: function (value: SizeValue): Property {
        return new Property("border-left-width", getSizeValue(value));
    },

    borderWidth: function (value: RectSizeValue): Property {
        return new Property("border-width", rectSizePropertyToString(value));
    },

    bottom: function (value: SizeValue): Property {
        return new Property("bottom", getSizeValue(value));
    },

    captionSide: function (value: string): Property {
        return new Property("caption-side", value);
    },

    clear: function (value: "none" | "left" | "right" | "both" | "inline-start" | "inline-end" |
        "inherit"): Property {
        return new Property("clear", value);
    },

    clip: function (value: string): Property {
        return new Property("clip", value);
    },

    color: function (value: string): Property {
        return new Property("color", value);
    },

    content: function (value: string): Property {
        return new Property("content", value);
    },

    counterIncrement: function (value: string): Property {
        return new Property("counter-increment", value);
    },

    counterReset: function (value: string): Property {
        return new Property("counter-reset", value);
    },

    cue: function (value: string): Property {
        return new Property("cue", value);
    },

    cueAfter: function (value: string): Property {
        return new Property("cue-after", value);
    },

    cueBefore: function (value: string): Property {
        return new Property("cue-before", value);
    },

    cursor: function (value: string): Property {
        return new Property("cursor", value);
    },

    direction: function (value: "ltr" | "rtl"): Property {
        return new Property("direction", value);
    },

    display: function (value: Display): Property {
        return new Property("display", value);
    },

    elevation: function (value: string): Property {
        return new Property("elevation", value);
    },

    emptyCells: function (value: string): Property {
        return new Property("empty-cells", value);
    },

    float: function (value: "left" | "right" | "none"): Property {
        return new Property("float", value);
    },

    font: function (value: string): Property {
        return new Property("font", value);
    },

    fontFamily: function (value: string): Property {
        return new Property("font-family", value);
    },

    fontSize: function (value: SizeValue): Property {
        return new Property("font-size", getSizeValue(value));
    },

    fontSizeAdjust: function (value: string): Property {
        return new Property("font-size-adjust", value);
    },

    fontStretch: function (value: string): Property {
        return new Property("font-stretch", value);
    },

    fontStyle: function (value: string): Property {
        return new Property("font-style", value);
    },

    fontVariant: function (value: string): Property {
        return new Property("font-variant", value);
    },

    fontWeight: function (value: "normal" | "bold" | "bolder" | "lighter" | "100" | "200" | "300" | "400" | "500"
        | "600" | "700" | "800" | "900"): Property {
        return new Property("font-weight", value);
    },

    height: function (value: SizeValue): Property {
        return new Property("height", getSizeValue(value));
    },

    left: function (value: SizeValue): Property {
        return new Property("left", getSizeValue(value));
    },

    letterSpacing: function (value: string): Property {
        return new Property("letter-spacing", value);
    },

    lineHeight: function (value: SizeValue): Property {
        return new Property("line-height", getSizeValue(value));
    },

    listStyle: function (value: string): Property {
        return new Property("list-style", value);
    },

    listStyleImage: function (value: string): Property {
        return new Property("list-style-image", value);
    },

    listStylePosition: function (value: string): Property {
        return new Property("list-style-position", value);
    },

    listStyleType: function (value: string): Property {
        return new Property("list-style-type", value);
    },

    margin: function (value: RectSizeValue): Property {
        return new Property("margin", rectSizePropertyToString(value));
    },

    marginTop: function (value: SizeValue): Property {
        return new Property("margin-top", getSizeValue(value));
    },

    marginRight: function (value: SizeValue): Property {
        return new Property("margin-right", getSizeValue(value));
    },

    marginBottom: function (value: SizeValue): Property {
        return new Property("margin-bottom", getSizeValue(value));
    },

    marginLeft: function (value: SizeValue): Property {
        return new Property("margin-left", getSizeValue(value));
    },

    markerOffset: function (value: string): Property {
        return new Property("marker-offset", value);
    },

    marks: function (value: string): Property {
        return new Property("marks", value);
    },

    maxHeight: function (value: SizeValue): Property {
        return new Property("max-height", getSizeValue(value));
    },

    maxWidth: function (value: SizeValue): Property {
        return new Property("max-width", getSizeValue(value));
    },

    minHeight: function (value: SizeValue): Property {
        return new Property("min-height", getSizeValue(value));
    },

    minWidth: function (value: SizeValue): Property {
        return new Property("min-width", getSizeValue(value));
    },

    orphans: function (value: string): Property {
        return new Property("orphans", value);
    },

    outline: function (value: SizeValue): Property {
        return new Property("outline", getSizeValue(value));
    },

    outlineColor: function (value: string): Property {
        return new Property("outline-color", value);
    },

    outlineStyle: function (value: string): Property {
        return new Property("outline-style", value);
    },

    outlineWidth: function (value: RectSizeValue): Property {
        return new Property("outline-width", rectSizePropertyToString(value));
    },

    overflow: function (value: "visible" | "hidden" | "scroll" | "auto"): Property {
        return new Property("overflow", value);
    },

    overflowX: function (value: "visible" | "hidden" | "scroll" | "auto"): Property {
        return new Property("overflow-x", value);
    },

    overflowY: function (value: "visible" | "hidden" | "scroll" | "auto"): Property {
        return new Property("overflow-y", value);
    },

    padding: function (value: RectSizeValue): Property {
        return new Property("padding", rectSizePropertyToString(value));
    },

    paddingTop: function (value: SizeValue): Property {
        return new Property("padding-top", getSizeValue(value));
    },

    paddingRight: function (value: SizeValue): Property {
        return new Property("padding-right", getSizeValue(value));
    },

    paddingBottom: function (value: SizeValue): Property {
        return new Property("padding-bottom", getSizeValue(value));
    },

    paddingLeft: function (value: SizeValue): Property {
        return new Property("padding-left", getSizeValue(value));
    },

    page: function (value: string): Property {
        return new Property("page", value);
    },

    pageBreakAfter: function (value: string): Property {
        return new Property("page-break-after", value);
    },

    pageBreakBefore: function (value: string): Property {
        return new Property("page-break-before", value);
    },

    pageBreakInside: function (value: string): Property {
        return new Property("page-break-inside", value);
    },

    pause: function (value: string): Property {
        return new Property("pause", value);
    },

    pauseAfter: function (value: string): Property {
        return new Property("pause-after", value);
    },

    pauseBefore: function (value: string): Property {
        return new Property("pause-before", value);
    },

    pitch: function (value: string): Property {
        return new Property("pitch", value);
    },

    pitchRange: function (value: string): Property {
        return new Property("pitch-range", value);
    },

    playDuring: function (value: string): Property {
        return new Property("play-during", value);
    },

    position: function (value: string): Property {
        return new Property("position", value);
    },

    quotes: function (value: string): Property {
        return new Property("quotes", value);
    },

    resize: function (value: string): Property {
        return new Property("resize", value);
    },

    richness: function (value: string): Property {
        return new Property("richness", value);
    },

    right: function (value: SizeValue): Property {
        return new Property("right", getSizeValue(value));
    },

    size: function (value: string): Property {
        return new Property("size", value);
    },

    speak: function (value: string): Property {
        return new Property("speak", value);
    },

    speakHeader: function (value: string): Property {
        return new Property("speak-header", value);
    },

    speakNumeral: function (value: string): Property {
        return new Property("speak-numeral", value);
    },

    speakPunctuation: function (value: string): Property {
        return new Property("speak-punctuation", value);
    },

    speechRate: function (value: string): Property {
        return new Property("speech-rate", value);
    },

    stress: function (value: string): Property {
        return new Property("stress", value);
    },

    tableLayout: function (value: string): Property {
        return new Property("table-layout", value);
    },

    textAlign: function (value: string): Property {
        return new Property("text-align", value);
    },

    textDecoration: function (value: string): Property {
        return new Property("text-decoration", value);
    },

    textIndent: function (value: string): Property {
        return new Property("text-indent", value);
    },

    textShadow: function (value: string): Property {
        return new Property("text-shadow", value);
    },

    textTransform: function (value: string): Property {
        return new Property("text-transform", value);
    },

    top: function (value: SizeValue): Property {
        return new Property("top", getSizeValue(value));
    },

    unicodeBidi: function (value: string): Property {
        return new Property("unicode-bidi", value);
    },

    verticalAlign: function (value: string): Property {
        return new Property("vertical-align", value);
    },

    visibility: function (value: string): Property {
        return new Property("visibility", value);
    },

    voiceFamily: function (value: string): Property {
        return new Property("voice-family", value);
    },

    volume: function (value: string): Property {
        return new Property("volume", value);
    },

    whiteSpace: function (value: string): Property {
        return new Property("white-space", value);
    },

    widows: function (value: string): Property {
        return new Property("widows", value);
    },

    width: function (value: SizeValue): Property {
        return new Property("width", getSizeValue(value));
    },

    wordSpacing: function (value: string): Property {
        return new Property("word-spacing", value);
    },

    zIndex: function (value: number | "auto" | "inherit" | "initial" | "unset"): Property {
        return new Property("z-index", typeof value === "string" ? value : value.toString());
    },

    transition: function (value: string): Property {
        return new Property("transition", value);
    },

    boxShadow: function (value: string): Property {
        return new Property("box-shadow", value);
    },

    borderRadius: function (value: string): Property {
        return new Property("border-radius", value);
    },

    transitionProperty: function (value: string): Property {
        return new Property("transition-property", value);
    },

    transform: function (value: string): Property {
        return new Property("transform", value);
    },

    opacity: function (value: number): Property {
        return new Property("opacity", value.toString());
    },

    boxSizing: function (value: "content-box" | "border-box"): Property {
        return new Property("box-sizing", value);
    },

    userSelect: function (value: string): Property {
        return new Property("user-select", value);
    },

    flex: function (value: string): Property {
        return new Property("flex", value);
    },

    fill: function (value: string): Property {
        return new Property("fill", value);
    },

    alignItems: function (value: string): Property {
        return new Property("align-items", value);
    },

    touchAction: function (value: "auto" | "none" | "pan-x" | "pan-left" | "pan-right" | "pan-y" | "pan-up" |
        "pan-down" | "manipulation"): Property {
        return new Property("touch-action", value);
    },

    justifyContent: function (value: string): Property {
        return new Property("justify-content", value);
    },

    pointerEvents: function (value: string): Property {
        return new Property("pointer-events", value);
    },

    willChange: function (value: string): Property {
        return new Property("will-change", value);
    },

    contain: function (value: "layout" | "style" | "paint" | "size" | "strict" | "content"): Property {
        return new Property("contain", value);
    },

    fontDisplay: function (value: "block" | "swap" | "fallback" | "optional"): Property {
        return new Property("font-display", value);
    },

    fontFeatureSettings: function (value: string): Property {
        return new Property("font-feature-settings", value);
    },

    columnCount: function (value: number): Property {
        return new Property("column-count", value.toString());
    },

    columnWidth: function (value: SizeValue): Property {
        return new Property("column-width", getSizeValue(value));
    },

    columnGap: function (value: SizeValue): Property {
        return new Property("column-gap", getSizeValue(value));
    },

    columns: function (value: string): Property {
        return new Property("columns", value);
    },

    backgroundBlendMode: function (value: BlendMode[] | BlendMode): Property {
        if (Array.isArray(value)) {
            return new Property("background-blend-mode", value.join(", "));
        }
        return new Property("background-blend-mode", value);
    },

    imageRendering: function (value: "auto" | "crisp-edges" | "pixelated"): Property {
        return new Property("image-rendering", value);
    },
};
