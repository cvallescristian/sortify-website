import SpotifyConnectButton from '../spotify-connect-button/SpotifyConnectButton';
import styles from './LoginPage.module.scss';

interface LoginPageProps {
  onConnect: () => void;
}

export default function LoginPage({ onConnect }: LoginPageProps) {
  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContent}>
        <h1 className={styles.loginTitle}>Sortify</h1>
        <p className={styles.loginSubtitle}>Organize your Spotify playlists</p>
        <SpotifyConnectButton onClick={onConnect} />
      </div>
    </div>
  );
}
