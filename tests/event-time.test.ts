import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  getCountdown,
  toCalendarTimestamp,
} from '../features/invitation/lib/event-time.ts';

await test('08.00–13.00 WIB converts to the correct UTC calendar range', () => {
  assert.equal(
    toCalendarTimestamp('2026-12-26T08:00:00+07:00'),
    '20261226T010000Z',
  );
  assert.equal(
    toCalendarTimestamp('2026-12-26T13:00:00+07:00'),
    '20261226T060000Z',
  );
});

await test('countdown carries days, hours, minutes, and seconds correctly', () => {
  const now = Date.parse('2026-12-24T06:57:56+07:00');
  const target = Date.parse('2026-12-26T08:00:00+07:00');
  assert.deepEqual(
    getCountdown(target, now).map(({ value }) => value),
    [2, 1, 2, 4],
  );
});

await test('countdown never becomes negative at or after the wedding', () => {
  for (const now of [1000, 1001, 90000]) {
    assert.deepEqual(
      getCountdown(1000, now).map(({ value }) => value),
      [0, 0, 0, 0],
    );
  }
});
