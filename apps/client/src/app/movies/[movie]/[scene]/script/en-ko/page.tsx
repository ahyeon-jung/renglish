import AudioBox from '../../_components/AudioBox';
import DialogListContainer from '../../_components/DialogListContainer';
import DialogListItem from '../../_components/DialogListItem';
import SceneHeader from '../../_components/SceneHeader';
import Text from '@/components/Text';
import getScene from '@/app/actions/scenes/getScene';
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
        {scene.audioUrl && <AudioBox audioUrl={scene.audioUrl} />}
        {scene.dialogues.map((dialogue, index) => {
          return (
            <DialogListItem key={index} speaker={dialogue.speaker} isBackground>
              <div>
                <Text>{parseText(dialogue.englishScript)}</Text>
                <Text>{parseText(dialogue.koreanScript)}</Text>
              </div>
            </DialogListItem>
          );
        })}
      </DialogListContainer>
    </main>
  );
}
