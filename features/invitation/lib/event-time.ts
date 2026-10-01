/** UTC format expected by Google Calendar, independent of the visitor's timezone. */
export function toCalendarTimestamp(isoDate: string): string {
  return new Date(isoDate)
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}Z$/, 'Z');
}

export function getCountdown(targetTime: number, now: number) {
  const remaining = Math.max(targetTime - now, 0);
  return [
    { label: 'Days', value: Math.floor(remaining / 86_400_000) },
    { label: 'Hours', value: Math.floor((remaining / 3_600_000) % 24) },
    { label: 'Minutes', value: Math.floor((remaining / 60_000) % 60) },
    { label: 'Seconds', value: Math.floor((remaining / 1_000) % 60) },
  ];
}
