"use client";

import { use } from 'react';
import { getTokenInClient } from '@/utils/cookie';
import { useDataFetching } from '@/hooks/useDataFetching';
import { GoToLogin } from '@/components/Fallback';
import ExpressionList from './_components/ExpressionList';
import getExpressionsByScene from '@/app/_actions/expressions/getExpressionsByScene';
import { ActionResponse } from '@/types/action';
import { ExpressionType } from '@/types/expression';

export default function MovieScenePracticeExpressionPage({
  params,
}: {
  params: Promise<{ movie: string; scene: string }>;
}) {
  const resolvedParams = use(params);
  const token = getTokenInClient() || '';

  const { data, isLoading } = useDataFetching<ActionResponse<ExpressionType[] | null>>({
    queryKey: ['expressions', resolvedParams.scene, token],
    queryFn: () => getExpressionsByScene({ sceneId: resolvedParams.scene }),
    enabled: !!resolvedParams.scene,
  });

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="h-16 bg-gray-200 rounded" />
        ))}
      </div>
    );
  }

  if (data?.status === 401) return <GoToLogin />;
  if (!data?.data) return <div>no data</div>;

  return <ExpressionList expressions={data.data} />;
}
