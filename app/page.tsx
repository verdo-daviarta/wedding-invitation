import { CoverPage } from '@/features/cover/cover-page';
import { resolveGuestName } from '@/features/cover/guest-name';

export const dynamic = 'force-dynamic';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ i?: string | string[] }>;
}) {
  const { i } = await searchParams;
  const guestName = resolveGuestName(i, process.env.INVITATION_GUESTS);

  return (
    <CoverPage
      guestName={guestName}
      invitationCode={guestName && typeof i === 'string' ? i : undefined}
    />
  );
}
