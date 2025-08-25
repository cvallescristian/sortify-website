'use client';

import BaseTemplate from '@/components/BaseTemplate';

export default function PlaylistsPage() {
  return (
    <BaseTemplate title="Playlists" showBackButton>
      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
        <h2 style={{ marginBottom: '20px', color: '#333' }}>Your Playlists</h2>
        <p style={{ color: '#666', lineHeight: '1.6' }}>
          This page will show your Spotify playlists once the integration is complete.
        </p>
      </div>
    </BaseTemplate>
  );
}
