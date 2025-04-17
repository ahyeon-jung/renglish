'use client';

import logoutAction from '@/app/_actions/auth/logout';
import { PATHS } from '@/constants/path';
import { useEffect } from 'react';

export default function LogoutPage() {
  useEffect(() => {
    logoutAction();
    window.location.replace(PATHS.HOME);
  }, []);

  return <div>Logging out...</div>;
}
