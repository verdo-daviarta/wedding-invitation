'use client';

import { useEffect, useRef, useState, type SyntheticEvent } from 'react';
import { GuestCountSelect } from './guest-count-select';
import styles from '../../styles/invitation.module.css';
import type { RsvpGuest } from './rsvp-section';
import {
  attendanceOptions,
  type Attendance,
  type RsvpResponse,
} from './rsvp-response';

export function RsvpForm({ guest }: { guest: RsvpGuest }) {
  const [attendance, setAttendance] = useState<Attendance | ''>('');
  const [guestCount, setGuestCount] = useState('1');
  const [note, setNote] = useState('');
  const [confirmation, setConfirmation] = useState<RsvpResponse>();
  const [isLoading, setIsLoading] = useState(guest.available);
  const [loadFailed, setLoadFailed] = useState(false);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!guest.available) return;
    const request = new AbortController();

    async function loadResponse() {
      try {
        const result = await fetch(
          `/api/rsvp?i=${encodeURIComponent(guest.code)}`,
          {
            cache: 'no-store',
            signal: AbortSignal.any([
              request.signal,
              AbortSignal.timeout(12_000),
            ]),
          },
        );
        if (!result.ok) throw new Error('RSVP lookup failed');
        const { response } = (await result.json()) as {
          response: RsvpResponse | null;
        };
        if (request.signal.aborted || !response) return;
        setAttendance(response.attendance);
        setGuestCount(response.guestCount === 2 ? '2' : '1');
        setNote(response.note);
        setConfirmation(response);
      } catch {
        if (!request.signal.aborted) setLoadFailed(true);
      } finally {
        if (!request.signal.aborted) setIsLoading(false);
      }
    }

    void loadResponse();
    return () => request.abort();
  }, [guest.available, guest.code]);

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading || isSaving || !guest.available) return;

    if (!attendance) {
      setError('Silakan pilih status kehadiran Anda.');
      event.currentTarget
        .querySelector<HTMLInputElement>('[name="attendance"]')
        ?.focus();
      return;
    }

    setError('');
    setIsSaving(true);
    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: guest.code,
          attendance,
          guestCount: Number(guestCount),
          note,
        }),
      });
      if (!response.ok) {
        const result = (await response.json()) as { error: string };
        setError(result.error);
        return;
      }
      setConfirmation((await response.json()) as RsvpResponse);
    } catch {
      setError('Jawaban belum berhasil disimpan. Silakan coba lagi.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <output className={styles.formCard}>
        Memuat jawaban RSVP {guest.name}…
      </output>
    );
  }

  if (confirmation) {
    return (
      <div
        className={`${styles.formCard} ${styles.rsvpSuccess}`}
        aria-live="polite"
      >
        <span className={styles.successMark} aria-hidden="true">
          ✓
        </span>
        <p className={styles.successEyebrow}>Jawaban tersimpan</p>
        <h3
          tabIndex={-1}
          ref={(element) => {
            element?.focus({ preventScroll: true });
          }}
        >
          Terima kasih, {guest.name}
        </h3>
        <p>
          Status kehadiran: <strong>{confirmation.attendance}</strong>
        </p>
        {confirmation.guestCount > 0 && (
          <p>Jumlah tamu: {confirmation.guestCount} orang</p>
        )}
        {confirmation.note && <p>Catatan: {confirmation.note}</p>}
        <button
          className={styles.editResponseButton}
          onClick={() => {
            setConfirmation(undefined);
            window.requestAnimationFrame(() =>
              nameInputRef.current?.focus({ preventScroll: true }),
            );
          }}
          type="button"
        >
          Ubah Jawaban
        </button>
      </div>
    );
  }

  return (
    <form className={styles.formCard} onSubmit={handleSubmit} noValidate>
      <label className={styles.formField}>
        <span className={styles.fieldLabel}>
          Nama lengkap <b>*</b>
        </span>
        <input
          ref={nameInputRef}
          name="name"
          readOnly
          type="text"
          value={guest.name}
        />
      </label>

      <fieldset
        className={styles.attendanceGroup}
        aria-describedby={error && !attendance ? 'rsvp-error' : undefined}
      >
        <legend className={styles.fieldLabel}>
          Konfirmasi kehadiran <b>*</b>
        </legend>
        <div className={styles.attendanceOptions}>
          {attendanceOptions.map((option) => (
            <label className={styles.attendanceOption} key={option}>
              <input
                checked={attendance === option}
                name="attendance"
                onChange={() => {
                  setAttendance(option);
                }}
                required
                type="radio"
                value={option}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {attendance === 'Hadir' && (
        <div className={`${styles.formField} ${styles.guestField}`}>
          <span className={styles.fieldLabel} id="guest-count-label">
            Jumlah tamu
          </span>
          <GuestCountSelect value={guestCount} onChange={setGuestCount} />
          <span className={styles.guestNote}>
            <span aria-hidden="true">i</span>
            Lebih dari 2 orang? Silakan hubungi contact person yang tersedia.
          </span>
        </div>
      )}

      <label className={styles.formField}>
        <span className={styles.fieldLabel}>Catatan tambahan</span>
        <textarea
          name="note"
          maxLength={500}
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="Kebutuhan khusus atau pesan untuk mempelai"
          rows={3}
        />
      </label>

      {error && (
        <p className={styles.formError} id="rsvp-error" role="alert">
          {error}
        </p>
      )}

      {!guest.available && (
        <p className={styles.formNotice}>Penyimpanan RSVP belum tersedia.</p>
      )}
      {loadFailed && (
        <p className={styles.formNotice}>
          Jawaban sebelumnya belum bisa dimuat.
        </p>
      )}

      <button
        className={styles.submitButton}
        type="submit"
        disabled={isSaving || !guest.available}
      >
        {isSaving ? 'Menyimpan…' : 'Kirim Konfirmasi'}
      </button>
    </form>
  );
}
