import { Check, X, Loader2 } from 'lucide-react';
import styles from './AuthCallbackMessage.module.scss';

interface AuthCallbackMessageProps {
  status: 'loading' | 'success' | 'error';
  message: string;
}

export default function AuthCallbackMessage({ status, message }: AuthCallbackMessageProps) {
  const getStatusIcon = () => {
    switch (status) {
      case 'loading': return <Loader2 className={styles.spinningIcon} size={24} />;
      case 'success': return <Check size={24} />;
      case 'error': return <X size={24} />;
      default: return null;
    }
  };

  return (
    <div className={styles.authCallbackMessage}>
      <div className={styles.authCallbackMessage__container}>
        <div className={styles.authCallbackMessage__icon}>
          {getStatusIcon()}
        </div>
        <p className={styles.authCallbackMessage__text}>
          {message}
        </p>
      </div>
    </div>
  );
}
