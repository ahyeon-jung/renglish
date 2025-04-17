import getWritingsAction from '@/app/actions/my/getWritings';
import ListContainer from '../_components/ListContainer';
import SubHeaderContainer from '@/components/SubheaderContainer';
import clsx from 'clsx';
import { parseText } from '@/utils/content';

export default async function Writings() {
  const { data } = await getWritingsAction();
  return (
    <main className={clsx('mt-[var(--header-height)] p-3', 'flex flex-col gap-3')}>
      <SubHeaderContainer title="My Writing List" />
      <div className="mt-[45px]">
        <ListContainer title="작문 리스트">
          {data?.map((writing) => (
            <div key={writing.id}>
              <div>{writing.writing}</div>
              <div>{parseText(writing.dialogue.englishScript)}</div>
              <div>{parseText(writing.dialogue.englishScript)}</div>
            </div>
          ))}
        </ListContainer>
      </div>
    </main>
  );
}
