import styles from './Switch.module.scss';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export default function Switch({ 
  checked, 
  onChange, 
  label, 
  disabled = false,
  className = ''
}: SwitchProps) {
  return (
    <label className={`${styles.switchLabel} ${className}`}>
      {label && <span className={styles.switchText}>{label}</span>}
      <div className={styles.switchContainer}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className={styles.switchInput}
        />
        <span className={styles.switchSlider}></span>
      </div>
    </label>
  );
}
