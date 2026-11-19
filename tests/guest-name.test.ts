import assert from 'node:assert/strict';
import { Buffer } from 'node:buffer';
import test from 'node:test';
import { resolveGuestName } from '../features/cover/guest-name.ts';

const first = 'a'.repeat(32);
const second = 'b'.repeat(32);
const config = JSON.stringify({ [first]: 'Tamu A', [second]: 'Tamu B' });
const shortFirst = Buffer.from(first, 'hex').toString('base64url');
const shortSecond = Buffer.from(second, 'hex').toString('base64url');

await test('the name follows the exact invitation link', () => {
  assert.equal(resolveGuestName(first, config), 'Tamu A');
  assert.equal(resolveGuestName(second, config), 'Tamu B');
  assert.equal(resolveGuestName(shortFirst, config), 'Tamu A');
  assert.equal(resolveGuestName(shortSecond, config), 'Tamu B');
});

await test('padded and noncanonical short codes are rejected', () => {
  const alias = `${shortFirst.slice(0, -1)}h`;
  assert.equal(Buffer.from(alias, 'base64url').toString('hex'), first);
  assert.equal(resolveGuestName(alias, config), undefined);
  assert.equal(resolveGuestName(`${shortFirst}==`, config), undefined);
});

await test('absent, unknown, or ambiguous codes use the generic greeting', () => {
  for (const code of [undefined, 'c'.repeat(32), [first, second], 'Tamu A']) {
    assert.equal(resolveGuestName(code, config), undefined);
  }
});

await test('missing or malformed server configuration uses the generic greeting', () => {
  for (const value of [
    undefined,
    '{',
    'null',
    JSON.stringify({ [first]: 1 }),
  ]) {
    assert.equal(resolveGuestName(first, value), undefined);
  }
});
