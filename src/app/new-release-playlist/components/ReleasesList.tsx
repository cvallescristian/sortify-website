import { SpotifyRelease } from '@/types/spotify';
import styles from './ReleasesList.module.scss';

interface ReleasesListProps {
  releases: SpotifyRelease[];
  selectedReleases: SpotifyRelease[];
  onReleaseSelect: (release: SpotifyRelease) => void;
}

export default function ReleasesList({ 
  releases, 
  selectedReleases, 
  onReleaseSelect 
}: ReleasesListProps) {
  const isSelected = (release: SpotifyRelease) => {
    return selectedReleases.some(r => r.id === release.id);
  };

  const formatReleaseDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (releases.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h3 className={styles.emptyTitle}>No Releases Found</h3>
        <p className={styles.emptyMessage}>
          No latest releases are available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.releasesContainer}>
      <div className={styles.releasesList}>
        {releases.map((release) => (
          <div
            key={release.id}
            className={`${styles.releaseCard} ${isSelected(release) ? styles.selected : ''}`}
            onClick={() => onReleaseSelect(release)}
          >
            <div className={styles.releaseImage}>
              {release.images && release.images.length > 0 ? (
                <img
                  src={release.images[0].url}
                  alt={release.name}
                  className={styles.releaseCover}
                />
              ) : (
                <div className={styles.releasePlaceholder}>
                  <span className={styles.releaseIcon}>🎵</span>
                </div>
              )}
            </div>
            
            <div className={styles.releaseInfo}>
              <h3 className={styles.releaseName}>{release.name}</h3>
              <p className={styles.releaseArtists}>
                {release.artists.map(artist => artist.name).join(', ')}
              </p>
              <div className={styles.releaseDetails}>
                <span className={styles.releaseType}>
                  {release.album_type.charAt(0).toUpperCase() + release.album_type.slice(1)}
                </span>
                <span className={styles.releaseTracks}>
                  {release.total_tracks} track{release.total_tracks !== 1 ? 's' : ''}
                </span>
                <span className={styles.releaseDate}>
                  {formatReleaseDate(release.release_date)}
                </span>
              </div>
            </div>

            <div className={styles.selectionIndicator}>
              {isSelected(release) && (
                <div className={styles.checkmark}>✓</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
