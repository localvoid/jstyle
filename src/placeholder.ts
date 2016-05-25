export class Placeholder {
  readonly data: string[];

  constructor() {
    this.data = [];
  }

  add(value: string): Placeholder {
    this.data.push(value);
    return this;
  }
}
