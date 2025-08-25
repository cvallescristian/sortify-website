'use client';

import BaseTemplate from '@/components/BaseTemplate';

export default function SortOptionsPage() {
  const handleOptionClick = (option: string) => {
    // TODO: Implement different sorting options
    console.log(`Selected option: ${option}`);
    // For now, just show an alert
    alert(`You selected: ${option}`);
  };

  const handleSortClick = () => {
    // TODO: Implement the actual sorting logic
    alert('Sorting functionality will be implemented here');
  };

  return (
    <BaseTemplate title="Sort" showBackButton>
      <div className="sort-options">
        <div className="option-card" onClick={() => handleOptionClick('liked-songs')}>
          <div className="option-title">Liked song sort</div>
          <div className="option-description">
            Your liked songs will be moved to your current playlist
          </div>
        </div>

        <div className="option-card" onClick={() => handleOptionClick('merge-playlists')}>
          <div className="option-title">Merge Playlists</div>
          <div className="option-description">
            Merge between existing playlists
          </div>
        </div>

        <div className="option-card" onClick={() => handleOptionClick('start-scratch')}>
          <div className="option-title">Start from scratch</div>
          <div className="option-description">
            Your liked songs will be moved to your current playlist
          </div>
        </div>

        <button 
          className="btn" 
          onClick={handleSortClick}
          style={{ marginTop: '20px' }}
        >
          Sort
        </button>
      </div>
    </BaseTemplate>
  );
}
