import { useState, useEffect } from 'react';
import { useSession } from '@/contexts/SessionContext';
import { apiService } from '@/services/api';
import { SpotifyPlaylist } from '@/types/spotify';

export function usePlaylists() {
  const { sessionStatus } = useSession();
  const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      if (!sessionStatus?.isValid) return;

      try {
        const sessionId = sessionStatus.sessionId;
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

  return { playlists, loading, error };
}
