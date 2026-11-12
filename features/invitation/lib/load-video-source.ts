type VideoSource = Readonly<{ src: string; release: () => void }>;

/** Progressive playback when supported; a seekable Blob on hosts without ranges. */
export async function loadVideoSource(
  src: string,
  signal: AbortSignal,
): Promise<VideoSource> {
  const response = await fetch(src, {
    headers: { Range: 'bytes=0-0' },
    signal,
  });
  if (!response.ok) throw new Error('Background video could not be loaded.');

  if (response.status === 206) {
    await response.body?.cancel();
    return { src, release: () => {} };
  }

  // A server ignoring Range already sends the full file; reuse that response.
  const blob = await response.blob();
  if (signal.aborted)
    throw new DOMException('Video load cancelled.', 'AbortError');
  const objectUrl = URL.createObjectURL(blob);
  return { src: objectUrl, release: () => URL.revokeObjectURL(objectUrl) };
}
