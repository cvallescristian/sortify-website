import styles from './Loading.module.scss';

interface LoadingProps {
  message?: string;
}

export default function Loading({ message = 'Loading...' }: LoadingProps) {
  return (
    <div className={styles.loading}>
      <p className={styles.loading__text}>{message}</p>
    </div>
  );
}
