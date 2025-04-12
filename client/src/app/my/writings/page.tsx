import ListContainer from '../_components/ListContainer';
import SubHeaderContainer from '@/components/SubheaderContainer';
import clsx from 'clsx';

export default async function Writings() {
  return (
    <main className={clsx('mt-[var(--header-height)] p-3', 'flex flex-col gap-3')}>
      <SubHeaderContainer title="My Writing List" />
      <div className="mt-[45px]">
        <ListContainer title="작문 리스트">
          <div></div>
        </ListContainer>
      </div>
    </main>
  );
}
