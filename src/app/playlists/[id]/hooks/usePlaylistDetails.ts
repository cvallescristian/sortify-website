import { useState, useEffect } from 'react';
import { SpotifyPlaylist, SpotifyTrack } from '@/types/spotify';
import { apiService } from '@/services/api';
import { sessionUtils } from '@/utils/session';

export function usePlaylistDetails(playlistId: string) {
  const [playlist, setPlaylist] = useState<SpotifyPlaylist | null>(null);
  const [tracks, setTracks] = useState<SpotifyTrack[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaylistDetails = async () => {
      if (!playlistId) {
        setError('Playlist ID is required');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const sessionId = sessionUtils.getSessionId();
        if (!sessionId) {
          setError('Session expired. Please login again.');
          return;
        }

        // Fetch playlist details
        const playlistResponse = await apiService.getPlaylistDetails(sessionId, playlistId);
        if (!playlistResponse.success || !playlistResponse.playlist) {
          setError(playlistResponse.error || 'Failed to fetch playlist details');
          return;
        }

        setPlaylist(playlistResponse.playlist);

        // Fetch playlist tracks
        const tracksResponse = await apiService.getPlaylistTracks(sessionId, playlistId);
        if (!tracksResponse.success) {
          setError(tracksResponse.error || 'Failed to fetch playlist tracks');
          return;
        }

        setTracks(tracksResponse.tracks || []);

      } catch (err) {
        console.error('Error fetching playlist details:', err);
        setError('Failed to fetch playlist details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylistDetails();
  }, [playlistId]);

  return {
    playlist,
    tracks,
    loading,
    error
  };
}
