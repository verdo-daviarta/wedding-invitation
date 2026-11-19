import { CoverPage } from '@/features/cover/cover-page';
import { resolveGuestName } from '@/features/cover/guest-name';

export const dynamic = 'force-dynamic';

export default async function Page({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const guestName = resolveGuestName(code, process.env.INVITATION_GUESTS);

  return <CoverPage guestName={guestName} />;
}
