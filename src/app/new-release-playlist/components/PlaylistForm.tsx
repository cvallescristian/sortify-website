'use client';

import BaseBlock from '@/components/base-block/BaseBlock';
import Switch from '@/components/switch/Switch';
import styles from './PlaylistForm.module.scss';

interface PlaylistFormProps {
  newPlaylistName: string;
  description: string;
  saveToLibrary: boolean;
  onNameChange: (name: string) => void;
  onDescriptionChange: (description: string) => void;
  onSaveToLibraryChange: (saveToLibrary: boolean) => void;
}

export default function PlaylistForm({
  newPlaylistName,
  description,
  saveToLibrary,
  onNameChange,
  onDescriptionChange,
  onSaveToLibraryChange
}: PlaylistFormProps) {
  return (
    <BaseBlock 
      title="New Playlist Details"
      variant="form"
      padding="lg"
      margin="lg"
    >
      <div className={styles.inputGroup}>
        <label htmlFor="playlistName" className={styles.label}>
          Playlist Name *
        </label>
        <input
          id="playlistName"
          type="text"
          placeholder="Enter playlist name..."
          value={newPlaylistName}
          onChange={(e) => onNameChange(e.target.value)}
          className={styles.textInput}
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="description" className={styles.label}>
          Description (Optional)
        </label>
        <textarea
          id="description"
          placeholder="Enter playlist description..."
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          className={styles.textarea}
          rows={4}
        />
      </div>

      <div className={styles.inputGroup}>
        <Switch
          checked={saveToLibrary}
          onChange={onSaveToLibraryChange}
          label="Save to my library"
        />
      </div>
    </BaseBlock>
  );
}
