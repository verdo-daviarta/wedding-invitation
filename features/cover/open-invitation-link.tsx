'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useMusic } from '../invitation/music/music-provider';
import { startInvitationMusic } from '../invitation/lib/start-invitation-music';

export function OpenInvitationLink({ className }: { className: string }) {
  const { startMusic } = useMusic();

  return (
    <Link
      className={className}
      href="/undangan"
      data-open-invitation
      onClick={(event) => startInvitationMusic(event, startMusic)}
    >
      Buka Undangan
      <ArrowRight size={17} aria-hidden="true" />
    </Link>
  );
}
