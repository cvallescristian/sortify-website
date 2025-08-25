'use client';

import { useEffect, useState } from 'react';
import { useSession } from '@/contexts/SessionContext';
import { apiService } from '@/services/api';
import { SpotifyPlaylist } from '@/types/spotify';
import BaseTemplate from '@/components/base-template/BaseTemplate';
import { ProtectedRoute } from '@/components/protected-route/ProtectedRoute';
import PlaylistsList from './components/PlaylistsList';
import Loading from './components/Loading';
import styles from './PlaylistsPage.module.scss';

export default function PlaylistsPage() {
  const { sessionStatus } = useSession();
  const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      if (!sessionStatus?.isValid) return;

      try {
        const sessionId = sessionStatus.sessionId || '';
        const response = await apiService.getPlaylists(sessionId);
        
        if (response.success && response.playlists) {
          setPlaylists(response.playlists);
        } else {
          setError(response.error || 'Failed to fetch playlists');
        }
      } catch (error) {
        setError('An error occurred while fetching playlists');
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, [sessionStatus]);

  const PlaylistsContent = () => {
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
  };

  return (
    <ProtectedRoute>
      <PlaylistsContent />
    </ProtectedRoute>
  );
}
