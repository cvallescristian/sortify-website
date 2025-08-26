import Button from '@/components/button/Button';
import { SpotifyUser } from '@/types/spotify';
import UserProfile from './UserProfile';
import styles from './AccountPage.module.scss';

interface AccountPageProps {
  user: SpotifyUser;
  onLogout: () => void;
}

export default function AccountPage({ user, onLogout }: AccountPageProps) {
  return (
    <div className={styles.accountPage}>
      <div className={styles.accountPage__container}>
        <h1 className={styles.accountPage__title}>Profile</h1>
        
        <UserProfile user={user} />

        <Button 
          onClick={onLogout}
          variant="danger"
          size="md"
          className={styles.accountPage__logoutButton}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
