'use client';

import { useState } from 'react';
import { SpotifyPlaylist } from '@/types/spotify';
import { sessionUtils } from '@/utils/session';
import { apiService } from '@/services/api';
import PlaylistSearch from './PlaylistSearch';
import SelectedPlaylists from './SelectedPlaylists';
import PlaylistForm from './PlaylistForm';
import MergeSuccess from './MergeSuccess';
import styles from './MergePlaylistContent.module.scss';

interface MergePlaylistContentProps {
  playlists: SpotifyPlaylist[];
}

interface CreatedPlaylist {
  id: string;
  name: string;
  description?: string;
  external_urls: { spotify: string };
}

export default function MergePlaylistContent({ playlists }: MergePlaylistContentProps) {
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

  const handleCreateNewPlaylist = async () => {
    if (selectedPlaylists.length === 0) {
      alert('Please select at least one playlist to merge');
      return;
    }

    if (!newPlaylistName.trim()) {
      alert('Please enter a name for the new playlist');
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

  if (createdPlaylist) {
    return (
      <MergeSuccess
        playlistName={createdPlaylist.name}
        spotifyUrl={createdPlaylist.external_urls.spotify}
      />
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <h2 className={styles.sectionTitle}>Select Playlists to Merge</h2>
        
        <PlaylistSearch
          playlists={playlists}
          selectedPlaylists={selectedPlaylists}
          onPlaylistSelect={handlePlaylistSelect}
        />

        <SelectedPlaylists
          selectedPlaylists={selectedPlaylists}
          onRemovePlaylist={handleRemovePlaylist}
        />
      </div>

      <PlaylistForm
        newPlaylistName={newPlaylistName}
        description={description}
        onNameChange={setNewPlaylistName}
        onDescriptionChange={setDescription}
      />

      {error && (
        <div className={styles.errorContainer}>
          <p className={styles.errorMessage}>{error}</p>
        </div>
      )}

      <div className={styles.buttonContainer}>
        <button
          onClick={handleCreateNewPlaylist}
          className={styles.createButton}
          disabled={selectedPlaylists.length === 0 || !newPlaylistName.trim() || isCreating}
        >
          {isCreating ? 'Creating...' : 'Create New Playlist'}
        </button>
      </div>
    </div>
  );
}
