'use client';

import { PATHS } from '@/constants/path';
import { useEffect } from 'react';

export default function LogoutPage() {
  useEffect(() => {
    window.location.replace(PATHS.HOME);
  }, []);

  return <div>Logging out...</div>;
}
