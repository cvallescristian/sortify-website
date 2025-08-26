import Switch from '@/components/switch/Switch';
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
        <Switch
          checked={isAllSelected}
          onChange={onSelectAll}
          label="Select All"
        />
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
