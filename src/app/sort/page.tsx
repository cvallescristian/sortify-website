'use client';

import { useRouter } from 'next/navigation';
import BaseTemplate from '@/components/base-template/BaseTemplate';
import styles from './SortOptions.module.scss';

interface SortOption {
  id: string;
  title: string;
  description: string;
  disabled?: boolean;
  comingSoon?: boolean;
}

const aiPoweredOptions: SortOption[] = [
  {
    id: 'liked-songs',
    title: 'Liked song sort',
    description: 'Your liked songs will be moved to your current playlist',
    disabled: true,
    comingSoon: true,
  },
  {
    id: 'start-scratch',
    title: 'Start from scratch',
    description: 'Create a new playlist from your liked songs',
    disabled: true,
    comingSoon: true,
  },
];

const actionOptions: SortOption[] = [
  {
    id: 'merge-playlists',
    title: 'Merge Playlists',
    description: 'Merge between existing playlists',
    disabled: false,
  },
  {
    id: 'new-release-playlist',
    title: 'New Release Playlist',
    description: 'Create a playlist based on your latest releases songs',
    disabled: false,
    comingSoon: false,
  },
];

export default function SortOptionsPage() {
  const router = useRouter();

  const handleOptionClick = (option: SortOption) => {
    if (option.disabled) {
      return; // Don't do anything if disabled
    }

    console.log(`Selected option: ${option.id}`);
    
    switch (option.id) {
      case 'merge-playlists':
        router.push('/merge-playlist');
        break;
      default:
        console.log(`Option ${option.id} not implemented yet`);
    }
  };

  const renderSection = (title: string, options: SortOption[]) => (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.sectionOptions}>
        {options.map((option) => (
          <div
            key={option.id}
            className={`${styles.optionCard} ${option.disabled ? styles.disabled : ''}`}
            onClick={() => handleOptionClick(option)}
          >
            <div className={styles.optionHeader}>
              <div className={styles.optionTitle}>{option.title}</div>
              {option.comingSoon && (
                <span className={styles.comingSoonBadge}>Coming Soon</span>
              )}
            </div>
            <div className={styles.optionDescription}>
              {option.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <BaseTemplate title="Sort">
      <div className={styles.sortOptions}>
        {renderSection('Powered by AI', aiPoweredOptions)}
        {renderSection('Actions', actionOptions)}
      </div>
    </BaseTemplate>
  );
}
