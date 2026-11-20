import type { Metadata } from 'next';
import { CoverPage } from '@/features/cover/cover-page';
import { resolveGuestName } from '@/features/cover/guest-name';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function Page({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const guestName = resolveGuestName(code, process.env.INVITATION_GUESTS);

  return (
    <CoverPage
      guestName={guestName}
      invitationCode={guestName ? code : undefined}
    />
  );
}
