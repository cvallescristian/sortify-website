'use client';

import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';
import Button from '@/components/button/Button';
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
        <div className={styles.successIcon}>
          <Check size={32} />
        </div>
        <h2 className={styles.successTitle}>Playlist Created Successfully!</h2>
        <p className={styles.successMessage}>
          Your new playlist &ldquo;{playlistName}&rdquo; has been created and is ready to use.
        </p>
        
        <div className={styles.buttonGroup}>
          <Button
            onClick={handleOpenSpotify}
            variant="spotify"
            size="md"
          >
            <SpotifyLogo className={styles.spotifyLogo} />
            Open in Spotify
          </Button>
          
          <Button
            onClick={handleDone}
            variant="secondary"
            size="md"
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}
