import styles from './Button.module.scss';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export default function Button({ 
  children, 
  onClick, 
  variant = 'primary',
  className = ''
}: ButtonProps) {
  const buttonClass = variant === 'secondary' 
    ? `${styles.btn} ${styles.secondary} ${className}`
    : `${styles.btn} ${className}`;

  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
}
