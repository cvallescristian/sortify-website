import styles from './Loading.module.scss';

export default function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingSpinner}></div>
      <p className={styles.loadingText}>Loading playlist details...</p>
    </div>
  );
}
