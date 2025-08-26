"use client";

import { useRouter, usePathname } from "next/navigation";
import { User, Music, ArrowDownWideNarrow, LucideIcon } from "lucide-react";
import Image from "next/image";
import { sessionUtils } from "@/utils/session";
import { useEffect, useState } from "react";
import { SpotifyUser } from "@/types/spotify";
import styles from "./Navigation.module.scss";

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  path: string;
  hasNotification?: boolean;
}

const navItems: NavItem[] = [
  {
    id: "playlists",
    label: "Playlists",
    icon: Music,
    path: "/playlists",
    hasNotification: false,
  },
  { id: "sort", label: "Sort", icon: ArrowDownWideNarrow, path: "/sort" },
  { id: "account", label: "Account", icon: User, path: "/account" },
];

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<SpotifyUser | null>(null);

  useEffect(() => {
    const currentUser = sessionUtils.getUser();
    setUser(currentUser);
  }, []);

  const isActive = (path: string) => {
    return pathname.startsWith(path);
  };

    const renderNavIcon = (item: NavItem) => {
    if (item.id === "account") {
      if (user?.images && user.images.length > 0) {
        return (
          <Image
            src={user.images[0].url}
            alt={user.display_name}
            width={24}
            height={24}
            className={styles.navProfileImage}
          />
        );
      } else if (user?.display_name) {
        // Show first letter of name as placeholder
        return (
          <div className={styles.navProfilePlaceholder}>
            {user.display_name.charAt(0).toUpperCase()}
          </div>
        );
      } else {
        // Fallback to user icon if no user data
        const IconComponent = item.icon;
        return <IconComponent size={20} />;
      }
    }
    
    const IconComponent = item.icon;
    return <IconComponent size={20} />;
  };

  return (
    <nav className={styles.bottomNav} suppressHydrationWarning>
      <div className={styles.navItemsContainer}>
        {navItems.map((item) => (
          <div
            key={item.id}
            className={`${styles.navItem} ${
              isActive(item.path) ? styles.active : ""
            }`}
            onClick={() => router.push(item.path)}
          >
            <div className={styles.navIcon}>{renderNavIcon(item)}</div>
            <div className={styles.navLabel}>{item.label}</div>
            {item.hasNotification && <div className={styles.navBadge}>!</div>}
          </div>
        ))}
      </div>
    </nav>
  );
}
