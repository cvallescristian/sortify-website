'use client';

import BaseTemplate from '@/components/base-template/BaseTemplate';
import Button from '@/components/button/Button';
import styles from './SortOptions.module.scss';

export default function SortOptionsPage() {
  const handleOptionClick = (option: string) => {
    console.log(`Selected option: ${option}`);
    alert(`You selected: ${option}`);
  };

  const handleSortClick = () => {
    alert('Sorting functionality will be implemented here');
  };

  return (
    <BaseTemplate title="Sort" showBackButton>
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

        <Button onClick={handleSortClick} className={styles.sortButton}>
          Sort
        </Button>
      </div>
    </BaseTemplate>
  );
}
