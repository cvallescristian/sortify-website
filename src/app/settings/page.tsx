import BaseTemplate from '@/components/base-template/BaseTemplate';
import styles from './SettingsPage.module.scss';

export default function SettingsPage() {
  return (
    <BaseTemplate title="Settings" showBackButton>
      <div className={styles.settingsContainer}>
        <h2 className={styles.settingsTitle}>Settings</h2>
        <p className={styles.settingsDescription}>
          App settings and configuration options will be available here.
        </p>
      </div>
    </BaseTemplate>
  );
}
