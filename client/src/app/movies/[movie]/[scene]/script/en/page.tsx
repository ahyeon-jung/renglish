"use client";

import { parseText, stripHtmlTags } from '@/utils/content';
import { getTokenInClient } from '@/utils/cookie';
import { useDataFetching } from '@/hooks/useDataFetching';
import { use } from 'react';

import AudioBox from '../../_components/AudioBox';
import DialogListContainer from '../../_components/DialogListContainer';
import DialogListItem from '../../_components/DialogListItem';
import SceneHeader from '../../_components/SceneHeader';
import Text from '@/components/Text';
import getScene from '@/app/_actions/scenes/getScene';

export default function MovieSceneEnglishScript({
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

  const scene = data.data;

  return (
    <main className="mt-[var(--header-height)] p-3">
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
              clickedText={stripHtmlTags(dialogue.koreanScript)}
              isBackground
            >
              <Text>{parseText(dialogue.englishScript)}</Text>
            </DialogListItem>
          );
        })}
      </DialogListContainer>
    </main>
  );
}
