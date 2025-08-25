"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { sessionUtils } from "@/utils/session";
import { SpotifyUser } from "@/types/spotify";
import AccountPage from "./components/AccountPage";
import BaseTemplate from "@/components/base-template/BaseTemplate";

export default function Account() {
  const router = useRouter();
  const [user, setUser] = useState<SpotifyUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = sessionUtils.getUser();
    if (!currentUser) {
      router.push("/login");
      return;
    }
    setUser(currentUser);
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    sessionUtils.clearSession();
    router.push("/login");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BaseTemplate title="Account">
      <AccountPage user={user!} onLogout={handleLogout} />
    </BaseTemplate>
  );
}
