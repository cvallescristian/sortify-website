import { SpotifyPlaylist } from "@/types/spotify";
import styles from "./PlaylistsList.module.scss";

interface PlaylistsListProps {
  playlists: SpotifyPlaylist[];
}

export default function PlaylistsList({ playlists }: PlaylistsListProps) {
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
          {playlists.length} playlist{playlists.length !== 1 ? "s" : ""}
        </p>
      </div>

              <div className={styles.playlistsList}>
          {playlists.map((playlist) => (
            <div key={playlist.id} className={styles.playlistCard}>
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
    </div>
  );
}
