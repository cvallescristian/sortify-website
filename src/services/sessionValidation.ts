import { sessionUtils } from '@/utils/session';
import { apiService } from './api';
import { SpotifyUser } from '@/types/spotify';

const SESSION_CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutes
const SESSION_EXPIRY_WARNING = 10 * 60 * 1000; // 10 minutes before expiry

export interface SessionStatus {
  sessionId: string;
  user: SpotifyUser;
  isValid: boolean;
  isExpired: boolean;
  isExpiringSoon: boolean;
  expiresAt?: number;
  timeUntilExpiry?: number;
}

export const sessionValidationService = {
  // Check if session is valid by making a test API call
  async validateSession(sessionId: string): Promise<SessionStatus> {
    try {
      const data = await apiService.validateSession(sessionId);
      const expiresAt = data.expiresAt || (Date.now() + 3600000); // Default 1 hour
      const timeUntilExpiry = expiresAt - Date.now();
      const user = sessionUtils.getUser();
      
      if (!user) {
        throw new Error('No user data found');
      }
      
      return {
        sessionId,
        user,
        isValid: true,
        isExpired: false,
        isExpiringSoon: timeUntilExpiry < SESSION_EXPIRY_WARNING,
        expiresAt,
        timeUntilExpiry,
      };
    } catch (error) {
      console.error('Session validation error:', error);
      const user = sessionUtils.getUser();
      return {
        sessionId,
        user: user || {} as SpotifyUser,
        isValid: false,
        isExpired: true,
        isExpiringSoon: false,
      };
    }
  },

  // Get current session status
  async getCurrentSessionStatus(): Promise<SessionStatus | null> {
    const sessionId = sessionUtils.getSessionId();
    if (!sessionId) {
      return null;
    }

    return this.validateSession(sessionId);
  },

  // Start periodic session checking
  startSessionMonitoring(callback: (status: SessionStatus | null) => void): () => void {
    const interval = setInterval(async () => {
      const status = await this.getCurrentSessionStatus();
      callback(status);
    }, SESSION_CHECK_INTERVAL);

    // Return cleanup function
    return () => clearInterval(interval);
  },

  // Format time until expiry for display
  formatTimeUntilExpiry(timeUntilExpiry: number): string {
    const minutes = Math.floor(timeUntilExpiry / 60000);
    const seconds = Math.floor((timeUntilExpiry % 60000) / 1000);
    
    if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    }
    return `${seconds}s`;
  },
};
