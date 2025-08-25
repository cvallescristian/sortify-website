'use client';

import { useState, useEffect } from 'react';
import { SpotifyPlaylist } from '@/types/spotify';
import styles from './PlaylistSearch.module.scss';

interface PlaylistSearchProps {
  playlists: SpotifyPlaylist[];
  selectedPlaylists: SpotifyPlaylist[];
  onPlaylistSelect: (playlist: SpotifyPlaylist) => void;
}

export default function PlaylistSearch({ 
  playlists, 
  selectedPlaylists, 
  onPlaylistSelect 
}: PlaylistSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPlaylists, setFilteredPlaylists] = useState<SpotifyPlaylist[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = playlists.filter(playlist =>
        playlist.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !selectedPlaylists.some(selected => selected.id === playlist.id)
      );
      setFilteredPlaylists(filtered);
      setShowDropdown(true);
    } else {
      setFilteredPlaylists([]);
      setShowDropdown(false);
    }
  }, [searchQuery, playlists, selectedPlaylists]);

  const handlePlaylistSelect = (playlist: SpotifyPlaylist) => {
    onPlaylistSelect(playlist);
    setSearchQuery('');
    setShowDropdown(false);
  };

  return (
    <div className={styles.autocompleteContainer}>
      <input
        type="text"
        placeholder="Search for playlists to add..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setShowDropdown(true)}
        className={styles.autocompleteInput}
      />
      
      {showDropdown && filteredPlaylists.length > 0 && (
        <div className={styles.dropdown}>
          {filteredPlaylists.map((playlist) => (
            <div
              key={playlist.id}
              className={styles.dropdownItem}
              onClick={() => handlePlaylistSelect(playlist)}
            >
              <div className={styles.playlistInfo}>
                <span className={styles.playlistName}>{playlist.name}</span>
                <span className={styles.playlistTracks}>
                  {playlist.tracks.total} tracks
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
