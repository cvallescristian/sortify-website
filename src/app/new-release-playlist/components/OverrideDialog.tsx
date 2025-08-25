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
          <button
            onClick={onCancel}
            className={styles.cancelButton}
            disabled={isCreating}
          >
            Cancel
          </button>
          <button
            onClick={onOverride}
            className={styles.overrideButton}
            disabled={isCreating}
          >
            {isCreating ? "Overriding..." : "Override Playlist"}
          </button>
        </div>
      </div>
    </div>
  );
}
