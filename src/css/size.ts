export type SizeType =
  | 'px'
  | 'em'
  | 'rem'
  | '%'
  | 'ch'
  | 'vh'
  | 'vw'
  | 'dvh'
  | 'svh'
  | 'lvh'
  | 'dvw'
  | 'svw'
  | 'lvw'
  | 'cqi'
  | 'cqb'
  | 'cqmin'
  | 'cqmax'
  | 'cap'
  | 'ic'
  | 'ex'
  | 'fr'
  | 'pt'
  | 'pc'
  | 'in'
  | 'cm'
  | 'mm'
  | 'Q';

export class Size<T extends SizeType = SizeType> {
  readonly value: number;
  readonly type: T;

  constructor(value: number, type: T) {
    this.value = value;
    this.type = type;
  }

  toString(): string {
    if (this.value < 1) {
      return `${this.value.toString()}${this.type}`;
    }
    return `${this.value}${this.type}`;
  }

  add(n: number): Size<T> {
    return new Size(this.value + n, this.type);
  }

  sub(n: number): Size<T> {
    return new Size(this.value - n, this.type);
  }

  mul(n: number): Size<T> {
    return new Size(this.value * n, this.type);
  }

  div(n: number, _fractionDigits?: number): Size<T> {
    return new Size(this.value / n, this.type);
  }

  static px(value: number): Size<'px'> {
    return new Size(value, 'px');
  }

  static em(value: number): Size<'em'> {
    return new Size(value, 'em');
  }

  static rem(value: number): Size<'rem'> {
    return new Size(value, 'rem');
  }

  static pct(value: number): Size<'%'> {
    return new Size(value, '%');
  }

  static ch(value: number): Size<'ch'> {
    return new Size(value, 'ch');
  }

  static ex(value: number): Size<'ex'> {
    return new Size(value, 'ex');
  }

  static cap(value: number): Size<'cap'> {
    return new Size(value, 'cap');
  }

  static ic(value: number): Size<'ic'> {
    return new Size(value, 'ic');
  }

  static vh(value: number): Size<'vh'> {
    return new Size(value, 'vh');
  }

  static vw(value: number): Size<'vw'> {
    return new Size(value, 'vw');
  }

  static dvh(value: number): Size<'dvh'> {
    return new Size(value, 'dvh');
  }

  static svh(value: number): Size<'svh'> {
    return new Size(value, 'svh');
  }

  static lvh(value: number): Size<'lvh'> {
    return new Size(value, 'lvh');
  }

  static dvw(value: number): Size<'dvw'> {
    return new Size(value, 'dvw');
  }

  static svw(value: number): Size<'svw'> {
    return new Size(value, 'svw');
  }

  static lvw(value: number): Size<'lvw'> {
    return new Size(value, 'lvw');
  }

  static cqi(value: number): Size<'cqi'> {
    return new Size(value, 'cqi');
  }

  static cqb(value: number): Size<'cqb'> {
    return new Size(value, 'cqb');
  }

  static cqmin(value: number): Size<'cqmin'> {
    return new Size(value, 'cqmin');
  }

  static cqmax(value: number): Size<'cqmax'> {
    return new Size(value, 'cqmax');
  }

  static fr(value: number): Size<'fr'> {
    return new Size(value, 'fr');
  }

  static pt(value: number): Size<'pt'> {
    return new Size(value, 'pt');
  }

  static pc(value: number): Size<'pc'> {
    return new Size(value, 'pc');
  }

  static inch(value: number): Size<'in'> {
    return new Size(value, 'in');
  }

  static cm(value: number): Size<'cm'> {
    return new Size(value, 'cm');
  }

  static mm(value: number): Size<'mm'> {
    return new Size(value, 'mm');
  }

  static Q(value: number): Size<'Q'> {
    return new Size(value, 'Q');
  }
}
