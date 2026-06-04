export class IDSet {
  i: number;
  readonly set: Set<string>;
  readonly #toString: (i: number) => string;
  readonly #exclude: RegExp[];

  constructor(toString: (i: number) => string = indexToId) {
    this.i = 0;
    this.set = new Set<string>();
    this.#toString = toString;
    this.#exclude = [];
  }

  add(id: string): void {
    if (this.set.has(id)) {
      throw Error(`Duplicate id: '${id}'`);
    }
    this.set.add(id);
  }

  exclude(re: RegExp): void {
    this.#exclude.push(re);
  }

  next(): string {
    const exclude = this.#exclude;
    next: while (true) {
      const uid = this.#toString(this.i++);
      for (let i = 0; i < exclude.length; i++) {
        if (exclude[i].test(uid)) {
          continue next;
        }
      }
      if (!this.set.has(uid)) {
        return uid;
      }
    }
  }
}

const ID_CHARS = 'etnriaoscludfpmhgvybxSCwTEDOkAjMNPFILRzBVHUWGKqJYXZQ_-1024368579';

export const indexToId = (i: number): string => {
  let result = ID_CHARS[i % 52];
  i = (i / 52) | 0;

  while (i-- > 0) {
    result += ID_CHARS[i % 64];
    i = (i / 64) | 0;
  }

  return result;
};

const TAG_NAME_CHARS = 'etnriaoscludfpmhgvybxwkjzq1024368579';

export const tagNameIndexToId = (i: number): string => {
  let result = TAG_NAME_CHARS[i % 26];
  i = (i / 26) | 0;

  while (i-- > 0) {
    result += TAG_NAME_CHARS[i % 36];
    i = (i / 36) | 0;
  }

  return result;
};
