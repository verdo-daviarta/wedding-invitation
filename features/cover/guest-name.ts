import { Buffer } from 'node:buffer';

function toGuestKey(code: string): string | undefined {
  if (/^[a-f0-9]{32}$/.test(code)) return code;
  if (!/^[A-Za-z0-9_-]{22}$/.test(code)) return;

  const bytes = Buffer.from(code, 'base64url');
  if (bytes.toString('base64url') === code) return bytes.toString('hex');
}

export function resolveGuest(
  code: string | string[] | undefined,
  config: string | undefined,
): { name: string; rsvpMetadataId?: number } | undefined {
  if (typeof code !== 'string' || !config) return;

  const key = toGuestKey(code);
  if (!key) return;

  try {
    const guests: unknown = JSON.parse(config);
    if (!guests || typeof guests !== 'object' || !Object.hasOwn(guests, key)) {
      return;
    }

    const entry = (guests as Record<string, unknown>)[key];
    if (typeof entry === 'string') {
      const name = entry.trim();
      return name ? { name } : undefined;
    }
    if (!entry || typeof entry !== 'object') return;

    const { name, rsvpMetadataId } = entry as Record<string, unknown>;
    if (typeof name !== 'string' || !name.trim()) return;
    return {
      name: name.trim(),
      rsvpMetadataId:
        typeof rsvpMetadataId === 'number' &&
        Number.isInteger(rsvpMetadataId) &&
        rsvpMetadataId > 0 &&
        rsvpMetadataId <= 2147483647
          ? rsvpMetadataId
          : undefined,
    };
  } catch {
    return;
  }
}

export function resolveGuestName(
  code: string | string[] | undefined,
  config: string | undefined,
) {
  return resolveGuest(code, config)?.name;
}
