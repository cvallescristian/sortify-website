'use client';

import { useEffect } from 'react';
import styles from './ConfirmationModal.module.scss';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDestructive = false
}: ConfirmationModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleBackdropClick}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{title}</h2>
        </div>
        
        <div className={styles.modalBody}>
          <p className={styles.modalMessage}>{message}</p>
        </div>
        
        <div className={styles.modalActions}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onClose}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className={`${styles.confirmButton} ${isDestructive ? styles.destructive : ''}`}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
