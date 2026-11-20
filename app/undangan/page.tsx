import type { Metadata } from 'next';
import { resolveGuest } from '@/features/cover/guest-name';
import { InvitationPage } from '@/features/invitation/invitation-page';
import { isRsvpStorageConfigured } from '@/features/invitation/sections/07-rsvp/rsvp-sheets';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ i?: string | string[] }>;
}) {
  const { i } = await searchParams;
  const guest = resolveGuest(i, process.env.INVITATION_GUESTS);
  const metadataId = guest?.rsvpMetadataId;
  if (!guest || typeof i !== 'string' || metadataId === undefined) {
    return <InvitationPage />;
  }
  return (
    <InvitationPage
      rsvp={{ code: i, name: guest.name, available: isRsvpStorageConfigured() }}
    />
  );
}
