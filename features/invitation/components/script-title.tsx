import styles from '../styles/invitation.module.css';

export function ScriptTitle({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <h2 className={styles.scriptTitle}>{children}</h2>;
}
