import { Buffer } from 'node:buffer';
import { sign } from 'node:crypto';
import { parseRsvpResponse, type RsvpResponse } from './rsvp-response';

const tokenUrl = 'https://oauth2.googleapis.com/token';
let cachedToken: { value: string; expiresAt: number } | undefined;

export function isRsvpStorageConfigured() {
  return Boolean(
    process.env.RSVP_SPREADSHEET_ID &&
    process.env.RSVP_GOOGLE_CLIENT_EMAIL &&
    process.env.RSVP_GOOGLE_PRIVATE_KEY,
  );
}

async function getAccessToken() {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) {
    return cachedToken.value;
  }

  const clientEmail = process.env.RSVP_GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.RSVP_GOOGLE_PRIVATE_KEY?.replaceAll(
    '\\n',
    '\n',
  );
  if (!clientEmail || !privateKey) throw new Error('RSVP credentials missing');

  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(
    JSON.stringify({ alg: 'RS256', typ: 'JWT' }),
  ).toString('base64url');
  const claims = Buffer.from(
    JSON.stringify({
      iss: clientEmail,
      scope: 'https://www.googleapis.com/auth/spreadsheets',
      aud: tokenUrl,
      iat: now,
      exp: now + 3600,
    }),
  ).toString('base64url');
  const unsigned = `${header}.${claims}`;
  const signature = Buffer.from(
    sign('RSA-SHA256', Buffer.from(unsigned), privateKey),
  ).toString('base64url');
  const response = await fetch(tokenUrl, {
    method: 'POST',
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${unsigned}.${signature}`,
    }),
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error('RSVP authentication failed');

  const token = (await response.json()) as {
    access_token?: string;
    expires_in?: number;
  };
  if (!token.access_token) throw new Error('RSVP access token missing');
  cachedToken = {
    value: token.access_token,
    expiresAt: Date.now() + (token.expires_in ?? 0) * 1000,
  };
  return cachedToken.value;
}

async function requestSheet<T>(method: string, body: object): Promise<T> {
  const id = process.env.RSVP_SPREADSHEET_ID;
  if (!id) throw new Error('RSVP spreadsheet missing');
  const token = await getAccessToken();
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(id)}/values:${method}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(8000),
    },
  );
  if (!response.ok)
    throw new Error(`RSVP spreadsheet request failed (${response.status})`);
  return (await response.json()) as T;
}

export async function readRsvp(metadataId: number) {
  const result = await requestSheet<{
    valueRanges?: { valueRange?: { values?: unknown[][] } }[];
  }>('batchGetByDataFilter', {
    dataFilters: [{ developerMetadataLookup: { metadataId } }],
    valueRenderOption: 'UNFORMATTED_VALUE',
  });
  const row = result.valueRanges?.[0]?.valueRange?.values?.[0];
  if (!row) return;
  const [, attendance, guestCount, note = ''] = row;
  return parseRsvpResponse({ attendance, guestCount, note });
}

export async function saveRsvp(
  metadataId: number,
  name: string,
  response: RsvpResponse,
) {
  // Metadata identifies a preassigned row even after insertions or row moves.
  const result = await requestSheet<{ totalUpdatedRows?: number }>(
    'batchUpdateByDataFilter',
    {
      valueInputOption: 'RAW',
      data: [
        {
          dataFilter: { developerMetadataLookup: { metadataId } },
        majorDimension: 'ROWS',
          values: [
            [
              name,
              response.attendance,
              response.guestCount,
              response.note,
              new Date().toISOString(),
            ],
          ],
        },
      ],
    },
  );
  if (result.totalUpdatedRows !== 1) throw new Error('RSVP row missing');
}
