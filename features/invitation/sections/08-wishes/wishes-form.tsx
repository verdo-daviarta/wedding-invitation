'use client';

import { SyntheticEvent, useMemo, useState, useSyncExternalStore } from 'react';
import { CircleCheck, Heart, Send } from 'lucide-react';
import styles from '../../styles/invitation.module.css';

import {
  MAX_NAME_LENGTH,
  MAX_WISH_LENGTH,
  WISH_SUBMISSION_KEY,
  WISH_STORAGE_EVENT,
  sanitizeAlphanumeric,
  normalizeSubmittedText,
  parseStoredWish,
  initialWishes,
} from './wish-model';
import { readWishSubmission, subscribeToWishSubmission } from './wish-storage';

export function WishesForm() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [likedWishIds, setLikedWishIds] = useState<Set<string>>(
    () => new Set(),
  );
  const [error, setError] = useState('');
  const savedSubmission = useSyncExternalStore(
    subscribeToWishSubmission,
    readWishSubmission,
    () => null,
  );
  const savedWish = useMemo(
    () => parseStoredWish(savedSubmission),
    [savedSubmission],
  );
  const hasSubmitted = Boolean(savedWish);
  const visibleWishes = useMemo(
    () =>
      savedWish
        ? [
            savedWish,
            ...initialWishes.filter((wish) => wish.id !== savedWish.id),
          ].slice(0, 3)
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
      setError(
        'Ucapan belum dapat disimpan. Silakan aktifkan penyimpanan browser dan coba kembali.',
      );
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
            <strong>Ucapan tersimpan di browser ini</strong>
            <p>
              Ucapan ini belum dikirim ke mempelai. Untuk sementara, satu ucapan
              per browser.
            </p>
          </div>
        </output>
      ) : (
        <form className={styles.wishForm} onSubmit={handleSubmit} noValidate>
          {/* <p className={styles.formNotice}>
            Pratinjau: ucapan hanya tersimpan di browser ini. Daftar awal berisi
            contoh ucapan.
          </p> */}
          <label className={styles.wishField}>
            <span>
              Nama <b>*</b>
            </span>
            <input
              autoComplete="name"
              maxLength={MAX_NAME_LENGTH}
              aria-invalid={Boolean(error && !name.trim())}
              aria-describedby={error ? 'wish-error' : undefined}
              name="wishName"
              onChange={(event) => {
                setName(
                  sanitizeAlphanumeric(event.target.value, MAX_NAME_LENGTH),
                );
                clearFeedback();
              }}
              placeholder="Tuliskan nama Anda"
              required
              type="text"
              value={name}
            />
          </label>

          <label className={styles.wishField}>
            <span>
              Ucapan dan doa <b>*</b>
            </span>
            <textarea
              maxLength={MAX_WISH_LENGTH}
              aria-invalid={Boolean(error && !message.trim())}
              aria-describedby={error ? 'wish-error' : undefined}
              name="wishMessage"
              onChange={(event) => {
                setMessage(
                  sanitizeAlphanumeric(event.target.value, MAX_WISH_LENGTH),
                );
                clearFeedback();
              }}
              placeholder="Tuliskan ucapan hangat untuk Verdo & Intan"
              required
              rows={4}
              value={message}
            />
            <small>
              {message.length}/{MAX_WISH_LENGTH}
            </small>
          </label>

          {error && (
            <p className={styles.wishError} id="wish-error" role="alert">
              {error}
            </p>
          )}

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
                  <span className={styles.wishTime}>{wish.timeLabel}</span>
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
