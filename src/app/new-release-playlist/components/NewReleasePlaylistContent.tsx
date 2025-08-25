'use client';

import { useState, useEffect } from 'react';
import { SpotifyRelease } from '@/types/spotify';
import ReleasesList from './ReleasesList';
import PlaylistForm from './PlaylistForm';
import styles from './NewReleasePlaylistContent.module.scss';

interface NewReleasePlaylistContentProps {
  releases: SpotifyRelease[];
}

export default function NewReleasePlaylistContent({ releases }: NewReleasePlaylistContentProps) {
  const [selectedReleases, setSelectedReleases] = useState<SpotifyRelease[]>([]);
  const [newPlaylistName, setNewPlaylistName] = useState('New Release Playlist');
  const [description, setDescription] = useState('A collection of the latest releases');
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize with all releases selected by default
  useEffect(() => {
    if (releases.length > 0) {
      setSelectedReleases([...releases]);
    }
  }, [releases]);

  const handleReleaseSelect = (release: SpotifyRelease) => {
    setSelectedReleases(prev => {
      const isSelected = prev.some(r => r.id === release.id);
      if (isSelected) {
        return prev.filter(r => r.id !== release.id);
      } else {
        return [...prev, release];
      }
    });
  };

  const handleSelectAll = (selectAll: boolean) => {
    if (selectAll) {
      setSelectedReleases([...releases]);
    } else {
      setSelectedReleases([]);
    }
  };

  const isAllSelected = selectedReleases.length === releases.length && releases.length > 0;

  const handleCreatePlaylist = async () => {
    if (selectedReleases.length === 0) {
      setError('Please select at least one release');
      return;
    }

    if (!newPlaylistName.trim()) {
      setError('Please enter a playlist name');
      return;
    }

    setIsCreating(true);
    setError(null);

    try {
      // TODO: Implement playlist creation API
      console.log('Creating playlist with releases:', selectedReleases);
      console.log('Playlist name:', newPlaylistName);
      console.log('Description:', description);
      
      // For now, just show a success message
      alert('Playlist creation feature coming soon!');
    } catch {
      setError('Failed to create playlist');
    } finally {
      setIsCreating(false);
    }
  };

  const getTotalTracks = () => {
    return selectedReleases.reduce((total, release) => total + release.total_tracks, 0);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Select Releases</h2>
        <p className={styles.subtitle}>
          Choose the latest releases you want to include in your playlist
        </p>
      </div>

      <div className={styles.selectAllRow}>
        <div className={styles.selectAllContainer}>
          <label className={styles.selectAllLabel}>
            <span className={styles.selectAllText}>Select All</span>
            <div className={styles.switchContainer}>
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={(e) => handleSelectAll(e.target.checked)}
                className={styles.switchInput}
              />
              <span className={styles.switchSlider}></span>
            </div>
          </label>
        </div>
      </div>

      <ReleasesList
        releases={releases}
        selectedReleases={selectedReleases}
        onReleaseSelect={handleReleaseSelect}
      />

      {selectedReleases.length > 0 && (
        <div className={styles.selectionSummary}>
          <h3 className={styles.summaryTitle}>
            Selected Releases ({selectedReleases.length})
          </h3>
          <p className={styles.summaryTracks}>
            Total tracks: {getTotalTracks()}
          </p>
        </div>
      )}

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
          onClick={handleCreatePlaylist}
          className={styles.createButton}
          disabled={selectedReleases.length === 0 || !newPlaylistName.trim() || isCreating}
        >
          {isCreating ? 'Creating...' : 'Create New Release Playlist'}
        </button>
      </div>
    </div>
  );
}
