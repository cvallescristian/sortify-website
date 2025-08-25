# Session Management System

This document describes the automatic session management system implemented in the Sortify website.

## Overview

The session management system provides:
- Automatic session validation and expiration checking
- Real-time session status monitoring
- Automatic redirect to login when session expires
- Session expiration warnings with countdown timer
- Seamless session refresh functionality

## Components

### 1. Session Validation Service (`src/services/sessionValidation.ts`)

Handles session validation logic:
- Validates sessions by making API calls
- Tracks session expiration times
- Provides session status information
- Manages periodic session checking

### 2. Session Context (`src/contexts/SessionContext.tsx`)

React context that provides session state throughout the app:
- Manages session status globally
- Handles automatic logout on session expiration
- Provides session refresh functionality
- Starts session monitoring on app load

### 3. Session Banner (`src/components/session-banner/SessionBanner.tsx`)

UI component that shows session warnings:
- Displays warning when session is expiring soon
- Shows countdown timer
- Provides refresh and logout buttons
- Auto-hides when session is valid

### 4. Protected Route (`src/components/protected-route/ProtectedRoute.tsx`)

Wrapper component for protected pages:
- Checks authentication before rendering content
- Shows loading states during session validation
- Redirects to login if not authenticated
- Provides fallback UI for loading states

## Usage

### Protecting Pages

Wrap any page that requires authentication with the `ProtectedRoute` component:

```tsx
import { ProtectedRoute } from '@/components/protected-route/ProtectedRoute';

export default function MyProtectedPage() {
  return (
    <ProtectedRoute>
      <MyPageContent />
    </ProtectedRoute>
  );
}
```

### Using Session Data

Use the `useSession` hook to access session information:

```tsx
import { useSession } from '@/contexts/SessionContext';

function MyComponent() {
  const { sessionStatus, logout, refreshSession } = useSession();
  
  // Access user data
  const user = sessionStatus?.user;
  
  // Check if session is valid
  const isValid = sessionStatus?.isValid;
  
  // Handle logout
  const handleLogout = () => logout();
}
```

### Using the Auth Hook

For convenience, use the `useAuth` hook:

```tsx
import { useAuth } from '@/hooks/useAuth';

function MyComponent() {
  const { isAuthenticated, user, sessionId } = useAuth();
  
  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }
  
  return <div>Welcome, {user.display_name}!</div>;
}
```

## Configuration

### Session Check Intervals

The system checks session validity every 5 minutes by default. This can be adjusted in `src/services/sessionValidation.ts`:

```typescript
const SESSION_CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutes
```

### Warning Threshold

Session expiration warnings appear 10 minutes before expiry by default:

```typescript
const SESSION_EXPIRY_WARNING = 10 * 60 * 1000; // 10 minutes
```

## Automatic Behavior

1. **Session Monitoring**: The system automatically starts monitoring sessions when the app loads
2. **Expiration Detection**: When a session expires, the user is automatically logged out and redirected to login
3. **Warning Display**: Session expiration warnings appear 10 minutes before expiry
4. **API Integration**: All API calls automatically handle 401 responses by logging out the user

## Error Handling

- Network errors during session validation are handled gracefully
- Invalid sessions are automatically cleared
- Users are redirected to login on any authentication failure
- Loading states are shown during session validation

## Security Features

- Sessions are validated on every API call
- Automatic logout on any authentication failure
- Session data is cleared from localStorage on logout
- No sensitive data is stored in client-side state
