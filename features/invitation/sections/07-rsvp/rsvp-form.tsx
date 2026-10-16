'use client';

import { useRef, useState, type SyntheticEvent } from 'react';
import { GuestCountSelect } from './guest-count-select';
import styles from '../../styles/invitation.module.css';

const attendanceOptions = ['Hadir', 'Tidak Hadir', 'Belum Pasti'] as const;
type Attendance = (typeof attendanceOptions)[number];
type Confirmation = {
  name: string;
  attendance: Attendance;
  guestCount: number;
  note: string;
};

export function RsvpForm() {
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState<Attendance | ''>('');
  const [guestCount, setGuestCount] = useState('1');
  const [note, setNote] = useState('');
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);
  const [error, setError] = useState('');
  const nameInputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    if (!trimmedName) {
      setError('Silakan isi nama lengkap Anda.');
      nameInputRef.current?.focus();
      return;
    }

    if (!attendance) {
      setError('Silakan pilih status kehadiran Anda.');
      event.currentTarget
        .querySelector<HTMLInputElement>('[name="attendance"]')
        ?.focus();
      return;
    }

    setError('');
    setConfirmation({
      name: trimmedName,
      attendance,
      guestCount: attendance === 'Hadir' ? Number(guestCount) : 0,
      note: note.trim(),
    });
  };

  if (confirmation) {
    return (
      <div
        className={`${styles.formCard} ${styles.rsvpSuccess}`}
        aria-live="polite"
      >
        <span className={styles.successMark} aria-hidden="true">
          ✓
        </span>
        <p className={styles.successEyebrow}>Jawaban sementara</p>
        <h3
          tabIndex={-1}
          ref={(element) => {
            element?.focus({ preventScroll: true });
          }}
        >
          Terima kasih, {confirmation.name}
        </h3>
        <p>
          Jawaban <strong>{confirmation.attendance}</strong> tersimpan sementara
          pada halaman ini. Jawaban belum dikirim ke mempelai.
        </p>
        {confirmation.guestCount > 0 && (
          <p>Jumlah tamu: {confirmation.guestCount} orang</p>
        )}
        {confirmation.note && <p>Catatan: {confirmation.note}</p>}
        <button
          className={styles.editResponseButton}
          onClick={() => {
            setConfirmation(null);
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
          aria-invalid={Boolean(error && !name.trim())}
          maxLength={80}
          aria-describedby={error ? 'rsvp-error' : undefined}
          autoComplete="name"
          name="name"
          onChange={(event) => setName(event.target.value)}
          placeholder="Tuliskan nama Anda"
          required
          type="text"
          value={name}
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

      {/* <p className={styles.formNotice}>
        Pratinjau: jawaban belum dikirim ke mempelai dan akan hilang jika
        halaman dimuat ulang.
      </p> */}

      <button className={styles.submitButton} type="submit">
        Kirim Konfirmasi
      </button>
    </form>
  );
}
