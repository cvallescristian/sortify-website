'use client';

import BaseTemplate from '@/components/base-template/BaseTemplate';
import { ProtectedRoute } from '@/components/protected-route/ProtectedRoute';
import { usePlaylists } from './hooks/usePlaylists';
import MergePlaylistContent from './components/MergePlaylistContent';
import styles from './MergePlaylistPage.module.scss';

export default function MergePlaylistPage() {
  const { playlists, loading, error } = usePlaylists();

  const MergePlaylistContentWrapper = () => {
    if (loading) {
      return (
        <BaseTemplate title="Merge Playlist" showBackButton>
          <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner}></div>
            <p className={styles.loadingText}>Loading playlists...</p>
          </div>
        </BaseTemplate>
      );
    }

    if (error) {
      return (
        <BaseTemplate title="Merge Playlist" showBackButton>
          <div className={styles.errorContainer}>
            <h2 className={styles.errorTitle}>Error</h2>
            <p className={styles.errorMessage}>{error}</p>
          </div>
        </BaseTemplate>
      );
    }

    return (
      <BaseTemplate title="Merge Playlist" showBackButton>
        <MergePlaylistContent playlists={playlists} />
      </BaseTemplate>
    );
  };

  return (
    <ProtectedRoute>
      <MergePlaylistContentWrapper />
    </ProtectedRoute>
  );
}
