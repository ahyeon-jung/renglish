import ListContainer from '../_components/ListContainer';
import SubHeaderContainer from '@/components/SubheaderContainer';
import clsx from 'clsx';

export default async function Studies() {
  return (
    <main className={clsx('mt-[var(--header-height)] p-3', 'flex flex-col gap-3')}>
      <SubHeaderContainer title="My Study List" />
      <div className="mt-[45px]">
        <ListContainer title="현재 지원한 스터디">
          <div></div>
        </ListContainer>
        <ListContainer title="참여한 스터디">
          <div></div>
        </ListContainer>
      </div>
    </main>
  );
}
