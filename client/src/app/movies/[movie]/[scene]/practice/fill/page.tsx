'use client';

import { use } from 'react';
import { getTokenInClient } from '@/utils/cookie';
import { useDataFetching } from '@/hooks/useDataFetching';
import DialogListContainer from '../../_components/DialogListContainer';
import SceneHeader from '../../_components/SceneHeader';
import getScene from '@/app/_actions/scenes/getScene';
import FillDialogueListItem from './FillDialogueListItem';

export default function MovieScenePracticeFill({
  params,
}: {
  params: Promise<{ movie: string; scene: string }>;
}) {
  const resolvedParams = use(params);
  const token = getTokenInClient() || '';

  const { data, isLoading } = useDataFetching({
    queryKey: ['scene', resolvedParams.scene, token],
    queryFn: () => getScene(resolvedParams.scene),
    enabled: !!resolvedParams.scene,
  });

  if (isLoading) {
    return (
      <main className="mt-[var(--header-height)] p-3">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-1/3 bg-gray-200 rounded" />
          <div className="space-y-2">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="h-16 bg-gray-200 rounded" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (!data?.data) return null;

  return (
    <main className="mt-[var(--header-height)] p-3">
      <SceneHeader
        title={resolvedParams.movie}
        movieId={resolvedParams.movie}
        sceneId={resolvedParams.scene}
      />
      <DialogListContainer>
        {data.data.dialogues.map((dialogue, index) => (
          <FillDialogueListItem
            key={index}
            dialogue={dialogue}
            index={index}
            speaker={dialogue.speaker}
          />
        ))}
      </DialogListContainer>
    </main>
  );
}
