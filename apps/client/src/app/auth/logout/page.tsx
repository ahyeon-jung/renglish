'use client';

import logoutAction from '@/app/actions/auth/logout';
import { PATHS } from '@/constants/path';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LogoutPage() {
  const router = useRouter();
  const { clearUser } = useUserStore();

  useEffect(() => {
    logoutAction();
    clearUser();
    router.push(PATHS.HOME);
  }, []);

  return <div>Logging out...</div>;
}
