'use client';

import { SpotifyPlaylist } from '@/types/spotify';
import Button from '@/components/button/Button';
import BaseBlock from '@/components/base-block/BaseBlock';
import PlaylistSearch from './PlaylistSearch';
import SelectedPlaylists from './SelectedPlaylists';
import PlaylistForm from './PlaylistForm';
import MergeSuccess from './MergeSuccess';
import { useMergePlaylist } from '../hooks/useMergePlaylist';
import styles from './MergePlaylistContent.module.scss';

interface MergePlaylistContentProps {
  playlists: SpotifyPlaylist[];
}

export default function MergePlaylistContent({ playlists }: MergePlaylistContentProps) {
  const {
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
  } = useMergePlaylist();

  if (createdPlaylist) {
    return (
      <MergeSuccess
        playlistName={createdPlaylist.name}
        spotifyUrl={createdPlaylist.external_urls.spotify}
        playlistId={createdPlaylist.id}
      />
    );
  }

  return (
    <div className={styles.container}>
      <BaseBlock 
        title="Select Playlists to Merge"
        variant="form"
        padding="xl"
        margin="xl"
      >
        <PlaylistSearch
          playlists={playlists}
          selectedPlaylists={selectedPlaylists}
          onPlaylistSelect={handlePlaylistSelect}
        />

        <SelectedPlaylists
          selectedPlaylists={selectedPlaylists}
          onRemovePlaylist={handleRemovePlaylist}
        />
      </BaseBlock>

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
        <Button
          onClick={createNewPlaylist}
          variant="primary"
          size="lg"
          disabled={selectedPlaylists.length === 0 || !newPlaylistName.trim()}
          loading={isCreating}
          fullWidth
        >
          {isCreating ? 'Creating...' : 'Create New Playlist'}
        </Button>
      </div>
    </div>
  );
}
