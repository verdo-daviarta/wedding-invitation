import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  MAX_WISH_LENGTH,
  sanitizeAlphanumeric,
  normalizeSubmittedText,
  parseStoredWish,
} from '../features/invitation/sections/08-wishes/wish-model.ts';

await test('wishes accept Unicode names and numbers but remove scripts, tags, and symbols', () => {
  assert.equal(
    sanitizeAlphanumeric(
      '<script>alert(1)</script><b>Bahagia</b> 2026! ❤️',
      150,
    ),
    'Bahagia 2026 ',
  );
  assert.equal(sanitizeAlphanumeric('Élodie 李 １２', 80), 'Élodie 李 12');
});

await test('message length is capped even when input bypasses the textarea', () => {
  assert.equal(
    sanitizeAlphanumeric('a'.repeat(200), MAX_WISH_LENGTH).length,
    150,
  );
  const wish = parseStoredWish(
    JSON.stringify({ name: 'Tamu', message: 'b'.repeat(200) }),
  );
  assert.equal(wish?.message.length, 150);
});

await test('broken, empty, or tampered storage does not crash or count as a submission', () => {
  for (const value of [
    null,
    '',
    '{',
    'null',
    '[]',
    '42',
    '{"name":1}',
    '{"name":" ","message":"Hi"}',
  ]) {
    assert.equal(parseStoredWish(value), null);
  }
});

await test('valid saved wishes survive reload with normalized whitespace', () => {
  assert.equal(
    normalizeSubmittedText('  Selamat\t  menikah\n\n\nBahagia  '),
    'Selamat menikah\n\nBahagia',
  );
  assert.equal(
    parseStoredWish('{"name":" Intan ","message":" Selamat "}')?.name,
    'Intan',
  );
});
