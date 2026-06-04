export class ColorRGBA {
  readonly r: number;
  readonly g: number;
  readonly b: number;
  readonly a: number;

  constructor(r: number, g: number, b: number, a = 1) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  toString(): string {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
  }

  static WHITE: ColorRGBA = new ColorRGBA(255, 255, 255, 1);
  static BLACK: ColorRGBA = new ColorRGBA(0, 0, 0, 1);
}

export const rgba = (r: number, g: number, b: number, a = 1): ColorRGBA =>
  new ColorRGBA(r, g, b, a);

export class ColorHSL {
  readonly h: number;
  readonly s: number;
  readonly l: number;
  readonly a: number;

  constructor(h: number, s: number, l: number, a = 1) {
    this.h = h;
    this.s = s;
    this.l = l;
    this.a = a;
  }

  toString(): string {
    return `hsl(${this.h}, ${this.s}%, ${this.l}%, ${this.a})`;
  }
}

export const hsl = (h: number, s: number, l: number, a = 1): ColorHSL => new ColorHSL(h, s, l, a);

export class ColorOKLCH {
  readonly l: number;
  readonly c: number;
  readonly h: number;
  readonly a: number;

  constructor(l: number, c: number, h: number, a = 1) {
    this.l = l;
    this.c = c;
    this.h = h;
    this.a = a;
  }

  toString(): string {
    return `oklch(${this.l}, ${this.c}, ${this.h}, ${this.a})`;
  }
}

export const oklch = (l: number, c: number, h: number, a = 1): ColorOKLCH =>
  new ColorOKLCH(l, c, h, a);

export class ColorOKLAB {
  readonly l: number;
  readonly a: number;
  readonly b: number;
  readonly alpha: number;

  constructor(l: number, a: number, b: number, alpha = 1) {
    this.l = l;
    this.a = a;
    this.b = b;
    this.alpha = alpha;
  }

  toString(): string {
    return `oklab(${this.l}, ${this.a}, ${this.b}, ${this.alpha})`;
  }
}

export const oklab = (l: number, a: number, b: number, alpha = 1): ColorOKLAB =>
  new ColorOKLAB(l, a, b, alpha);

export class ColorLCH {
  readonly l: number;
  readonly c: number;
  readonly h: number;
  readonly a: number;

  constructor(l: number, c: number, h: number, a = 1) {
    this.l = l;
    this.c = c;
    this.h = h;
    this.a = a;
  }

  toString(): string {
    return `lch(${this.l}, ${this.c}, ${this.h}, ${this.a})`;
  }
}

export const lch = (l: number, c: number, h: number, a = 1): ColorLCH => new ColorLCH(l, c, h, a);

export class ColorLAB {
  readonly l: number;
  readonly a: number;
  readonly b: number;
  readonly alpha: number;

  constructor(l: number, a: number, b: number, alpha = 1) {
    this.l = l;
    this.a = a;
    this.b = b;
    this.alpha = alpha;
  }

  toString(): string {
    return `lab(${this.l}, ${this.a}, ${this.b}, ${this.alpha})`;
  }
}

export const lab = (l: number, a: number, b: number, alpha = 1): ColorLAB =>
  new ColorLAB(l, a, b, alpha);

export class Color {
  readonly colorSpace: string;
  readonly values: (number | string)[];
  readonly alpha: number;

  constructor(colorSpace: string, values: (number | string)[], alpha = 1) {
    this.colorSpace = colorSpace;
    this.values = values;
    this.alpha = alpha;
  }

  toString(): string {
    const v = this.values.join(', ');
    return `color(${this.colorSpace} ${v}, ${this.alpha})`;
  }
}

export const color = (colorSpace: string, values: (number | string)[], alpha = 1): Color =>
  new Color(colorSpace, values, alpha);
