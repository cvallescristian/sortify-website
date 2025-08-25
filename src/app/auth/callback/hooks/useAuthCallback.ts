import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthCallbackService, type CallbackParams } from '../services/authCallback';

export function useAuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Processing authentication...');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const params: CallbackParams = {
          code: searchParams.get('code'),
          error: searchParams.get('error'),
          success: searchParams.get('success'),
          sessionId: searchParams.get('sessionId'),
          userParam: searchParams.get('user')
        };

        const result = AuthCallbackService.processCallback(params);
        
        setStatus(result.status);
        setMessage(result.message);

        if (result.redirectTo && result.delay) {
          setTimeout(() => router.push(result.redirectTo!), result.delay);
        }
      } catch (error) {
        console.error('Error in auth callback:', error);
        setStatus('error');
        setMessage('Authentication failed. Please try again.');
        setTimeout(() => router.push('/'), 3000);
      }
    };

    handleCallback();
  }, [searchParams, router]);

  return { status, message };
}
