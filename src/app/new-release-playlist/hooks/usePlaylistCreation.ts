import { useState } from 'react';
import { SpotifyRelease } from '@/types/spotify';
import { sessionUtils } from '@/utils/session';
import { apiService } from '@/services/api';

interface CreatedPlaylist {
  name: string;
  external_urls: { spotify: string };
}

export function usePlaylistCreation() {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdPlaylist, setCreatedPlaylist] = useState<CreatedPlaylist | null>(null);
  const [existingPlaylist, setExistingPlaylist] = useState<CreatedPlaylist | null>(null);
  const [showOverrideDialog, setShowOverrideDialog] = useState(false);
  const [isCheckingPlaylist, setIsCheckingPlaylist] = useState(false);

  const checkExistingPlaylist = async (name: string) => {
    if (!name.trim()) {
      setExistingPlaylist(null);
      return;
    }

    setIsCheckingPlaylist(true);
    try {
      const sessionId = sessionUtils.getSessionId();
      if (!sessionId) {
        setError("Session expired. Please login again.");
        return;
      }

      const response = await apiService.checkPlaylistExists(sessionId, name.trim());
      if (response.success && response.exists) {
        setExistingPlaylist(response.playlist);
      } else {
        setExistingPlaylist(null);
      }
    } catch (error) {
      console.error("Error checking playlist existence:", error);
      setExistingPlaylist(null);
    } finally {
      setIsCheckingPlaylist(false);
    }
  };

  const createPlaylist = async (
    selectedReleases: SpotifyRelease[],
    newPlaylistName: string,
    description: string,
    saveToLibrary: boolean,
    overrideExisting: boolean = false
  ) => {
    if (selectedReleases.length === 0) {
      setError("Please select at least one release");
      return;
    }

    if (!newPlaylistName.trim()) {
      setError("Please enter a playlist name");
      return;
    }

    // Check if playlist exists and show override dialog
    if (existingPlaylist && !overrideExisting) {
      setShowOverrideDialog(true);
      return;
    }

    setIsCreating(true);
    setError(null);

    try {
      const sessionId = sessionUtils.getSessionId();
      if (!sessionId) {
        setError("Session expired. Please login again.");
        return;
      }

      // Get track IDs from selected releases
      const releaseIds = selectedReleases.map((release) => release.id);
      const trackIdsResponse = await apiService.getTrackIdsFromReleases(
        sessionId,
        releaseIds
      );

      if (!trackIdsResponse.success) {
        setError(
          trackIdsResponse.error || "Failed to get tracks from releases"
        );
        return;
      }

      // Create playlist with track IDs
      const playlistResponse = await apiService.createPlaylist(
        sessionId,
        newPlaylistName.trim(),
        trackIdsResponse.trackIds,
        description.trim(),
        saveToLibrary,
        overrideExisting
      );

      if (playlistResponse.success && playlistResponse.playlist) {
        setCreatedPlaylist(playlistResponse.playlist);
        setShowOverrideDialog(false);
      } else {
        setError(playlistResponse.error || "Failed to create playlist");
      }
    } catch (error) {
      console.error("Error creating playlist:", error);
      setError("Failed to create playlist. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  const handleOverrideClick = () => {
    // This will be called from the parent component
    setShowOverrideDialog(false);
  };

  const handleCancelOverride = () => {
    setShowOverrideDialog(false);
  };

  return {
    isCreating,
    error,
    createdPlaylist,
    existingPlaylist,
    showOverrideDialog,
    isCheckingPlaylist,
    checkExistingPlaylist,
    createPlaylist,
    handleOverrideClick,
    handleCancelOverride,
    setError,
  };
}
