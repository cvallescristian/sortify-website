import { useState } from 'react';
import { SpotifyPlaylist } from '@/types/spotify';
import { sessionUtils } from '@/utils/session';
import { apiService } from '@/services/api';

interface CreatedPlaylist {
  id: string;
  name: string;
  description?: string;
  external_urls: { spotify: string };
}

export function useMergePlaylist() {
  const [selectedPlaylists, setSelectedPlaylists] = useState<SpotifyPlaylist[]>([]);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [description, setDescription] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [createdPlaylist, setCreatedPlaylist] = useState<CreatedPlaylist | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePlaylistSelect = (playlist: SpotifyPlaylist) => {
    if (!selectedPlaylists.some(selected => selected.id === playlist.id)) {
      setSelectedPlaylists([...selectedPlaylists, playlist]);
    }
  };

  const handleRemovePlaylist = (playlistId: string) => {
    setSelectedPlaylists(selectedPlaylists.filter(playlist => playlist.id !== playlistId));
  };

  const createNewPlaylist = async () => {
    if (selectedPlaylists.length === 0) {
      setError('Please select at least one playlist to merge');
      return;
    }

    if (!newPlaylistName.trim()) {
      setError('Please enter a name for the new playlist');
      return;
    }

    setIsCreating(true);
    setError(null);

    try {
      const sessionId = sessionUtils.getSessionId();
      if (!sessionId) {
        setError('Session expired. Please log in again.');
        return;
      }

      const playlistIds = selectedPlaylists.map(playlist => playlist.id);
      const response = await apiService.mergePlaylists(
        sessionId,
        playlistIds,
        newPlaylistName.trim(),
        description.trim()
      );

      if (response.success && response.playlist) {
        setCreatedPlaylist(response.playlist);
      } else {
        setError(response.error || 'Failed to create playlist');
      }
    } catch {
      setError('An error occurred while creating the playlist');
    } finally {
      setIsCreating(false);
    }
  };

  return {
    selectedPlaylists,
    newPlaylistName,
    description,
    isCreating,
    createdPlaylist,
    error,
    setNewPlaylistName,
    setDescription,
    handlePlaylistSelect,
    handleRemovePlaylist,
    createNewPlaylist,
  };
}
