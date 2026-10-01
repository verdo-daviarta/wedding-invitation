export type Wish = {
  id: string;
  name: string;
  message: string;
  timeLabel: string;
};

export const MAX_NAME_LENGTH = 80;
export const MAX_WISH_LENGTH = 150;
export const WISH_SUBMISSION_KEY = 'verdo-intan:wish-submission:v1';
export const WISH_STORAGE_EVENT = 'verdo-intan:wish-storage-change';

export const sanitizeAlphanumeric = (value: string, maxLength: number) =>
  value
    .normalize('NFKC')
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, '')
    .replace(/<[^>]*>/g, '')
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .slice(0, maxLength);

export const normalizeSubmittedText = (value: string) =>
  value
    .trim()
    .replace(/[\t ]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n');

export const parseStoredWish = (
  savedSubmission: string | null,
): Wish | null => {
  if (!savedSubmission) return null;

  try {
    const parsedSubmission = JSON.parse(savedSubmission) as {
      name?: unknown;
      message?: unknown;
    };

    if (
      !parsedSubmission ||
      typeof parsedSubmission.name !== 'string' ||
      typeof parsedSubmission.message !== 'string'
    ) {
      return null;
    }

    const savedName = normalizeSubmittedText(
      sanitizeAlphanumeric(parsedSubmission.name, MAX_NAME_LENGTH),
    );
    const savedMessage = normalizeSubmittedText(
      sanitizeAlphanumeric(parsedSubmission.message, MAX_WISH_LENGTH),
    );

    if (!savedName || !savedMessage) return null;

    return {
      id: 'saved-guest-wish',
      name: savedName,
      message: savedMessage,
      timeLabel: 'ucapan Anda',
    };
  } catch {
    return null;
  }
};

export const initialWishes: Wish[] = [
  {
    id: 'keluarga-sahabat',
    name: 'Keluarga & Sahabat',
    message:
      'Semoga hari bahagia ini menjadi awal perjalanan yang penuh kasih, damai, dan sukacita.',
    timeLabel: 'baru saja',
  },
  {
    id: 'teman-teman',
    name: 'Teman-teman',
    message:
      'Selamat menempuh hidup baru. Semoga selalu saling menjaga dan bertumbuh bersama.',
    timeLabel: 'beberapa menit lalu',
  },
  {
    id: 'orang-terkasih',
    name: 'Orang Terkasih',
    message:
      'Bahagia selalu sampai tua, dan semoga rumah tangga kalian dipenuhi kebaikan.',
    timeLabel: 'hari ini',
  },
];
