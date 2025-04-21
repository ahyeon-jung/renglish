import { Suspense } from 'react';

import SocialRegisterForm from './SocialRegister';
import { cookies } from 'next/headers';

export default async function SocialRegister() {
  const cookieStore = await cookies();
  const email = cookieStore.get('email')?.value;
  const nickname = cookieStore.get('nickname')?.value;

  return (
    <Suspense>
      <SocialRegisterForm email={email || ''} nickname={nickname || ''} />
    </Suspense>
  );
}