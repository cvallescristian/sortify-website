'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { sessionUtils } from '@/utils/session';
import { apiService } from '@/services/api';
import { SpotifyPlaylist } from '@/types/spotify';
import BaseTemplate from '@/components/base-template/BaseTemplate';
import PlaylistsList from './components/PlaylistsList';
import Loading from './components/Loading';
import styles from './PlaylistsPage.module.scss';

export default function PlaylistsPage() {
  const router = useRouter();
  const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const sessionId = sessionUtils.getSessionId();
        if (!sessionId) {
          router.push('/');
          return;
        }

        const response = await apiService.getPlaylists(sessionId);
        
        if (response.success && response.playlists) {
          setPlaylists(response.playlists);
        } else {
          setError(response.error || 'Failed to fetch playlists');
        }
      } catch {
        setError('An error occurred while fetching playlists');
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, [router]);

  if (loading) {
    return (
      <BaseTemplate title="Playlists">
        <Loading />
      </BaseTemplate>
    );
  }

  if (error) {
    return (
      <BaseTemplate title="Playlists">
        <div className={styles.errorContainer}>
          <h2 className={styles.errorTitle}>Error</h2>
          <p className={styles.errorMessage}>{error}</p>
        </div>
      </BaseTemplate>
    );
  }

  return (
    <BaseTemplate title="Playlists">
      <PlaylistsList playlists={playlists} />
    </BaseTemplate>
  );
}
