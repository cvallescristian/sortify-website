import SpotifyLogo from '../icons/SpotifyLogo';
import styles from './SpotifyConnectButton.module.scss';

interface SpotifyConnectButtonProps {
  onClick: () => void;
}

export default function SpotifyConnectButton({ onClick }: SpotifyConnectButtonProps) {
  return (
    <button className={styles.spotifyConnectBtn} onClick={onClick}>
      <SpotifyLogo className={styles.spotifyLogo} />
      Connect with Spotify
    </button>
  );
}
