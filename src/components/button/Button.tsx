import styles from './Button.module.scss';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'spotify' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  style?: React.CSSProperties;
}

export default function Button({ 
  children, 
  onClick, 
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  type = 'button',
  fullWidth = false,
  style
}: ButtonProps) {
  const buttonClasses = [
    styles.btn,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button 
      className={buttonClasses} 
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
      style={style}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
}
