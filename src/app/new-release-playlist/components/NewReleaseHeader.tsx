import styles from './NewReleaseHeader.module.scss';

export default function NewReleaseHeader() {
  return (
    <div className={styles.header}>
      <h2 className={styles.title}>Select Releases</h2>
      <p className={styles.subtitle}>
        Choose the latest releases you want to include in your playlist
      </p>
    </div>
  );
}
