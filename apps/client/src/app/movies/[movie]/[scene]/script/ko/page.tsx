"use client"

import { parseText, stripHtmlTags } from '@/utils/content';

import AudioBox from '../../_components/AudioBox';
import DialogListContainer from '../../_components/DialogListContainer';
import DialogListItem from '../../_components/DialogListItem';
import SceneHeader from '../../_components/SceneHeader';
import getScene from '@/app/actions/scenes/getScene';
import { use } from 'react';
import { useUserStore } from '@/stores/userStore';
import { useDataFetching } from '@/hooks/useDataFetching';

export default function MovieSceneKoreanScript({
  params,
}: {
  params: Promise<{ movie: string; scene: string }>;
}) {
  const resolvedParams = use(params);
  const { userId } = useUserStore();

  const { data, isLoading } = useDataFetching({
    queryKey: ['scene', resolvedParams.scene, userId ?? ''],
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

  const scene = data.data;

  return (
    <main className="mt-[var(--header-height)] py-3">
      <SceneHeader
        title={resolvedParams.movie}
        movieId={resolvedParams.movie}
        sceneId={resolvedParams.scene}
      />
      <DialogListContainer>
        {scene.audioUrl && <AudioBox audioUrl={scene.audioUrl} />}
        {scene.dialogues.map((dialogue, index) => {
          return (
            <DialogListItem
              key={index}
              speaker={dialogue.speaker}
              clickedText={stripHtmlTags(dialogue.englishScript)}
              isBackground
            >
              {parseText(dialogue.koreanScript)}
            </DialogListItem>
          );
        })}
      </DialogListContainer>
    </main>
  );
}
