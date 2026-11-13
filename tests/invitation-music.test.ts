import assert from 'node:assert/strict';
import test from 'node:test';
import { startInvitationMusic } from '../features/invitation/lib/start-invitation-music.ts';

const click = {
  defaultPrevented: false,
  button: 0,
  metaKey: false,
  ctrlKey: false,
  shiftKey: false,
  altKey: false,
};

await test('opening starts audio synchronously even while playback is still loading', () => {
  let started = false;
  const pendingPlayback = new Promise<void>(() => {});
  const result = startInvitationMusic(click, () => {
    started = true;
    return pendingPlayback;
  });

  assert.equal(started, true, 'play must run before leaving the click gesture');
  assert.equal(result, undefined, 'navigation must not await media loading');
});

await test('modified, non-primary, and cancelled navigation do not start sound in the old tab', () => {
  let attempts = 0;
  const play = () => {
    attempts += 1;
    return Promise.resolve();
  };

  for (const change of [
    { defaultPrevented: true },
    { button: 1 },
    { button: 2 },
    { metaKey: true },
    { ctrlKey: true },
    { shiftKey: true },
    { altKey: true },
  ]) {
    startInvitationMusic({ ...click, ...change }, play);
  }
  assert.equal(attempts, 0);
});
