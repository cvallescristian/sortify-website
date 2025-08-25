'use client';

import { useRouter } from 'next/navigation';
import BaseTemplate from '@/components/BaseTemplate';

export default function LoginPage() {
  const router = useRouter();

  const handleConnectToSpotify = () => {
    // TODO: Implement Spotify OAuth flow
    // For now, just navigate to the sort options page
    router.push('/sort');
  };

  return (
    <BaseTemplate title="Sortify">
      <div className="login-container" style={{ marginTop: '0', minHeight: 'calc(100vh - 160px)' }}>
        <h1 className="login-title">Sortify</h1>
        <button 
          className="btn" 
          onClick={handleConnectToSpotify}
        >
          Connect
        </button>
      </div>
    </BaseTemplate>
  );
}
