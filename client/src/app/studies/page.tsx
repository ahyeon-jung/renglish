import React from 'react';
import StatusQueryTags from './_compoents/StatusQueryTags';
import StudyItem from './_compoents/StudyItem';
import clsx from 'clsx';
import getStudiesAction from '../_actions/studies/getStudies';

export default async function Studies() {
  const { data: studies } = await getStudiesAction({});

  return (
    <main className={clsx('mt-[var(--header-height)] p-3', 'flex flex-col gap-3')}>
      <StatusQueryTags />
      <div className="flex flex-col gap-3">
        {studies.map((study) => (
          <StudyItem key={study.id} {...study} />
        ))}
      </div>
    </main>
  );
}
