// TODO: check unit size compatibility before operations

export type SizeUnit = "px" | "em" | "ex" | "%" | "cm" | "mm" | "in" | "pt" | "pc" | "ch" | "rem" | "vh" | "vw" |
  "vmin" | "vmax";

export class Size {
  readonly value: number;
  readonly unit: SizeUnit;

  constructor(value: number, unit: SizeUnit) {
    this.value = value;
    this.unit = unit;
  }

  static px(value: number): Size {
    return new Size(value, "px");
  }

  static em(value: number): Size {
    return new Size(value, "em");
  }

  static ex(value: number): Size {
    return new Size(value, "ex");
  }

  static percent(value: number): Size {
    return new Size(value, "%");
  }

  static cm(value: number): Size {
    return new Size(value, "cm");
  }

  static mm(value: number): Size {
    return new Size(value, "mm");
  }

  static in(value: number): Size {
    return new Size(value, "in");
  }

  static pt(value: number): Size {
    return new Size(value, "pt");
  }

  static pc(value: number): Size {
    return new Size(value, "pc");
  }

  static ch(value: number): Size {
    return new Size(value, "ch");
  }

  static rem(value: number): Size {
    return new Size(value, "rem");
  }

  static vh(value: number): Size {
    return new Size(value, "vh");
  }

  static vw(value: number): Size {
    return new Size(value, "vw");
  }

  static vmin(value: number): Size {
    return new Size(value, "vmin");
  }

  static vmax(value: number): Size {
    return new Size(value, "vmax");
  }

  add(value: Size | number): Size {
    if (typeof value === "number") {
      return new Size(this.value + value, this.unit);
    }
    return new Size(this.value + value.value, this.unit);
  }

  sub(value: Size | number): Size {
    if (typeof value === "number") {
      return new Size(this.value - value, this.unit);
    }
    return new Size(this.value - value.value, this.unit);
  }

  mul(value: Size | number): Size {
    if (typeof value === "number") {
      return new Size(this.value * value, this.unit);
    }
    return new Size(this.value * value.value, this.unit);
  }

  div(value: Size | number): Size {
    if (typeof value === "number") {
      return new Size(this.value / value, this.unit);
    }
    return new Size(this.value / value.value, this.unit);
  }

  toString(): string {
    return this.value + this.unit;
  }
}
