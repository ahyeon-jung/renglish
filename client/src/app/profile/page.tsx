import clsx from 'clsx';
import getAuthDataAction from '../_actions/auth/user/getAuthData';

export default async function Profile() {
  const response = await getAuthDataAction();

  return (
    <main className={clsx('mt-[var(--header-height)]')}>
      프로필 페이지입니다.
      <div>{response.data?.email}</div>
    </main>
  );
}
