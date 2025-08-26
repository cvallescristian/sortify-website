'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import BaseTemplate from '@/components/base-template/BaseTemplate';
import { ProtectedRoute } from '@/components/protected-route/ProtectedRoute';
import PlaylistDetails from './components/PlaylistDetails';
import Loading from './components/Loading';
import { usePlaylistDetails } from './hooks/usePlaylistDetails';
import styles from './PlaylistDetailsPage.module.scss';

export default function PlaylistDetailsPage() {
  const params = useParams();
  const playlistId = params.id as string;
  const { playlist, tracks, loading, error } = usePlaylistDetails(playlistId);

  const PlaylistContent = () => {
    if (loading) {
      return (
        <BaseTemplate title="Playlist Details" showBackButton>
          <Loading />
        </BaseTemplate>
      );
    }

    if (error) {
      return (
        <BaseTemplate title="Error" showBackButton>
          <div className={styles.errorContainer}>
            <h2 className={styles.errorTitle}>Error</h2>
            <p className={styles.errorMessage}>{error}</p>
          </div>
        </BaseTemplate>
      );
    }

    if (!playlist) {
      return (
        <BaseTemplate title="Playlist Not Found" showBackButton>
          <div className={styles.errorContainer}>
            <h2 className={styles.errorTitle}>Playlist Not Found</h2>
            <p className={styles.errorMessage}>
              The playlist you're looking for doesn't exist or you don't have access to it.
            </p>
          </div>
        </BaseTemplate>
      );
    }

    return (
      <BaseTemplate title={playlist.name} showBackButton>
        <PlaylistDetails playlist={playlist} tracks={tracks} />
      </BaseTemplate>
    );
  };

  return (
    <ProtectedRoute>
      <PlaylistContent />
    </ProtectedRoute>
  );
}
