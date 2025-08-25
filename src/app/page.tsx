'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { sessionUtils } from '@/utils/session';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    if (sessionUtils.isLoggedIn()) {
      router.push('/sort');
    } else {
      router.push('/login');
    }
  }, [router]);

  return null;
}
