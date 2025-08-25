"use client";

import { useState, useEffect } from "react";
import { SpotifyRelease } from "@/types/spotify";
import ReleasesList from "./ReleasesList";
import PlaylistForm from "./PlaylistForm";
import NewReleaseSuccess from "./NewReleaseSuccess";
import NewReleaseHeader from "./NewReleaseHeader";
import SelectionControls from "./SelectionControls";
import OverrideDialog from "./OverrideDialog";
import styles from "./NewReleasePlaylistContent.module.scss";
import { usePlaylistCreation } from "../hooks/usePlaylistCreation";

interface NewReleasePlaylistContentProps {
  releases: SpotifyRelease[];
}

export default function NewReleasePlaylistContent({
  releases,
}: NewReleasePlaylistContentProps) {
  const [selectedReleases, setSelectedReleases] = useState<SpotifyRelease[]>([]);
  const [newPlaylistName, setNewPlaylistName] = useState("New Release Playlist");
  const [description, setDescription] = useState("A collection of the latest releases");
  const [saveToLibrary, setSaveToLibrary] = useState(true);

  const {
    isCreating,
    error,
    createdPlaylist,
    existingPlaylist,
    showOverrideDialog,
    checkExistingPlaylist,
    createPlaylist,
    handleCancelOverride,
  } = usePlaylistCreation();

  // Initialize with all releases selected by default
  useEffect(() => {
    if (releases.length > 0) {
      setSelectedReleases([...releases]);
    }
  }, [releases]);

  const handleReleaseSelect = (release: SpotifyRelease) => {
    setSelectedReleases((prev) => {
      const isSelected = prev.some((r) => r.id === release.id);
      if (isSelected) {
        return prev.filter((r) => r.id !== release.id);
      } else {
        return [...prev, release];
      }
    });
  };

  const handleSelectAll = (selectAll: boolean) => {
    if (selectAll) {
      setSelectedReleases([...releases]);
    } else {
      setSelectedReleases([]);
    }
  };

  const isAllSelected = selectedReleases.length === releases.length && releases.length > 0;

  // Calculate total tracks from selected releases (fast approach)
  const totalTracks = selectedReleases.reduce((total, release) => {
    return total + (release.total_tracks || 0);
  }, 0);

  // Debounced check for existing playlist
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      checkExistingPlaylist(newPlaylistName);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [newPlaylistName, checkExistingPlaylist]);

  const handleCreateClick = () => {
    createPlaylist(selectedReleases, newPlaylistName, description, saveToLibrary, false);
  };

  const handleOverrideConfirm = () => {
    createPlaylist(selectedReleases, newPlaylistName, description, saveToLibrary, true);
  };

  if (createdPlaylist) {
    return (
      <NewReleaseSuccess
        playlistName={createdPlaylist.name}
        spotifyUrl={createdPlaylist.external_urls.spotify}
      />
    );
  }

  return (
    <div className={styles.container}>
      <NewReleaseHeader />

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

      <SelectionControls
        isAllSelected={isAllSelected}
        selectedCount={selectedReleases.length}
        totalTracks={totalTracks}
        onSelectAll={handleSelectAll}
      />

      <ReleasesList
        releases={releases}
        selectedReleases={selectedReleases}
        onReleaseSelect={handleReleaseSelect}
      />

      {error && (
        <div className={styles.errorContainer}>
          <p className={styles.errorMessage}>{error}</p>
        </div>
      )}

      {showOverrideDialog && existingPlaylist && (
        <OverrideDialog
          playlistName={newPlaylistName}
          isCreating={isCreating}
          onCancel={handleCancelOverride}
          onOverride={handleOverrideConfirm}
        />
      )}
    </div>
  );
}
