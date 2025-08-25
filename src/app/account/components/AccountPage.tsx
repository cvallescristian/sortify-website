import { SpotifyUser } from '@/types/spotify';
import styles from './AccountPage.module.scss';

interface AccountPageProps {
  user: SpotifyUser;
  onLogout: () => void;
}

export default function AccountPage({ user, onLogout }: AccountPageProps) {
  return (
    <div className={styles.accountPage}>
      <div className={styles.accountPage__container}>
        <h1 className={styles.accountPage__title}>Account</h1>
        
        <div className={styles.accountPage__userInfo}>
          {user.images && user.images.length > 0 && (
            <img 
              src={user.images[0].url} 
              alt={user.display_name}
              className={styles.accountPage__avatar}
            />
          )}
          
          <div className={styles.accountPage__userDetails}>
            <h2 className={styles.accountPage__userName}>{user.display_name}</h2>
            <p className={styles.accountPage__userEmail}>{user.email}</p>
            <p className={styles.accountPage__userCountry}>
              Country: {user.country}
            </p>
          </div>
        </div>

        <button 
          onClick={onLogout}
          className={styles.accountPage__logoutButton}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
