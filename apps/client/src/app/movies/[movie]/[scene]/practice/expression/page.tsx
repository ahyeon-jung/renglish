'use client';

import { use } from 'react';
import { useDataFetching } from '@/hooks/useDataFetching';
import { GoToLogin } from '@/components/Fallback';
import ExpressionList from './_components/ExpressionList';
import getExpressionsByScene from '@/app/actions/expressions/getExpressionsByScene';
import { ActionResponse } from '@/types/action';
import { ExpressionType } from '@/types/expression';
import { QUERY_KEYS } from '@/hooks/queryKeys';
import { useUserStore } from '@/stores/userStore';

export default function MovieScenePracticeExpressionPage({
  params,
}: {
  params: Promise<{ movie: string; scene: string }>;
}) {
  const resolvedParams = use(params);
  const { userId } = useUserStore();
  if (!userId) return <GoToLogin />;

  const { data, isLoading } = useDataFetching<ActionResponse<ExpressionType[] | null>>({
    queryKey: QUERY_KEYS.EXPRESSION.LIST(resolvedParams.scene),
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
