import ExpressionList from './_components/ExpressionList';
import NonAccess from './_components/NonAccess';
import getExpressionsByScene from '@/app/_actions/expressions/getExpressionsByScene';

export default async function MovieScenePracticeFill({
  params,
}: {
  params: Promise<{ movie: string; scene: string }>;
}) {
  const slug = await params;
  const { data, status } = await getExpressionsByScene({ sceneId: slug.scene });

  if (status === 401) return <NonAccess />;
  if (!data) return <div>no data</div>;
  return <ExpressionList expressions={data} />;
}
