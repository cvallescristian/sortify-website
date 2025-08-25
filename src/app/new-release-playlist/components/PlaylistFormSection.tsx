import PlaylistForm from "./PlaylistForm";
import { useNewReleasePlaylist } from "../contexts/NewReleasePlaylistContext";
import styles from "./PlaylistFormSection.module.scss";

export default function PlaylistFormSection() {
  const {
    newPlaylistName,
    description,
    saveToLibrary,
    setNewPlaylistName,
    setDescription,
    setSaveToLibrary,
    isCreating,
    selectedReleases,
    handleCreateClick,
  } = useNewReleasePlaylist();

  return (
    <>
      <PlaylistForm
        newPlaylistName={newPlaylistName}
        description={description}
        saveToLibrary={saveToLibrary}
        onNameChange={setNewPlaylistName}
        onDescriptionChange={setDescription}
        onSaveToLibraryChange={setSaveToLibrary}
      />

      <button
        onClick={handleCreateClick}
        className={styles.createButton}
        disabled={selectedReleases.length === 0 || !newPlaylistName.trim() || isCreating}
      >
        {isCreating ? "Creating..." : "Create New Release Playlist"}
      </button>
    </>
  );
}
