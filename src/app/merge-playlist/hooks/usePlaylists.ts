import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { sessionUtils } from '@/utils/session';
import { apiService } from '@/services/api';
import { SpotifyPlaylist } from '@/types/spotify';

export function usePlaylists() {
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

  return { playlists, loading, error };
}
