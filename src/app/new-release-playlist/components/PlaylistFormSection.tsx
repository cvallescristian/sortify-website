import PlaylistForm from "./PlaylistForm";
import Button from "@/components/button/Button";
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

      <Button
        onClick={handleCreateClick}
        variant="primary"
        size="lg"
        disabled={selectedReleases.length === 0 || !newPlaylistName.trim()}
        loading={isCreating}
        fullWidth
        className={styles.createButton}
      >
        {isCreating ? "Creating..." : "Create New Release Playlist"}
      </Button>
    </>
  );
}
