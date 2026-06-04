import { describe, test } from 'bun:test';
import { equal } from 'node:assert/strict';

import { indexToId } from '../src/map/uid.js';

describe('id', () => {
  test('0', () => {
    equal(indexToId(0), 'e');
  });

  test('1', () => {
    equal(indexToId(1), 't');
  });

  test('51', () => {
    equal(indexToId(51), 'Q');
  });

  test('52', () => {
    equal(indexToId(52), 'ee');
  });

  test('53', () => {
    equal(indexToId(53), 'te');
  });

  test('54', () => {
    equal(indexToId(54), 'ne');
  });

  test('103', () => {
    equal(indexToId(103), 'Qe');
  });

  test('104', () => {
    equal(indexToId(104), 'et');
  });

  test('115', () => {
    equal(indexToId(115), 'dt');
  });

  test('116', () => {
    equal(indexToId(116), 'ft');
  });

  test('2756', () => {
    equal(indexToId(2756), 'e_');
  });
});
