import OverrideDialog from "./OverrideDialog";
import { useNewReleasePlaylist } from "../contexts/NewReleasePlaylistContext";
import styles from "./ErrorAndDialogSection.module.scss";

export default function ErrorAndDialogSection() {
  const {
    error,
    showOverrideDialog,
    isCreating,
    newPlaylistName,
    handleCancelOverride,
    handleOverrideConfirm,
  } = useNewReleasePlaylist();

  return (
    <>
      {error && (
        <div className={styles.errorContainer}>
          <p className={styles.errorMessage}>{error}</p>
        </div>
      )}

      {showOverrideDialog && (
        <OverrideDialog
          playlistName={newPlaylistName}
          isCreating={isCreating}
          onCancel={handleCancelOverride}
          onOverride={handleOverrideConfirm}
        />
      )}
    </>
  );
}
