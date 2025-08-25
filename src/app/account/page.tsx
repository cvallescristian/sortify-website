"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/contexts/SessionContext";
import { SpotifyUser } from "@/types/spotify";
import AccountPage from "./components/AccountPage";
import BaseTemplate from "@/components/base-template/BaseTemplate";
import { ProtectedRoute } from "@/components/protected-route/ProtectedRoute";

export default function Account() {
  const { sessionStatus, logout } = useSession();
  const [user, setUser] = useState<SpotifyUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionStatus?.isValid && sessionStatus.user) {
      setUser(sessionStatus.user);
      setLoading(false);
    }
  }, [sessionStatus]);

  const AccountContent = () => {
    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <BaseTemplate title="Account">
        <AccountPage user={user!} onLogout={logout} />
      </BaseTemplate>
    );
  };

  return (
    <ProtectedRoute>
      <AccountContent />
    </ProtectedRoute>
  );
}
