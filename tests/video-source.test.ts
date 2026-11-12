import assert from 'node:assert/strict';
import test from 'node:test';
import { loadVideoSource } from '../features/invitation/lib/load-video-source.ts';

test('range-capable hosting keeps the progressive video URL', async (t) => {
  const request = t.mock.method(
    globalThis,
    'fetch',
    async () => new Response(new Uint8Array([0]), { status: 206 }),
  );
  const source = await loadVideoSource(
    '/video.mp4',
    new AbortController().signal,
  );
  assert.equal(source.src, '/video.mp4');
  assert.equal(request.mock.callCount(), 1);
  assert.deepEqual(request.mock.calls[0].arguments[1]?.headers, {
    Range: 'bytes=0-0',
  });
  source.release();
});

test('hosting without ranges reuses its complete response once and releases the Blob', async (t) => {
  const nativeFetch = globalThis.fetch;
  const payload = new Uint8Array([1, 2, 3, 4]);
  const request = t.mock.method(
    globalThis,
    'fetch',
    async () =>
      new Response(payload, {
        status: 200,
        headers: { 'Content-Type': 'video/mp4' },
      }),
  );
  const source = await loadVideoSource(
    '/video.mp4',
    new AbortController().signal,
  );
  assert.ok(source.src.startsWith('blob:'));
  assert.equal(request.mock.callCount(), 1);
  const response = await nativeFetch(source.src);
  assert.deepEqual(new Uint8Array(await response.arrayBuffer()), payload);
  source.release();
  await assert.rejects(nativeFetch(source.src));
});

test('a cancelled video load never returns an object URL', async (t) => {
  const controller = new AbortController();
  t.mock.method(globalThis, 'fetch', async () => {
    controller.abort();
    return new Response(new Uint8Array([1]), { status: 200 });
  });
  await assert.rejects(loadVideoSource('/video.mp4', controller.signal), {
    name: 'AbortError',
  });
});

test('failed video responses are rejected for the poster fallback', async (t) => {
  t.mock.method(
    globalThis,
    'fetch',
    async () => new Response(null, { status: 404 }),
  );
  await assert.rejects(
    loadVideoSource('/video.mp4', new AbortController().signal),
    /could not be loaded/,
  );
});
