'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import styles from './undangan.module.css';

const attendanceOptions = ['Hadir', 'Tidak Hadir', 'Belum Pasti'] as const;
const guestOptions = [
  { label: '1 Orang', value: '1' },
  { label: '2 Orang', value: '2' },
] as const;

type Attendance = (typeof attendanceOptions)[number];
type Confirmation = {
  name: string;
  attendance: Attendance;
};

export function RsvpForm() {
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState<Attendance | ''>('');
  const [guestCount, setGuestCount] = useState('1');
  const [guestMenuOpen, setGuestMenuOpen] = useState(false);
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);
  const [error, setError] = useState('');
  const guestSelectRef = useRef<HTMLDivElement>(null);
  const guestTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!guestMenuOpen) return;

    const closeFromOutside = (event: PointerEvent) => {
      if (!guestSelectRef.current?.contains(event.target as Node)) {
        setGuestMenuOpen(false);
      }
    };

    const closeFromKeyboard = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setGuestMenuOpen(false);
        guestTriggerRef.current?.focus();
      }
    };

    document.addEventListener('pointerdown', closeFromOutside);
    document.addEventListener('keydown', closeFromKeyboard);

    return () => {
      document.removeEventListener('pointerdown', closeFromOutside);
      document.removeEventListener('keydown', closeFromKeyboard);
    };
  }, [guestMenuOpen]);

  const selectGuestCount = (value: string) => {
    setGuestCount(value);
    setGuestMenuOpen(false);
    window.requestAnimationFrame(() => guestTriggerRef.current?.focus());
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    if (!trimmedName) {
      setError('Silakan isi nama lengkap Anda.');
      return;
    }

    if (!attendance) {
      setError('Silakan pilih status kehadiran Anda.');
      return;
    }

    setError('');
    setConfirmation({ name: trimmedName, attendance });
  };

  if (confirmation) {
    return (
      <div className={`${styles.formCard} ${styles.rsvpSuccess}`} role="status">
        <span className={styles.successMark} aria-hidden="true">✓</span>
        <p className={styles.successEyebrow}>Konfirmasi diterima</p>
        <h3>Terima kasih, {confirmation.name}</h3>
        <p>
          Jawaban <strong>{confirmation.attendance}</strong> sudah tercatat pada formulir ini.
        </p>
        <button
          className={styles.editResponseButton}
          onClick={() => setConfirmation(null)}
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
        <span className={styles.fieldLabel}>Nama lengkap <b>*</b></span>
        <input
          aria-invalid={Boolean(error && !name.trim())}
          autoComplete="name"
          name="name"
          onChange={(event) => setName(event.target.value)}
          placeholder="Tuliskan nama Anda"
          required
          type="text"
          value={name}
        />
      </label>

      <fieldset className={styles.attendanceGroup}>
        <legend className={styles.fieldLabel}>Konfirmasi kehadiran <b>*</b></legend>
        <div className={styles.attendanceOptions}>
          {attendanceOptions.map((option) => (
            <label className={styles.attendanceOption} key={option}>
              <input
                checked={attendance === option}
                name="attendance"
                onChange={() => {
                  setAttendance(option);
                  if (option !== 'Hadir') setGuestMenuOpen(false);
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
          <span className={styles.fieldLabel} id="guest-count-label">Jumlah tamu</span>
          <div
            className={styles.selectShell}
            data-open={guestMenuOpen}
            ref={guestSelectRef}
          >
            <input name="guestCount" type="hidden" value={guestCount} />
            <button
              aria-controls="guest-count-options"
              aria-expanded={guestMenuOpen}
              aria-haspopup="listbox"
              aria-labelledby="guest-count-label"
              className={styles.guestSelectButton}
              onClick={() => setGuestMenuOpen((isOpen) => !isOpen)}
              ref={guestTriggerRef}
              type="button"
            >
              <span>{guestOptions.find((option) => option.value === guestCount)?.label}</span>
              <span className={styles.selectChevron} aria-hidden="true" />
            </button>

            {guestMenuOpen && (
              <div
                className={styles.guestSelectMenu}
                id="guest-count-options"
                role="listbox"
              >
                {guestOptions.map((option) => (
                  <button
                    aria-selected={guestCount === option.value}
                    className={styles.guestSelectOption}
                    data-selected={guestCount === option.value}
                    key={option.value}
                    onClick={() => selectGuestCount(option.value)}
                    role="option"
                    type="button"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
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
          placeholder="Kebutuhan khusus atau pesan untuk mempelai"
          rows={3}
        />
      </label>

      {error && <p className={styles.formError}>{error}</p>}

      <button className={styles.submitButton} type="submit">
        Kirim Konfirmasi
      </button>
    </form>
  );
}
