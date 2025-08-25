'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from '@/contexts/SessionContext';
import { sessionValidationService } from '@/services/sessionValidation';
import styles from './SessionBanner.module.scss';

export const SessionBanner: React.FC = () => {
  const { sessionStatus, logout, refreshSession } = useSession();
  const [timeUntilExpiry, setTimeUntilExpiry] = useState<number | undefined>();

  useEffect(() => {
    if (!sessionStatus?.timeUntilExpiry) return;

    setTimeUntilExpiry(sessionStatus.timeUntilExpiry);

    const interval = setInterval(() => {
      setTimeUntilExpiry((prev) => {
        if (prev && prev > 0) {
          return prev - 1000;
        }
        return 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [sessionStatus?.timeUntilExpiry]);

  if (!sessionStatus || (!sessionStatus.isExpiringSoon && !sessionStatus.isExpired)) {
    return null;
  }

  const handleRefresh = async () => {
    await refreshSession();
  };

  const handleLogout = () => {
    logout();
  };

  const getBannerClass = () => {
    if (sessionStatus.isExpired) return styles.expired;
    if (sessionStatus.isExpiringSoon) return styles.warning;
    return '';
  };

  const getMessage = () => {
    if (sessionStatus.isExpired) {
      return 'Your session has expired. Please log in again.';
    }
    return 'Your session is expiring soon. Please refresh to continue.';
  };

  return (
    <div className={`${styles.sessionBanner} ${getBannerClass()}`}>
      <div className={styles.content}>
        <span className={styles.message}>{getMessage()}</span>
        
        {timeUntilExpiry !== undefined && timeUntilExpiry > 0 && (
          <span className={styles.timer}>
            {sessionValidationService.formatTimeUntilExpiry(timeUntilExpiry)}
          </span>
        )}

        <div className={styles.actions}>
          {!sessionStatus.isExpired && (
            <button 
              className={`${styles.button} ${styles.primary}`}
              onClick={handleRefresh}
            >
              Refresh Session
            </button>
          )}
          <button 
            className={styles.button}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
