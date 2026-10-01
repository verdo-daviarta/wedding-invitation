import styles from '../styles/invitation.module.css';
import { Camera } from 'lucide-react';

export function PhotoPlaceholder({
  label,
  className = '',
}: Readonly<{ label: string; className?: string }>) {
  return (
    <div
      className={`${styles.photoPlaceholder} ${className}`}
      aria-label={label}
    >
      <Camera aria-hidden="true" size={22} />
      <span>{label}</span>
    </div>
  );
}
