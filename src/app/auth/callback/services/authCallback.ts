import { sessionUtils } from '@/utils/session';
import { config } from '@/utils/env';

export interface CallbackParams {
  code: string | null;
  error: string | null;
  success: string | null;
  sessionId: string | null;
  userParam: string | null;
}

export interface CallbackResult {
  status: 'loading' | 'success' | 'error';
  message: string;
  redirectTo?: string;
  delay?: number;
}

export class AuthCallbackService {
  static handleError(errorMessage: string): CallbackResult {
    return {
      status: 'error',
      message: errorMessage,
      redirectTo: '/',
      delay: 3000
    };
  }

  static handleSuccess(sessionId: string, userParam: string): CallbackResult {
    try {
      const user = JSON.parse(decodeURIComponent(userParam));
      sessionUtils.saveSession(sessionId, user);
      
      return {
        status: 'success',
        message: 'Authentication successful! Redirecting...',
        redirectTo: '/sort',
        delay: 2000
      };
    } catch (parseError) {
      console.error('Error parsing user data:', parseError);
      return this.handleError('Failed to process user data');
    }
  }

  static processCallback(params: CallbackParams): CallbackResult {
    const { code, error, success, sessionId, userParam } = params;

    if (error) {
      return this.handleError(`Authentication failed: ${error}`);
    }

    if (success && sessionId && userParam) {
      return this.handleSuccess(sessionId, userParam);
    }

    if (!code) {
      return this.handleError('No authorization code received');
    }

    // Redirect to API for code processing
    window.location.href = `${config.apiUrl}/auth/callback?code=${code}`;
    
    return {
      status: 'loading',
      message: 'Processing authorization code...'
    };
  }
}
