'use client';

import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';
import SpotifyLogo from '@/components/icons/SpotifyLogo';
import styles from './NewReleaseSuccess.module.scss';

interface NewReleaseSuccessProps {
  playlistName: string;
  spotifyUrl: string;
}

export default function NewReleaseSuccess({ playlistName, spotifyUrl }: NewReleaseSuccessProps) {
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
        <div className={styles.successIcon}>
          <Check size={32} />
        </div>
        <h2 className={styles.successTitle}>Playlist Created Successfully!</h2>
        <p className={styles.successMessage}>
          Your new release playlist &ldquo;{playlistName}&rdquo; has been created and is ready to use.
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
