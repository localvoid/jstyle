export class Placeholder {
  readonly data: string[];

  constructor() {
    this.data = [];
  }

  append(value: string): void {
    this.data.push(value);
  }
}
