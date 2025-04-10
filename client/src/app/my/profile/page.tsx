import Email from './_components/Email';
import Nickname from './_components/Nickname';
import SubHeaderContainer from '@/components/SubheaderContainer';
import clsx from 'clsx';
import getAuthDataAction from '../../_actions/my/getAuthData';

export default async function Profile() {
  const { data } = await getAuthDataAction();

  return (
    <main className={clsx('mt-[var(--header-height)] p-3', 'flex flex-col gap-3')}>
      <SubHeaderContainer title="My Profile" />
      <div className="mt-[45px]">
        <div className="flex flex-col gap-2">
          <Email email={data.email} />
          <Nickname id={data.id} nickname={data.nickname} />
        </div>
      </div>
    </main>
  );
}
