'use client';

import { use } from 'react';
import { useDataFetching } from '@/hooks/useDataFetching';
import SceneHeader from '../../_components/SceneHeader';
import WritingDialogues from './_components/WritingDialogues';
import getScene from '@/app/actions/scenes/getScene';
import { GoToLogin } from '@/components/Fallback';
import { useUserStore } from '@/stores/userStore';

export default function MovieScenePracticeWriting({
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


  if (!userId) return <GoToLogin />;

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
      <WritingDialogues {...data.data} />
    </main>
  );
}
