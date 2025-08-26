'use client';

import { useState } from 'react';
import ConfirmationModal from '@/components/modal/ConfirmationModal';
import styles from './DeleteButton.module.scss';

interface DeleteButtonProps {
  onDelete: () => Promise<void>;
  title?: string;
  message?: string;
  className?: string;
}

export default function DeleteButton({ 
  onDelete, 
  title = 'Delete Playlist',
  message = 'Are you sure you want to delete this playlist? This action cannot be undone.',
  className = ''
}: DeleteButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete();
    } finally {
      setIsDeleting(false);
      setIsModalOpen(false);
    }
  };

  const handleCloseModal = () => {
    if (!isDeleting) {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <button
        type="button"
        className={`${styles.deleteButton} ${className}`}
        onClick={handleDeleteClick}
        disabled={isDeleting}
      >
        {isDeleting ? 'Deleting...' : 'Delete Playlist'}
      </button>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title={title}
        message={message}
        confirmText={isDeleting ? 'Deleting...' : 'Delete'}
        cancelText="Cancel"
        isDestructive={true}
      />
    </>
  );
}
