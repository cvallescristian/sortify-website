'use client';

import BaseTemplate from '@/components/base-template/BaseTemplate';
import { ProtectedRoute } from '@/components/protected-route/ProtectedRoute';
import PlaylistsList from './components/PlaylistsList';
import Loading from './components/Loading';
import { usePlaylistsPage } from './hooks/usePlaylistsPage';
import styles from './PlaylistsPage.module.scss';

export default function PlaylistsPage() {
  const { playlists, loading, error } = usePlaylistsPage();

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
