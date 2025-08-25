'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { sessionUtils } from '@/utils/session';
import { apiService } from '@/services/api';
import { SpotifyRelease } from '@/types/spotify';
import BaseTemplate from '@/components/base-template/BaseTemplate';
import NewReleasePlaylistContent from './components/NewReleasePlaylistContent';
import Loading from './components/Loading';
import styles from './NewReleasePlaylistPage.module.scss';

export default function NewReleasePlaylistPage() {
  const router = useRouter();
  const [releases, setReleases] = useState<SpotifyRelease[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReleases = async () => {
      try {
        const sessionId = sessionUtils.getSessionId();
        if (!sessionId) {
          router.push('/');
          return;
        }

        const response = await apiService.getLatestReleases(sessionId, 50);
        
        if (response.success && response.releases) {
          setReleases(response.releases);
        } else {
          setError(response.error || 'Failed to fetch releases');
        }
      } catch {
        setError('An error occurred while fetching releases');
      } finally {
        setLoading(false);
      }
    };

    fetchReleases();
  }, [router]);

  if (loading) {
    return (
      <BaseTemplate title="New Release Playlist" showBackButton>
        <Loading />
      </BaseTemplate>
    );
  }

  if (error) {
    return (
      <BaseTemplate title="New Release Playlist" showBackButton>
        <div className={styles.errorContainer}>
          <h2 className={styles.errorTitle}>Error</h2>
          <p className={styles.errorMessage}>{error}</p>
        </div>
      </BaseTemplate>
    );
  }

  return (
    <BaseTemplate title="New Release Playlist" showBackButton>
      <NewReleasePlaylistContent releases={releases} />
    </BaseTemplate>
  );
}
