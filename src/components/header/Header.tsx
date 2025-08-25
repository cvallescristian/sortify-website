import { ArrowLeft } from 'lucide-react';
import styles from './Header.module.scss';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

export default function Header({ title, showBackButton, onBackClick }: HeaderProps) {
  return (
    <header className={styles.header}>
      {showBackButton && (
        <button className={styles.backButton} onClick={onBackClick} aria-label="Go back">
          <ArrowLeft size={20} />
        </button>
      )}
      <h1 className={styles.headerTitle}>{title}</h1>
      <div className={showBackButton ? styles.backButtonSpacer : ''}></div>
    </header>
  );
}
