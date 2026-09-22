'use client';

import { SyntheticEvent, useMemo, useState, useSyncExternalStore } from 'react';
import { CircleCheck, Heart, Send } from 'lucide-react';
import styles from './undangan.module.css';

type Wish = {
  id: string;
  name: string;
  message: string;
  timeLabel: string;
};

const MAX_NAME_LENGTH = 80;
const MAX_WISH_LENGTH = 150;
const WISH_SUBMISSION_KEY = 'verdo-intan:wish-submission:v1';
const WISH_STORAGE_EVENT = 'verdo-intan:wish-storage-change';

const sanitizeAlphanumeric = (value: string, maxLength: number) =>
  value
    .normalize('NFKC')
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .slice(0, maxLength);

const normalizeSubmittedText = (value: string) =>
  value
    .trim()
    .replace(/[\t ]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n');

const readWishSubmission = () => {
  try {
    return window.localStorage.getItem(WISH_SUBMISSION_KEY);
  } catch {
    return null;
  }
};

const subscribeToWishSubmission = (notify: () => void) => {
  const notifyFromStorage = (event: StorageEvent) => {
    if (event.key === WISH_SUBMISSION_KEY) notify();
  };

  window.addEventListener('storage', notifyFromStorage);
  window.addEventListener(WISH_STORAGE_EVENT, notify);

  return () => {
    window.removeEventListener('storage', notifyFromStorage);
    window.removeEventListener(WISH_STORAGE_EVENT, notify);
  };
};

const parseStoredWish = (savedSubmission: string | null): Wish | null => {
  if (!savedSubmission) return null;

  try {
    const parsedSubmission = JSON.parse(savedSubmission) as {
      name?: unknown;
      message?: unknown;
    };

    if (
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

const initialWishes: Wish[] = [
  {
    id: 'keluarga-sahabat',
    name: 'Keluarga & Sahabat',
    message: 'Semoga hari bahagia ini menjadi awal perjalanan yang penuh kasih, damai, dan sukacita.',
    timeLabel: 'baru saja',
  },
  {
    id: 'teman-teman',
    name: 'Teman-teman',
    message: 'Selamat menempuh hidup baru. Semoga selalu saling menjaga dan bertumbuh bersama.',
    timeLabel: 'beberapa menit lalu',
  },
  {
    id: 'orang-terkasih',
    name: 'Orang Terkasih',
    message: 'Bahagia selalu sampai tua, dan semoga rumah tangga kalian dipenuhi kebaikan.',
    timeLabel: 'hari ini',
  },
];

export function WishesForm() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [likedWishIds, setLikedWishIds] = useState<Set<string>>(() => new Set());
  const [error, setError] = useState('');
  const savedSubmission = useSyncExternalStore(
    subscribeToWishSubmission,
    readWishSubmission,
    () => null,
  );
  const savedWish = useMemo(() => parseStoredWish(savedSubmission), [savedSubmission]);
  const hasSubmitted = Boolean(savedWish);
  const visibleWishes = useMemo(
    () => savedWish
      ? [savedWish, ...initialWishes.filter((wish) => wish.id !== savedWish.id)].slice(0, 3)
      : initialWishes.slice(0, 3),
    [savedWish],
  );

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = normalizeSubmittedText(
      sanitizeAlphanumeric(name, MAX_NAME_LENGTH),
    );
    const trimmedMessage = normalizeSubmittedText(
      sanitizeAlphanumeric(message, MAX_WISH_LENGTH),
    );

    if (!trimmedName || !trimmedMessage) {
      setError('Silakan lengkapi nama dan ucapan Anda.');
      return;
    }

    if (parseStoredWish(readWishSubmission())) {
      window.dispatchEvent(new Event(WISH_STORAGE_EVENT));
      setError('');
      return;
    }

    try {
      window.localStorage.setItem(
        WISH_SUBMISSION_KEY,
        JSON.stringify({
          name: trimmedName,
          message: trimmedMessage,
          submittedAt: new Date().toISOString(),
        }),
      );
    } catch {
      setError('Ucapan belum dapat dikirim. Silakan aktifkan penyimpanan browser dan coba kembali.');
      return;
    }

    window.dispatchEvent(new Event(WISH_STORAGE_EVENT));
    setName('');
    setMessage('');
    setError('');
  };

  const clearFeedback = () => {
    if (error) setError('');
  };

  const toggleLike = (wishId: string) => {
    setLikedWishIds((currentIds) => {
      const nextIds = new Set(currentIds);
      if (nextIds.has(wishId)) nextIds.delete(wishId);
      else nextIds.add(wishId);
      return nextIds;
    });
  };

  return (
    <div className={styles.wishesContent}>
      {hasSubmitted ? (
        <output className={`${styles.wishForm} ${styles.wishSubmitted}`}>
          <CircleCheck aria-hidden="true" size={28} />
          <div>
            <strong>Ucapan Anda sudah terkirim</strong>
            <p>Setiap undangan hanya dapat mengirim satu ucapan.</p>
          </div>
        </output>
      ) : (
        <form className={styles.wishForm} onSubmit={handleSubmit} noValidate>
          <label className={styles.wishField}>
            <span>Nama <b>*</b></span>
            <input
              autoComplete="name"
              maxLength={MAX_NAME_LENGTH}
              name="wishName"
              onChange={(event) => {
                setName(sanitizeAlphanumeric(event.target.value, MAX_NAME_LENGTH));
                clearFeedback();
              }}
              placeholder="Tuliskan nama Anda"
              required
              type="text"
              value={name}
            />
          </label>

          <label className={styles.wishField}>
            <span>Ucapan dan doa <b>*</b></span>
            <textarea
              maxLength={MAX_WISH_LENGTH}
              name="wishMessage"
              onChange={(event) => {
                setMessage(sanitizeAlphanumeric(event.target.value, MAX_WISH_LENGTH));
                clearFeedback();
              }}
              placeholder="Tuliskan ucapan hangat untuk Verdo & Intan"
              required
              rows={4}
              value={message}
            />
            <small>{message.length}/{MAX_WISH_LENGTH}</small>
          </label>

          {error && <p className={styles.wishError} role="alert">{error}</p>}

          <button className={styles.wishSubmitButton} type="submit">
            Kirim Ucapan
            <Send aria-hidden="true" size={16} />
          </button>
        </form>
      )}

      <div className={styles.latestWishes}>
        <div className={styles.latestWishesHeading}>
          <span>Ucapan Terbaru</span>
        </div>

        <div className={styles.wishList} aria-live="polite">
          {visibleWishes.map((wish) => {
            const isLiked = likedWishIds.has(wish.id);

            return (
              <article key={wish.id}>
                <div className={styles.wishMeta}>
                  <div className={styles.wishAuthor}>
                    <span className={styles.wishAvatar} aria-hidden="true">
                      {wish.name.charAt(0).toUpperCase()}
                    </span>
                    <strong>{wish.name}</strong>
                  </div>
                  <time>{wish.timeLabel}</time>
                </div>
                <p>{wish.message}</p>
                <button
                  aria-label={
                    isLiked
                      ? `Batalkan like ucapan dari ${wish.name}`
                      : `Like ucapan dari ${wish.name}`
                  }
                  aria-pressed={isLiked}
                  className={styles.wishLikeButton}
                  data-liked={isLiked}
                  onClick={() => toggleLike(wish.id)}
                  type="button"
                >
                  <Heart aria-hidden="true" size={14} />
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
