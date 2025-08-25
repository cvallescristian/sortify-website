'use client';

import { useRouter } from 'next/navigation';
import LoginPage from '@/components/login-page/LoginPage';

export default function HomePage() {
  const router = useRouter();

  const handleConnect = () => {
    router.push('/sort');
  };

  return <LoginPage onConnect={handleConnect} />;
}
