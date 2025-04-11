'use client';

import Text from '@/components/Text';
import clsx from 'clsx';
import EmailRegisterForm from './_components/EmailRegisterForm';
import SocialButtons from '../_components/SocialButtons';
import Link from 'next/link';
import { PATHS } from '@/constants/path';
import { useState } from 'react';
import Button from '@/components/Button';
export default function Register() {
  const [isEmailRegisterFormOpen, setIsEmailRegisterFormOpen] = useState(false);

  return (
    <main
      className={clsx(
        'mt-[var(--header-height)] p-3 pt-[30px]',
        'flex flex-col gap-4',
      )}
    >
      <Text as="h2" typography="display-lg">
        Register
      </Text>
     {isEmailRegisterFormOpen ? <EmailRegisterForm/>:
      <div className='flex flex-col gap-4'>
      <SocialButtons type="register"/>
      <div className='flex items-center gap-2'>
          <div className='border-t border-gray-300 w-full'></div>
          <div className='text-gray-400'>or</div>
          <div className='border-t border-gray-300 w-full'></div>
        </div>
      <Button onClick={() => setIsEmailRegisterFormOpen(true)}>Email Register</Button>
      <div className='text-center'>Already have an account? <Link href={PATHS.AUTH.LOGIN} className='underline'>Login</Link></div>
    </div>}
    </main>
  );
}
