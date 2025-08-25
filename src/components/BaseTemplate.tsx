'use client';

import { useRouter } from 'next/navigation';
import Header from './Header';
import Navigation from './Navigation';
import styles from './BaseTemplate.module.scss';

interface BaseTemplateProps {
  children: React.ReactNode;
  title: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

export default function BaseTemplate({ 
  children, 
  title, 
  showBackButton = false,
  onBackClick 
}: BaseTemplateProps) {
  const router = useRouter();

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      router.back();
    }
  };

  return (
    <div className={styles.appContainer}>
      <Header 
        title={title} 
        showBackButton={showBackButton} 
        onBackClick={handleBackClick} 
      />
      <main className={styles.mainContent}>{children}</main>
      <Navigation />
    </div>
  );
}
