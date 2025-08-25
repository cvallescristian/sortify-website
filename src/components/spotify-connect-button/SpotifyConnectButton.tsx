import SpotifyLogo from '../icons/SpotifyLogo';
import { apiService } from '@/services/api';
import styles from './SpotifyConnectButton.module.scss';

export default function SpotifyConnectButton() {
  const handleConnect = async () => {
    try {
      // Call the API to get the Spotify auth URL
      const response = await apiService.initiateSpotifyLogin();
      
      if (response.success && response.authUrl) {
        // Redirect to Spotify login
        window.location.href = response.authUrl;
      } else {
        console.error('Failed to get auth URL:', response.error);
        alert('Failed to connect to Spotify. Please try again.');
      }
    } catch (error) {
      console.error('Error connecting to Spotify:', error);
      alert('Failed to connect to Spotify. Please try again.');
    }
  };

  return (
    <button className={styles.spotifyConnectBtn} onClick={handleConnect}>
      <SpotifyLogo className={styles.spotifyLogo} />
      Connect with Spotify
    </button>
  );
}
