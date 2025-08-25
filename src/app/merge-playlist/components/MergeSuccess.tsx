'use client';

import { useRouter } from 'next/navigation';
import SpotifyLogo from '@/components/icons/SpotifyLogo';
import styles from './MergeSuccess.module.scss';

interface MergeSuccessProps {
  playlistName: string;
  spotifyUrl: string;
}

export default function MergeSuccess({ playlistName, spotifyUrl }: MergeSuccessProps) {
  const router = useRouter();

  const handleOpenSpotify = () => {
    window.open(spotifyUrl, '_blank');
  };

  const handleDone = () => {
    router.push('/sort');
  };

  return (
    <div className={styles.successContainer}>
      <div className={styles.successContent}>
        <div className={styles.successIcon}>✅</div>
        <h2 className={styles.successTitle}>Playlist Created Successfully!</h2>
        <p className={styles.successMessage}>
          Your new playlist &ldquo;{playlistName}&rdquo; has been created and is ready to use.
        </p>
        
        <div className={styles.buttonGroup}>
          <button
            onClick={handleOpenSpotify}
            className={styles.spotifyButton}
          >
            <SpotifyLogo className={styles.spotifyLogo} />
            Open in Spotify
          </button>
          
          <button
            onClick={handleDone}
            className={styles.doneButton}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
