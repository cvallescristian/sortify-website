'use client';

import BaseTemplate from '@/components/base-template/BaseTemplate';
import styles from './SortOptions.module.scss';

export default function SortOptionsPage() {
  const handleOptionClick = (option: string) => {
    console.log(`Selected option: ${option}`);
    alert(`You selected: ${option}`);
  };

  return (
    <BaseTemplate title="Sort">
      <div className={styles.sortOptions}>
        <div className={styles.optionCard} onClick={() => handleOptionClick('liked-songs')}>
          <div className={styles.optionTitle}>Liked song sort</div>
          <div className={styles.optionDescription}>
            Your liked songs will be moved to your current playlist
          </div>
        </div>

        <div className={styles.optionCard} onClick={() => handleOptionClick('merge-playlists')}>
          <div className={styles.optionTitle}>Merge Playlists</div>
          <div className={styles.optionDescription}>
            Merge between existing playlists
          </div>
        </div>

        <div className={styles.optionCard} onClick={() => handleOptionClick('start-scratch')}>
          <div className={styles.optionTitle}>Start from scratch</div>
          <div className={styles.optionDescription}>
            Your liked songs will be moved to your current playlist
          </div>
        </div>
      </div>
    </BaseTemplate>
  );
}
