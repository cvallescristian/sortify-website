'use client';

import React, { ReactNode } from 'react';
import { useSession } from '@/contexts/SessionContext';
import { useRouter } from 'next/navigation';
import styles from './ProtectedRoute.module.scss';

interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  fallback 
}) => {
  const { isLoggedIn, isLoading, sessionStatus } = useSession();
  const router = useRouter();

  // Show loading state while checking session
  if (isLoading) {
    return fallback || (
      <div className={styles.container}>
        <div className={styles.loadingContent}>
          <div className={styles.spinner}></div>
          <div className={styles.message}>Checking session...</div>
          <div className={styles.subtitle}>Please wait</div>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isLoggedIn) {
    router.push('/login');
    return null;
  }

  // Show loading if session is being validated
  if (sessionStatus === null) {
    return fallback || (
      <div className={styles.container}>
        <div className={styles.loadingContent}>
          <div className={styles.spinner}></div>
          <div className={styles.message}>Validating session...</div>
          <div className={styles.subtitle}>Please wait</div>
        </div>
      </div>
    );
  }

  // Show children if authenticated and session is valid
  return <>{children}</>;
};
