'use client';

import { Suspense } from 'react';
import { useAuthCallback } from './hooks/useAuthCallback';
import AuthCallbackMessage from './components/AuthCallbackMessage';
import Loading from './components/Loading';

function AuthCallbackContent() {
  const { status, message } = useAuthCallback();
  return <AuthCallbackMessage status={status} message={message} />;
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<Loading />}>
      <AuthCallbackContent />
    </Suspense>
  );
}
