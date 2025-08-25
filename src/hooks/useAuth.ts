import { useSession } from '@/contexts/SessionContext';

export const useAuth = () => {
  const session = useSession();
  
  return {
    ...session,
    // Convenience methods
    isAuthenticated: session.isLoggedIn && session.sessionStatus?.isValid,
    user: session.sessionStatus?.user,
    sessionId: session.sessionStatus?.sessionId,
  };
};
