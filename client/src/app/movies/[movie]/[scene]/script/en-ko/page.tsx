import DialogListContainer from '../../@components/DialogListContainer';
import DialogListItem from '../../@components/DialogListItem';
import SceneHeader from '../../@components/SceneHeader';
import Text from '@/components/Text';
import getScene from '@/app/@actions/scenes/getScene';
import { parseText } from '@/utils/content';

export default async function MovieSceneEnglishKoreanScript({
  params,
}: {
  params: Promise<{ movie: string; scene: string }>;
}) {
  const slug = await params;

  const { data: scene } = await getScene(slug.scene);

  return (
    <main className="mt-[var(--header-height)] p-3">
      <SceneHeader title={slug.movie} movieId={slug.movie} sceneId={slug.scene} />
      <DialogListContainer>
        {scene.dialogues.map((dialogue, index) => {
          return (
            <DialogListItem key={index} speaker={dialogue.speaker} isLeft={true} isBackground>
              <div>
                <Text as="p">{parseText(dialogue.english_script)}</Text>
                <Text as="p">{parseText(dialogue.korean_script)}</Text>
              </div>
            </DialogListItem>
          );
        })}
      </DialogListContainer>
    </main>
  );
}
