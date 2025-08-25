import styles from './SelectionControls.module.scss';

interface SelectionControlsProps {
  isAllSelected: boolean;
  selectedCount: number;
  totalTracks: number;
  onSelectAll: (selectAll: boolean) => void;
}

export default function SelectionControls({
  isAllSelected,
  selectedCount,
  totalTracks,
  onSelectAll,
}: SelectionControlsProps) {
  return (
    <div className={styles.selectAllRow}>
      <div className={styles.selectAllContainer}>
        <label className={styles.selectAllLabel}>
          <span className={styles.selectAllText}>Select All</span>
          <div className={styles.switchContainer}>
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={(e) => onSelectAll(e.target.checked)}
              className={styles.switchInput}
            />
            <span className={styles.switchSlider}></span>
          </div>
        </label>
      </div>
      <div className={styles.rightSection}>
        <h3 className={styles.albumsTitle}>Albums</h3>
        {selectedCount > 0 && (
          <div className={styles.selectionCount}>
            Selected: {selectedCount} • {totalTracks} tracks
          </div>
        )}
      </div>
    </div>
  );
}
