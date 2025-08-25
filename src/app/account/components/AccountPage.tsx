import { SpotifyUser } from '@/types/spotify';
import styles from './AccountPage.module.scss';

interface AccountPageProps {
  user: SpotifyUser;
  onLogout: () => void;
}

export default function AccountPage({ user, onLogout }: AccountPageProps) {
  const formatFollowers = (followers: number) => {
    if (followers >= 1000000) {
      return `${(followers / 1000000).toFixed(1)}M`;
    } else if (followers >= 1000) {
      return `${(followers / 1000).toFixed(1)}K`;
    }
    return followers.toString();
  };



  return (
    <div className={styles.accountPage}>
      <div className={styles.accountPage__container}>
        <h1 className={styles.accountPage__title}>Profile</h1>
        
        <div className={styles.accountPage__profileSection}>
          <div className={styles.accountPage__profileHeader}>
            {user.images && user.images.length > 0 ? (
              <img 
                src={user.images[0].url} 
                alt={user.display_name}
                className={styles.accountPage__avatar}
              />
            ) : (
              <div className={styles.accountPage__avatarPlaceholder}>
                {user.display_name.charAt(0).toUpperCase()}
              </div>
            )}
            
            <div className={styles.accountPage__profileInfo}>
              <h2 className={styles.accountPage__userName}>{user.display_name}</h2>
              <p className={styles.accountPage__userType}>
                {user.product === 'premium' ? 'Spotify Premium' : 'Spotify Free'}
              </p>
              {user.followers && (
                <p className={styles.accountPage__followers}>
                  {formatFollowers(user.followers.total)} followers
                </p>
              )}
            </div>
          </div>

          <div className={styles.accountPage__profileDetails}>
            <div className={styles.accountPage__detailItem}>
              <span className={styles.accountPage__detailLabel}>Email:</span>
              <span className={styles.accountPage__detailValue}>{user.email}</span>
            </div>
            
            <div className={styles.accountPage__detailItem}>
              <span className={styles.accountPage__detailLabel}>Country:</span>
              <span className={styles.accountPage__detailValue}>{user.country}</span>
            </div>
            
            
            {user.external_urls?.spotify && (
              <div className={styles.accountPage__detailItem}>
                <span className={styles.accountPage__detailLabel}>Profile:</span>
                <a 
                  href={user.external_urls.spotify} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.accountPage__profileLink}
                >
                  View on Spotify
                </a>
              </div>
            )}
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
