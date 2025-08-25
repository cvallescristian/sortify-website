'use client';

import { useRouter } from 'next/navigation';
import LoginPage from '@/components/login-page/LoginPage';

export default function LoginRoute() {
  const router = useRouter();

  const handleConnect = () => {
    router.push('/sort');
  };

  return <LoginPage onConnect={handleConnect} />;
}
