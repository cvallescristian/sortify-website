import { SpotifyUser, SessionData } from '@/types/spotify';

const SESSION_KEY = 'sortify_session';
const USER_KEY = 'sortify_user';

export const sessionUtils = {
  // Save session data to localStorage
  saveSession(sessionId: string, user: SpotifyUser): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(SESSION_KEY, sessionId);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  },

  // Get session ID from localStorage
  getSessionId(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(SESSION_KEY);
    }
    return null;
  },

  // Get user data from localStorage
  getUser(): SpotifyUser | null {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem(USER_KEY);
      return userData ? JSON.parse(userData) : null;
    }
    return null;
  },

  // Check if user is logged in
  isLoggedIn(): boolean {
    return this.getSessionId() !== null;
  },

  // Clear session data
  clearSession(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(SESSION_KEY);
      localStorage.removeItem(USER_KEY);
    }
  },

  // Get full session data
  getSession(): SessionData | null {
    const sessionId = this.getSessionId();
    const user = this.getUser();
    
    if (sessionId && user) {
      return { sessionId, user };
    }
    return null;
  }
};
