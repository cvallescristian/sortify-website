import styles from './AuthCallbackMessage.module.scss';

interface AuthCallbackMessageProps {
  status: 'loading' | 'success' | 'error';
  message: string;
}

export default function AuthCallbackMessage({ status, message }: AuthCallbackMessageProps) {
  const getStatusIcon = () => {
    switch (status) {
      case 'loading': return '🔄';
      case 'success': return '✅';
      case 'error': return '❌';
      default: return '';
    }
  };

  return (
    <div className={styles.authCallbackMessage}>
      <div className={styles.authCallbackMessage__container}>
        <h1 className={styles.authCallbackMessage__icon}>
          {getStatusIcon()}
        </h1>
        <p className={styles.authCallbackMessage__text}>
          {message}
        </p>
      </div>
    </div>
  );
}
