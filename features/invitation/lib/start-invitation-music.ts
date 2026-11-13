type InvitationClick = Pick<
  MouseEvent,
  'defaultPrevented' | 'button' | 'metaKey' | 'ctrlKey' | 'shiftKey' | 'altKey'
>;

/** Keep play inside the native click gesture without delaying client routing. */
export function startInvitationMusic(
  event: InvitationClick,
  startMusic: () => Promise<void>,
): void {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return;
  }
  void startMusic();
}
