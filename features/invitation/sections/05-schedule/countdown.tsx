'use client';

import { useEffect, useState } from 'react';
import styles from '../../styles/invitation.module.css';

import { invitation } from '../../data/wedding';
import { getCountdown } from '../../lib/event-time';

const WEDDING_TIME = new Date(invitation.startsAt).getTime();
type CountdownValue = ReturnType<typeof getCountdown>[number];

const emptyCountdown = ['Days', 'Hours', 'Minutes', 'Seconds'].map((label) => ({
  label,
  value: 0,
}));

export function Countdown() {
  const [countdown, setCountdown] = useState<CountdownValue[]>(emptyCountdown);

  useEffect(() => {
    let timer: number | undefined;

    const updateCountdown = () => {
      setCountdown(getCountdown(WEDDING_TIME, Date.now()));

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
    <div
      className={styles.countdown}
      aria-label="Hitung mundur menuju pernikahan"
    >
      {countdown.map(({ label, value }) => (
        <div key={label}>
          <strong>{String(value).padStart(2, '0')}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
