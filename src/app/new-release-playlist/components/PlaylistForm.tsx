'use client';

import styles from './PlaylistForm.module.scss';

interface PlaylistFormProps {
  newPlaylistName: string;
  description: string;
  onNameChange: (name: string) => void;
  onDescriptionChange: (description: string) => void;
}

export default function PlaylistForm({
  newPlaylistName,
  description,
  onNameChange,
  onDescriptionChange
}: PlaylistFormProps) {
  return (
    <div className={styles.formSection}>
      <h2 className={styles.sectionTitle}>New Playlist Details</h2>
      
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
    </div>
  );
}
