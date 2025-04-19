'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';

export default function AuthCallback() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthCallbackContent />
    </Suspense>
  );
}

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const accessToken = searchParams.get('access-token');
  const refreshToken = searchParams.get('refresh-token');

  useEffect(() => {
    if (accessToken && refreshToken) {
      fetch('/api/cookies/set-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessToken, refreshToken }),
      }).then(() => {
        router.push('/');
      });
    }
  }, [router, accessToken, refreshToken]);
  return <div>AuthCallback</div>;
}
