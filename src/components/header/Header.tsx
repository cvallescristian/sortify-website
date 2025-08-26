import { ArrowLeft } from 'lucide-react';
import SortifyLogo from '../icons/SortifyLogo';
import styles from './Header.module.scss';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

export default function Header({ title, showBackButton, onBackClick }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        {showBackButton && (
          <button className={styles.backButton} onClick={onBackClick} aria-label="Go back">
            <ArrowLeft size={20} />
          </button>
        )}
        <SortifyLogo size={32} className={styles.headerLogo} />
      </div>
      <h1 className={styles.headerTitle}>{title}</h1>
      <div className={styles.rightSection}>
        <div className={showBackButton ? styles.backButtonSpacer : ''}></div>
      </div>
    </header>
  );
}
