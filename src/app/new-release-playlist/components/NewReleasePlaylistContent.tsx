"use client";

import { SpotifyRelease } from "@/types/spotify";
import NewReleaseSuccess from "./NewReleaseSuccess";
import NewReleaseHeader from "./NewReleaseHeader";
import PlaylistFormSection from "./PlaylistFormSection";
import ReleasesSection from "./ReleasesSection";
import ErrorAndDialogSection from "./ErrorAndDialogSection";
import { NewReleasePlaylistProvider, useNewReleasePlaylist } from "../contexts/NewReleasePlaylistContext";
import styles from "./NewReleasePlaylistContent.module.scss";

interface NewReleasePlaylistContentProps {
  releases: SpotifyRelease[];
}

function NewReleasePlaylistContentInner() {
  const { createdPlaylist } = useNewReleasePlaylist();

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
      <PlaylistFormSection />
      <ReleasesSection />
      <ErrorAndDialogSection />
    </div>
  );
}

export default function NewReleasePlaylistContent({ releases }: NewReleasePlaylistContentProps) {
  return (
    <NewReleasePlaylistProvider releases={releases}>
      <NewReleasePlaylistContentInner />
    </NewReleasePlaylistProvider>
  );
}
