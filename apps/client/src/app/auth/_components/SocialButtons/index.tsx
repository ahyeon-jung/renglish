import Image from 'next/image';
import kakao_logo from '@/assets/social/kakao_logo.svg';
import google_logo from '@/assets/social/google_logo.svg';
import naver_logo from '@/assets/social/naver_logo.svg';
import clsx from 'clsx';
import Link from 'next/link';
import { ENV } from '@/constants/env';

const SOCIAL_LOGINS = [
  {
    label: 'Google',
    icon: google_logo,
    className: 'bg-[#FFFFFF] border border-[#747775]',
    callbackUrl: `${ENV.API_BASE_URL}/api/auth/google`,
  },
  {
    label: 'Kakao',
    icon: kakao_logo,
    className: 'bg-[#FEE500]',
    callbackUrl: `${ENV.API_BASE_URL}/api/auth/kakao`,
  },
  {
    label: 'Naver',
    icon: naver_logo,
    className: 'gap-3 bg-[#03C75A] text-white',
    callbackUrl: `${ENV.API_BASE_URL}/api/auth/naver`,
  },
];

type SocialButtonsProps = {
  type: 'login' | 'register';
};

export default function SocialButtons({ type }: SocialButtonsProps) {
  return (
    <div className="flex flex-col gap-2">
      {SOCIAL_LOGINS.map(({ label, icon, className, callbackUrl }) => (
        <div key={label} className={clsx(`p-3 rounded-md gap-2`, 'flex justify-center', className)}>
          <Image src={icon} alt="kakao" width={20} height={20} />
          <Link href={callbackUrl}>
            {type === 'login' ? 'Login with' : 'Register with'} {label}
          </Link>
        </div>
      ))}
    </div>
  );
}
