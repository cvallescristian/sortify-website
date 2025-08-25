import BaseTemplate from '@/components/base-template/BaseTemplate';
import styles from './PlaylistsPage.module.scss';

export default function PlaylistsPage() {
  return (
    <BaseTemplate title="Playlists">
      <div className={styles.playlistsContainer}>
        <h2 className={styles.playlistsTitle}>Your Playlists</h2>
        <p className={styles.playlistsDescription}>
          This page will show your Spotify playlists once the integration is complete.
        </p>
      </div>
    </BaseTemplate>
  );
}
