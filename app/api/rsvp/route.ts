import { resolveGuest } from '@/features/cover/guest-name';
import { parseRsvpResponse } from '@/features/invitation/sections/07-rsvp/rsvp-response';
import {
  isRsvpStorageConfigured,
  readRsvp,
  saveRsvp,
} from '@/features/invitation/sections/07-rsvp/rsvp-sheets';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const guest = resolveGuest(
    new URL(request.url).searchParams.get('i') ?? undefined,
    process.env.INVITATION_GUESTS,
  );
  const headers = { 'Cache-Control': 'private, no-store' };
  if (guest?.rsvpMetadataId === undefined) {
    return Response.json(
      { error: 'Buka kembali link undangan pribadi Anda.' },
      { status: 403, headers },
    );
  }
  if (!isRsvpStorageConfigured()) {
    return Response.json(
      { error: 'Penyimpanan RSVP belum tersedia.' },
      { status: 503, headers },
    );
  }
  try {
    const response = await readRsvp(guest.rsvpMetadataId);
    return Response.json({ response: response ?? null }, { headers });
  } catch {
    return Response.json(
      { error: 'Jawaban sebelumnya belum bisa dimuat.' },
      { status: 502, headers },
    );
  }
}

export async function POST(request: Request) {
  if (
    request.headers.get('content-type')?.split(';')[0] !== 'application/json'
  ) {
    return Response.json(
      { error: 'Format jawaban tidak valid.' },
      { status: 415 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: 'Format jawaban tidak valid.' },
      { status: 400 },
    );
  }
  if (!body || typeof body !== 'object') {
    return Response.json(
      { error: 'Format jawaban tidak valid.' },
      { status: 400 },
    );
  }

  const { code } = body as Record<string, unknown>;
  const guest = resolveGuest(
    typeof code === 'string' ? code : undefined,
    process.env.INVITATION_GUESTS,
  );
  if (guest?.rsvpMetadataId === undefined) {
    return Response.json(
      { error: 'Buka kembali link undangan pribadi Anda.' },
      { status: 403 },
    );
  }
  const response = parseRsvpResponse(body);
  if (!response) {
    return Response.json(
      { error: 'Periksa kembali data konfirmasi Anda.' },
      { status: 400 },
    );
  }
  if (!isRsvpStorageConfigured()) {
    return Response.json(
      { error: 'Penyimpanan RSVP belum tersedia.' },
      { status: 503 },
    );
  }

  try {
    await saveRsvp(guest.rsvpMetadataId, guest.name, response);
    return Response.json(response);
  } catch {
    return Response.json(
      { error: 'Jawaban belum berhasil disimpan. Silakan coba lagi.' },
      { status: 502 },
    );
  }
}
