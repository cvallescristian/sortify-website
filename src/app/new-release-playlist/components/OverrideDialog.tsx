import Button from '@/components/button/Button';
import styles from './OverrideDialog.module.scss';

interface OverrideDialogProps {
  playlistName: string;
  isCreating: boolean;
  onCancel: () => void;
  onOverride: () => void;
}

export default function OverrideDialog({
  playlistName,
  isCreating,
  onCancel,
  onOverride,
}: OverrideDialogProps) {
  return (
    <div className={styles.overrideDialog}>
      <div className={styles.overrideContent}>
        <h3 className={styles.overrideTitle}>Playlist Already Exists</h3>
        <p className={styles.overrideMessage}>
          A playlist named &quot;{playlistName}&quot; already exists. Would you like to override it with the new tracks?
        </p>
        <div className={styles.overrideButtons}>
          <Button
            onClick={onCancel}
            variant="secondary"
            size="md"
            disabled={isCreating}
          >
            Cancel
          </Button>
          <Button
            onClick={onOverride}
            variant="primary"
            size="md"
            disabled={isCreating}
            loading={isCreating}
          >
            {isCreating ? "Overriding..." : "Override Playlist"}
          </Button>
        </div>
      </div>
    </div>
  );
}
