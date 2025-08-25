"use client";

import { useRouter, usePathname } from "next/navigation";
import { User, Music, ArrowDownWideNarrow } from "lucide-react";
import styles from "./Navigation.module.scss";

const navItems = [
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

  const isActive = (path: string) => {
    return pathname.startsWith(path);
  };

  return (
    <nav className={styles.bottomNav} suppressHydrationWarning>
      {navItems.map((item) => {
        const IconComponent = item.icon;
        return (
          <div
            key={item.id}
            className={`${styles.navItem} ${
              isActive(item.path) ? styles.active : ""
            }`}
            onClick={() => router.push(item.path)}
          >
            <div className={styles.navIcon}>
              <IconComponent size={20} />
            </div>
            <div className={styles.navLabel}>{item.label}</div>
            {item.hasNotification && <div className={styles.navBadge}>!</div>}
          </div>
        );
      })}
    </nav>
  );
}
