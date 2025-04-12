import EmailLoginForm from './_components/EmailLoginForm';
import Text from '@/components/Text';
import clsx from 'clsx';
import SocialButtons from '../_components/SocialButtons';
import { PATHS } from '@/constants/path';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className={clsx('mt-[var(--header-height)] p-3 pt-[30px]', 'flex flex-col gap-4')}>
      <Text as="h2" typography="display-lg">
        Login
      </Text>
      <div className="flex flex-col gap-4">
        <SocialButtons type="login" />
        <div className="flex items-center gap-2">
          <div className="border-t border-gray-300 w-full"></div>
          <div className="text-gray-400">or</div>
          <div className="border-t border-gray-300 w-full"></div>
        </div>
        <EmailLoginForm />
        <div className="text-center">
          Don&apos;t have an account?{' '}
          <Link href={PATHS.AUTH.REGISTER} className="underline">
            Rgister
          </Link>
        </div>
      </div>
    </main>
  );
}
