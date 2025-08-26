'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { SpotifyPlaylist } from "@/types/spotify";
import styles from "./PlaylistsList.module.scss";

interface PlaylistsListProps {
  playlists: SpotifyPlaylist[];
}

export default function PlaylistsList({ playlists }: PlaylistsListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const filteredPlaylists = useMemo(() => {
    if (!searchQuery.trim()) {
      return playlists;
    }

    const query = searchQuery.toLowerCase().trim();
    return playlists.filter(playlist => 
      playlist.name.toLowerCase().includes(query) ||
      playlist.owner.display_name.toLowerCase().includes(query)
    );
  }, [playlists, searchQuery]);

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handlePlaylistClick = (playlistId: string) => {
    router.push(`/playlists/${playlistId}`);
  };

  if (playlists.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h2 className={styles.emptyTitle}>No Playlists Found</h2>
        <p className={styles.emptyMessage}>
          You don&apos;t have any playlists yet. Create one on Spotify to get
          started!
        </p>
      </div>
    );
  }

  return (
    <div className={styles.playlistsContainer}>
      <div className={styles.playlistsHeader}>
        <h2 className={styles.playlistsTitle}>Your Playlists</h2>
        <p className={styles.playlistsCount}>
          {filteredPlaylists.length} of {playlists.length} playlist{playlists.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className={styles.searchContainer}>
        <div className={styles.searchInputWrapper}>
          <input
            type="text"
            placeholder="Search playlists..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className={styles.clearButton}
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      <div className={styles.playlistsList}>
        {filteredPlaylists.map((playlist) => (
          <div 
            key={playlist.id} 
            className={styles.playlistCard}
            onClick={() => handlePlaylistClick(playlist.id)}
          >
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
              <h3 className={styles.playlistName}>{playlist.name}</h3>
              <p className={styles.playlistOwner}>
                by {playlist.owner.display_name}
              </p>
              <p className={styles.playlistTracks}>
                {playlist.tracks.total} track
                {playlist.tracks.total !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filteredPlaylists.length === 0 && searchQuery.trim() && (
        <div className={styles.noResults}>
          <p className={styles.noResultsMessage}>
            No playlists found matching &quot;{searchQuery}&quot;
          </p>
        </div>
      )}
    </div>
  );
}
