'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import { SpotifyPlaylist } from '@/types/spotify';
import styles from './SelectedPlaylists.module.scss';

interface SelectedPlaylistsProps {
  selectedPlaylists: SpotifyPlaylist[];
  onRemovePlaylist: (playlistId: string) => void;
}

export default function SelectedPlaylists({ 
  selectedPlaylists, 
  onRemovePlaylist 
}: SelectedPlaylistsProps) {
  const getTotalTracks = () => {
    return selectedPlaylists.reduce((total, playlist) => total + playlist.tracks.total, 0);
  };

  if (selectedPlaylists.length === 0) {
    return null;
  }

  return (
    <div className={styles.selectedPlaylists}>
      <h3 className={styles.selectedTitle}>
        Selected Playlists ({selectedPlaylists.length})
      </h3>
      <p className={styles.totalTracks}>
        Total tracks: {getTotalTracks()}
      </p>
      
      <div className={styles.playlistsList}>
        {selectedPlaylists.map((playlist) => (
          <div key={playlist.id} className={styles.playlistCard}>
            <div className={styles.playlistImage}>
              {playlist.images && playlist.images.length > 0 ? (
                <Image
                  src={playlist.images[0].url}
                  alt={playlist.name}
                  width={60}
                  height={60}
                  className={styles.playlistCover}
                />
              ) : (
                <div className={styles.playlistPlaceholder}>
                  <span className={styles.playlistIcon}>🎵</span>
                </div>
              )}
            </div>
            <div className={styles.playlistDetails}>
              <h4 className={styles.playlistName}>{playlist.name}</h4>
              <p className={styles.playlistOwner}>
                by {playlist.owner.display_name}
              </p>
              <p className={styles.playlistTracks}>
                {playlist.tracks.total} tracks
              </p>
            </div>
            <button
              onClick={() => onRemovePlaylist(playlist.id)}
              className={styles.removeButton}
              aria-label={`Remove ${playlist.name}`}
              type="button"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
