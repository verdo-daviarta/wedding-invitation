import styles from '../styles/invitation.module.css';

export function InertButton({
  children,
  className = '',
  ariaLabel,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}>) {
  return (
    <button
      aria-label={ariaLabel}
      className={`${styles.button} ${className}`}
      type="button"
      disabled
    >
      {children}
    </button>
  );
}
