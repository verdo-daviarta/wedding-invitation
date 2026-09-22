'use client';

import { useEffect, useState } from 'react';
import styles from './undangan.module.css';

const WEDDING_TIME = new Date('2026-12-26T08:00:00+07:00').getTime();

type CountdownValue = {
  label: string;
  value: number;
};

function getCountdown(): CountdownValue[] {
  const remaining = Math.max(WEDDING_TIME - Date.now(), 0);

  return [
    { label: 'Days', value: Math.floor(remaining / 86_400_000) },
    { label: 'Hours', value: Math.floor((remaining / 3_600_000) % 24) },
    { label: 'Minutes', value: Math.floor((remaining / 60_000) % 60) },
    { label: 'Seconds', value: Math.floor((remaining / 1_000) % 60) },
  ];
}

const emptyCountdown = ['Days', 'Hours', 'Minutes', 'Seconds'].map((label) => ({
  label,
  value: 0,
}));

export function Countdown() {
  const [countdown, setCountdown] = useState<CountdownValue[]>(emptyCountdown);

  useEffect(() => {
    let timer: number | undefined;

    const updateCountdown = () => {
      setCountdown(getCountdown());

      if (Date.now() >= WEDDING_TIME && timer !== undefined) {
        window.clearInterval(timer);
        timer = undefined;
      }
    };

    updateCountdown();
    if (Date.now() < WEDDING_TIME) {
      timer = window.setInterval(updateCountdown, 1_000);
    }

    return () => {
      if (timer !== undefined) {
        window.clearInterval(timer);
      }
    };
  }, []);

  return (
    <div className={styles.countdown} aria-label="Hitung mundur menuju pernikahan">
      {countdown.map(({ label, value }) => (
        <div key={label}>
          <strong>{String(value).padStart(2, '0')}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
