import styles from './BaseBlock.module.scss';

interface BaseBlockProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  margin?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'form' | 'card' | 'success';
  disabled?: boolean;
  onClick?: () => void;
}

export default function BaseBlock({ 
  children, 
  title,
  className = '',
  padding = 'lg',
  margin = 'lg',
  variant = 'default',
  disabled = false,
  onClick
}: BaseBlockProps) {
  const blockClasses = [
    styles.baseBlock,
    styles[variant],
    styles[`padding-${padding}`],
    styles[`margin-${margin}`],
    disabled ? styles.disabled : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={blockClasses} onClick={disabled ? undefined : onClick}>
      {title && (
        <h2 className={styles.title}>{title}</h2>
      )}
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}
