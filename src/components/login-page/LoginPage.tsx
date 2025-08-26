import SpotifyConnectButton from '../spotify-connect-button/SpotifyConnectButton';
import SortifyLogo from '../icons/SortifyLogo';
import styles from './LoginPage.module.scss';

export default function LoginPage() {
  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContent}>
        <SortifyLogo size={150} className={styles.logo} />
        <h1 className={styles.loginTitle}>Sortify</h1>
        <p className={styles.loginSubtitle}>Organize your Spotify playlists</p>
        <SpotifyConnectButton />
      </div>
    </div>
  );
}
