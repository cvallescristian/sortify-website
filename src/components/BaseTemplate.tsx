'use client';

import { useRouter, usePathname } from 'next/navigation';

interface BaseTemplateProps {
  children: React.ReactNode;
  title: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

export default function BaseTemplate({ 
  children, 
  title, 
  showBackButton = false,
  onBackClick 
}: BaseTemplateProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      router.back();
    }
  };

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: '🏠',
      path: '/',
      hasNotification: false
    },
    {
      id: 'sort',
      label: 'Sort',
      icon: '🎵',
      path: '/sort',
      hasNotification: false
    },
    {
      id: 'playlists',
      label: 'Playlists',
      icon: '📋',
      path: '/playlists',
      hasNotification: true
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: '⚙️',
      path: '/settings',
      hasNotification: false
    }
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        {showBackButton && (
          <button 
            className="back-button" 
            onClick={handleBackClick}
            aria-label="Go back"
          >
            ←
          </button>
        )}
        <h1 className="header-title">{title}</h1>
        <div style={{ width: showBackButton ? '40px' : '0' }}></div>
      </header>

      {/* Main content */}
      <main className="main-content">
        {children}
      </main>

      {/* Bottom navigation */}
      <nav className="bottom-nav">
        {navItems.map((item) => (
          <div
            key={item.id}
            className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
            onClick={() => router.push(item.path)}
          >
            <div className="nav-icon">
              {item.icon}
            </div>
            <div className="nav-label">
              {item.label}
            </div>
            {item.hasNotification && (
              <div className="nav-badge">
                !
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}
