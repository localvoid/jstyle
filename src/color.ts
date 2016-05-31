import {RgbColor, HsvColor, HslColor, HwbColor, hsvToRgb, hslToRgb, hwbToRgb, hexToRgb, rgbToHsv, rgbToHsl, rgbToHwb,
  rgbToHex, luminance, contrast, contrastLevel, brightness, isDark, isLight, absDesaturate, relDesaturate, absSaturate,
  relSaturate, absLighten, relLighten, absDarken, relDarken, absFadeIn, relFadeIn, absFadeOut, relFadeOut, absWhiten,
  relWhiten, absBlacken, relBlacken, spin, mix, tint, shade, negate, greyscale, formatRgbToHex, formatRgbToString,
  formatHslToString, formatHsvToString, complement, triad, tetrad, splitComplement, analogous,
  monochromatic, rgbLinearize, rgbDelinearize} from "inkdrop";

export {RgbColor, HsvColor, HslColor, HwbColor} from "inkdrop";

export type ContrastLevel = "" | "AA" | "AAA";

export class Color {
  private readonly _rgb: RgbColor;

  constructor(rgb: RgbColor) {
    this._rgb = rgb;
  }

  static rgb(r: number, g: number, b: number, a = 1): Color {
    return new Color(new RgbColor(clamp255(r) / 255, clamp255(g) / 255, clamp255(b) / 255, clamp1(a)));
  }

  static hsv(h: number, s: number, v: number, a = 1): Color {
    return new Color(hsvToRgb(new HsvColor(clamp360(h) / 360, clamp100(s) / 100, clamp100(v) / 100, clamp1(a))));
  }

  static hsl(h: number, s: number, l: number, a = 1): Color {
    return new Color(hslToRgb(new HslColor(clamp360(h) / 360, clamp100(s) / 100, clamp100(l) / 100, clamp1(a))));
  }

  static hwb(h: number, w: number, b: number, a = 1): Color {
    return new Color(hwbToRgb(new HwbColor(clamp360(h) / 360, clamp100(w) / 100, clamp100(b) / 100, clamp1(a))));
  }

  static hex(color: string): Color {
    return new Color(hexToRgb(color));
  }

  asRgb(): RgbColor {
    return this._rgb;
  }

  asHsv(): HsvColor {
    return rgbToHsv(this._rgb);
  }

  asHsl(): HslColor {
    return rgbToHsl(this._rgb);
  }

  asHwb(): HwbColor {
    return rgbToHwb(this._rgb);
  }

  asHex(): string {
    return rgbToHex(this._rgb);
  }

  luminance(): number {
    return luminance(this._rgb);
  }

  contrast(other: Color): number {
    return contrast(this._rgb, other._rgb);
  }

  contrastLevel(other: Color): ContrastLevel {
    const level = contrastLevel(contrast(this._rgb, other._rgb));
    if (level === 0) {
      return "";
    }
    if (level === 1) {
      return "AA";
    }
    return "AAA";
  }

  brightness(): number {
    return brightness(this._rgb);
  }

  isDark(): boolean {
    return isDark(this._rgb);
  }

  isLight(): boolean {
    return isLight(this._rgb);
  }

  isTransparent(): boolean {
    return this._rgb.alpha === 0;
  }

  isOpaque(): boolean {
    return this._rgb.alpha === 1;
  }

  saturate(amount = 0.1, relative = false): Color {
    if (relative) {
      return new Color(hslToRgb(relSaturate(rgbToHsl(this._rgb), amount)));
    }
    return new Color(hslToRgb(absSaturate(rgbToHsl(this._rgb), amount)));
  }

  desaturate(amount = 0.1, relative = false): Color {
    if (relative) {
      return new Color(hslToRgb(relDesaturate(rgbToHsl(this._rgb), amount)));
    }
    return new Color(hslToRgb(absDesaturate(rgbToHsl(this._rgb), amount)));
  }

  lighten(amount = 0.1, relative = false): Color {
    if (relative) {
      return new Color(hslToRgb(relLighten(rgbToHsl(this._rgb), amount)));
    }
    return new Color(hslToRgb(absLighten(rgbToHsl(this._rgb), amount)));
  }

  darken(amount = 0.1, relative = false): Color {
    if (relative) {
      return new Color(hslToRgb(relDarken(rgbToHsl(this._rgb), amount)));
    }
    return new Color(hslToRgb(absDarken(rgbToHsl(this._rgb), amount)));
  }

  fadeIn(amount = 0.1, relative = false): Color {
    if (relative) {
      return new Color(hslToRgb(relFadeIn(rgbToHsl(this._rgb), amount)));
    }
    return new Color(hslToRgb(absFadeIn(rgbToHsl(this._rgb), amount)));
  }

  fadeOut(amount = 0.1, relative = false): Color {
    if (relative) {
      return new Color(hslToRgb(relFadeOut(rgbToHsl(this._rgb), amount)));
    }
    return new Color(hslToRgb(absFadeOut(rgbToHsl(this._rgb), amount)));
  }

  whiten(amount = 0.1, relative = false): Color {
    if (relative) {
      return new Color(hwbToRgb(relWhiten(rgbToHwb(this._rgb), amount)));
    }
    return new Color(hwbToRgb(absWhiten(rgbToHwb(this._rgb), amount)));
  }

  blacken(amount = 0.1, relative = false): Color {
    if (relative) {
      return new Color(hwbToRgb(relBlacken(rgbToHwb(this._rgb), amount)));
    }
    return new Color(hwbToRgb(absBlacken(rgbToHwb(this._rgb), amount)));
  }

  spin(degrees: number): Color {
    return new Color(hslToRgb(spin(rgbToHsl(this._rgb), degrees / 360)));
  }

  mix(other: Color, ratio = 0.5): Color {
    return new Color(rgbDelinearize(mix(rgbLinearize(this._rgb), rgbLinearize(other._rgb), ratio)));
  }

  tint(ratio = 0.5): Color {
    return new Color(rgbDelinearize(tint(rgbLinearize(this._rgb), ratio)));
  }

  shade(ratio = 0.5): Color {
    return new Color(rgbDelinearize(shade(rgbLinearize(this._rgb), ratio)));
  }

  negate(): Color {
    return new Color(negate(this._rgb));
  }

  greyscale(): Color {
    return new Color(greyscale(this._rgb));
  }

  toHexString(): string {
    return formatRgbToHex(this._rgb);
  }

  toRgbString(): string {
    return formatRgbToString(this._rgb);
  }

  toHslString(): string {
    return formatHslToString(rgbToHsl(this._rgb));
  }

  toHsvString(): string {
    return formatHsvToString(rgbToHsv(this._rgb));
  }

  complement(): Color {
    return new Color(hslToRgb(complement(rgbToHsl(this._rgb))));
  }

  triad(): [Color, Color, Color] {
    return triad(rgbToHsl(this._rgb)).map((c) => new Color(hslToRgb(c))) as [Color, Color, Color];
  }

  tetrad(): [Color, Color, Color, Color] {
    return tetrad(rgbToHsl(this._rgb)).map((c) => new Color(hslToRgb(c))) as [Color, Color, Color, Color];
  }

  splitComplement(): [Color, Color, Color] {
    return splitComplement(rgbToHsl(this._rgb)).map((c) => new Color(hslToRgb(c))) as [Color, Color, Color];
  }

  analogous(results = 6, slices = 30): Color[] {
    return analogous(rgbToHsl(this._rgb), results, slices).map((c) => new Color(hslToRgb(c)));
  }

  monochromatic(results = 6): Color[] {
    return monochromatic(rgbToHsv(this._rgb), results).map((c) => new Color(hsvToRgb(c)));
  }
}

function clamp1(v: number): number {
  if (v < 0) {
    return 0;
  }
  if (v > 1) {
    return 1;
  }
  return v;
}

function clamp100(v: number): number {
  if (v < 0) {
    return 0;
  }
  if (v > 1) {
    return 1;
  }
  return v;
}

function clamp255(v: number): number {
  if (v < 0) {
    return 0;
  }
  if (v > 255) {
    return 255;
  }
  return v;
}

function clamp360(v: number): number {
  if (v < 0) {
    return 0;
  }
  if (v > 1) {
    return 1;
  }
  return v;
}
