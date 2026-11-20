export const attendanceOptions = [
  'Hadir',
  'Tidak Hadir',
  'Belum Pasti',
] as const;
export type Attendance = (typeof attendanceOptions)[number];

export type RsvpResponse = {
  attendance: Attendance;
  guestCount: number;
  note: string;
};

export function parseRsvpResponse(value: unknown): RsvpResponse | undefined {
  if (!value || typeof value !== 'object') return;
  const { attendance, guestCount, note } = value as Record<string, unknown>;
  const status = attendanceOptions.find((option) => option === attendance);
  if (!status || typeof note !== 'string' || note.length > 500) return;
  const count = status === 'Hadir' ? guestCount : 0;
  if (count !== 1 && count !== 2 && (count !== 0 || status === 'Hadir')) return;

  return {
    attendance: status,
    guestCount: count,
    note: note.trim(),
  };
}
