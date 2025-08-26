'use client';

import { SpotifyPlaylist, SpotifyTrack } from '@/types/spotify';
import BaseBlock from '@/components/base-block/BaseBlock';
import styles from './PlaylistDetails.module.scss';

interface PlaylistDetailsProps {
  playlist: SpotifyPlaylist;
  tracks: SpotifyTrack[];
}

export default function PlaylistDetails({ playlist, tracks }: PlaylistDetailsProps) {
  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={styles.playlistDetailsContainer}>
      {/* Playlist Header */}
      <BaseBlock variant="default" padding="xl" margin="lg">
        <div className={styles.playlistHeader}>
          <div className={styles.playlistImage}>
            {playlist.images && playlist.images.length > 0 ? (
              <img
                src={playlist.images[0].url}
                alt={playlist.name}
                className={styles.playlistCover}
              />
            ) : (
              <div className={styles.playlistPlaceholder}>
                <span className={styles.playlistIcon}>🎵</span>
              </div>
            )}
          </div>
          
          <div className={styles.playlistInfo}>
            <h1 className={styles.playlistName}>{playlist.name}</h1>
            <p className={styles.playlistOwner}>
              by {playlist.owner.display_name}
            </p>
            <p className={styles.playlistStats}>
              {playlist.tracks.total} tracks • {playlist.followers?.total || 0} followers
            </p>
            {playlist.description && (
              <p className={styles.playlistDescription}>{playlist.description}</p>
            )}
          </div>
        </div>
      </BaseBlock>

      {/* Tracks List */}
      <BaseBlock title="Tracks" variant="default" padding="lg" margin="lg">
        <div className={styles.tracksList}>
          {tracks.length === 0 ? (
            <div className={styles.emptyTracks}>
              <p>No tracks found in this playlist.</p>
            </div>
          ) : (
            tracks.map((track, index) => (
              <div key={`${track.id}-${index}`} className={styles.trackItem}>
                <div className={styles.trackNumber}>{index + 1}</div>
                
                <div className={styles.trackImage}>
                  {track.album.images && track.album.images.length > 0 ? (
                    <img
                      src={track.album.images[0].url}
                      alt={track.name}
                      className={styles.trackCover}
                    />
                  ) : (
                    <div className={styles.trackPlaceholder}>
                      <span className={styles.trackIcon}>🎵</span>
                    </div>
                  )}
                </div>
                
                <div className={styles.trackInfo}>
                  <h3 className={styles.trackName}>{track.name}</h3>
                  <p className={styles.trackArtist}>
                    {track.artists.map(artist => artist.name).join(', ')}
                  </p>
                </div>
                
                <div className={styles.trackAlbum}>
                  <p>{track.album.name}</p>
                </div>
                
                <div className={styles.trackDuration}>
                  <p>{formatDuration(track.duration_ms)}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </BaseBlock>
    </div>
  );
}
