import SpotifyConnectButton from '../spotify-connect-button/SpotifyConnectButton';
import styles from './LoginPage.module.scss';

export default function LoginPage() {
  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContent}>
        <h1 className={styles.loginTitle}>Sortify</h1>
        <p className={styles.loginSubtitle}>Organize your Spotify playlists</p>
        <SpotifyConnectButton />
      </div>
    </div>
  );
}
