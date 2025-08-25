"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { SpotifyRelease } from "@/types/spotify";
import { usePlaylistCreation } from "../hooks/usePlaylistCreation";

interface CreatedPlaylist {
  name: string;
  external_urls: { spotify: string };
}

interface NewReleasePlaylistContextType {
  // State
  releases: SpotifyRelease[];
  selectedReleases: SpotifyRelease[];
  newPlaylistName: string;
  description: string;
  saveToLibrary: boolean;
  isAllSelected: boolean;
  totalTracks: number;
  
  // Actions
  setNewPlaylistName: (name: string) => void;
  setDescription: (description: string) => void;
  setSaveToLibrary: (save: boolean) => void;
  handleReleaseSelect: (release: SpotifyRelease) => void;
  handleSelectAll: (selectAll: boolean) => void;
  handleCreateClick: () => void;
  handleOverrideConfirm: () => void;
  
  // From usePlaylistCreation hook
  isCreating: boolean;
  error: string | null;
  createdPlaylist: CreatedPlaylist | null;
  showOverrideDialog: boolean;
  handleCancelOverride: () => void;
}

const NewReleasePlaylistContext = createContext<NewReleasePlaylistContextType | undefined>(undefined);

export const useNewReleasePlaylist = () => {
  const context = useContext(NewReleasePlaylistContext);
  if (context === undefined) {
    throw new Error("useNewReleasePlaylist must be used within a NewReleasePlaylistProvider");
  }
  return context;
};

interface NewReleasePlaylistProviderProps {
  children: ReactNode;
  releases: SpotifyRelease[];
}

export const NewReleasePlaylistProvider: React.FC<NewReleasePlaylistProviderProps> = ({ 
  children, 
  releases 
}) => {
  const [selectedReleases, setSelectedReleases] = useState<SpotifyRelease[]>([]);
  const [newPlaylistName, setNewPlaylistName] = useState("New Release Playlist");
  const [description, setDescription] = useState("A collection of the latest releases");
  const [saveToLibrary, setSaveToLibrary] = useState(true);

  const {
    isCreating,
    error,
    createdPlaylist,
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

  const value: NewReleasePlaylistContextType = {
    releases,
    selectedReleases,
    newPlaylistName,
    description,
    saveToLibrary,
    isAllSelected,
    totalTracks,
    setNewPlaylistName,
    setDescription,
    setSaveToLibrary,
    handleReleaseSelect,
    handleSelectAll,
    handleCreateClick,
    handleOverrideConfirm,
    isCreating,
    error,
    createdPlaylist,
    showOverrideDialog,
    handleCancelOverride,
  };

  return (
    <NewReleasePlaylistContext.Provider value={value}>
      {children}
    </NewReleasePlaylistContext.Provider>
  );
};
