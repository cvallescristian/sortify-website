import { SpotifyUser } from '@/types/spotify';
import styles from './UserProfile.module.scss';

interface UserProfileProps {
  user: SpotifyUser;
}

export default function UserProfile({ user }: UserProfileProps) {
  const formatFollowers = (followers: number) => {
    if (followers >= 1000000) {
      return `${(followers / 1000000).toFixed(1)}M`;
    } else if (followers >= 1000) {
      return `${(followers / 1000).toFixed(1)}K`;
    }
    return followers.toString();
  };

  return (
    <div className={styles.profileSection}>
      <div className={styles.profileHeader}>
        {user.images && user.images.length > 0 ? (
          <img 
            src={user.images[0].url} 
            alt={user.display_name}
            className={styles.avatar}
          />
        ) : (
          <div className={styles.avatarPlaceholder}>
            {user.display_name.charAt(0).toUpperCase()}
          </div>
        )}
        
        <div className={styles.profileInfo}>
          <h2 className={styles.userName}>{user.display_name}</h2>
          <p className={styles.userType}>
            {user.product === 'premium' ? 'Spotify Premium' : 'Spotify Free'}
          </p>
          {user.followers && (
            <p className={styles.followers}>
              {formatFollowers(user.followers.total)} followers
            </p>
          )}
        </div>
      </div>

      <div className={styles.profileDetails}>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Email:</span>
          <span className={styles.detailValue}>{user.email}</span>
        </div>
        
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Country:</span>
          <span className={styles.detailValue}>{user.country}</span>
        </div>
        
        {user.external_urls?.spotify && (
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Profile:</span>
            <a 
              href={user.external_urls.spotify} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.profileLink}
            >
              View on Spotify
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
