'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function AuthCallback() {
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
  }, [accessToken, refreshToken]);
  return <div>AuthCallback</div>;
}

