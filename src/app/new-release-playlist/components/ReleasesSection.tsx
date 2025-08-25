import ReleasesList from "./ReleasesList";
import SelectionControls from "./SelectionControls";
import { useNewReleasePlaylist } from "../contexts/NewReleasePlaylistContext";

export default function ReleasesSection() {
  const {
    releases,
    selectedReleases,
    isAllSelected,
    totalTracks,
    handleReleaseSelect,
    handleSelectAll,
  } = useNewReleasePlaylist();

  return (
    <>
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
    </>
  );
}
