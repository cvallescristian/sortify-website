'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { sessionUtils } from '@/utils/session';
import { sessionValidationService, SessionStatus } from '@/services/sessionValidation';

interface SessionContextType {
  sessionStatus: SessionStatus | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  logout: () => void;
  refreshSession: () => Promise<void>;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};

interface SessionProviderProps {
  children: ReactNode;
}

export const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
  const [sessionStatus, setSessionStatus] = useState<SessionStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const isLoggedIn = sessionUtils.isLoggedIn();

  const logout = useCallback(() => {
    sessionUtils.clearSession();
    setSessionStatus(null);
    router.push('/login');
  }, [router]);

  const refreshSession = useCallback(async () => {
    if (!isLoggedIn) {
      setIsLoading(false);
      return;
    }

    try {
      const status = await sessionValidationService.getCurrentSessionStatus();
      setSessionStatus(status);
      
      // If session is expired, redirect to login
      if (status?.isExpired) {
        logout();
      }
    } catch (error) {
      console.error('Error refreshing session:', error);
      logout();
    } finally {
      setIsLoading(false);
    }
  }, [isLoggedIn, logout]);

  useEffect(() => {
    refreshSession();

    // Start session monitoring
    const cleanup = sessionValidationService.startSessionMonitoring((status) => {
      setSessionStatus(status);
      
      // Auto-logout if session is expired
      if (status?.isExpired) {
        logout();
      }
    });

    return cleanup;
  }, [isLoggedIn, logout, refreshSession]);

  const value: SessionContextType = {
    sessionStatus,
    isLoading,
    isLoggedIn,
    logout,
    refreshSession,
  };

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
};
