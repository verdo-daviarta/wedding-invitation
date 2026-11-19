import { Buffer } from 'node:buffer';

function toGuestKey(code: string): string | undefined {
  if (/^[a-f0-9]{32}$/.test(code)) return code;
  if (!/^[A-Za-z0-9_-]{22}$/.test(code)) return;

  const bytes = Buffer.from(code, 'base64url');
  if (bytes.toString('base64url') === code) return bytes.toString('hex');
}

export function resolveGuestName(
  code: string | string[] | undefined,
  config: string | undefined,
): string | undefined {
  if (typeof code !== 'string' || !config) return;

  const key = toGuestKey(code);
  if (!key) return;

  try {
    const guests: unknown = JSON.parse(config);
    if (!guests || typeof guests !== 'object' || !Object.hasOwn(guests, key)) {
      return;
    }

    const name = (guests as Record<string, unknown>)[key];
    return typeof name === 'string' ? name.trim() || undefined : undefined;
  } catch {
    return;
  }
}
