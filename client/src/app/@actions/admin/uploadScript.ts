'use server';

import { ScriptAddBodyType } from '@/app/admin/scripts/add/page';
import addDialogueAction from '../dialogues/addDialogue';
import addMovieAction from '../movies/addMovie';
import addSceneAction from '../scenes/addScene';
import addSpeakerAction from '../speakers/addSpeaker';

type UploadScriptActionProps = ScriptAddBodyType;

export default async function uploadScriptAction({
  movie,
  scene,
  speakers,
  dialogues,
}: UploadScriptActionProps) {
  const {
    data: { id: movieId },
  } = await addMovieAction(movie);

  const {
    data: { id: sceneId },
  } = await addSceneAction(movieId, scene);

  const dbSpeakers = [];

  for (const speaker of speakers) {
    const {
      data: { id: speakerId },
    } = await addSpeakerAction(sceneId, speaker);

    dbSpeakers.push({ speakerId, speakerName: speaker.speaker_name });
  }

  for (const dialogue of dialogues) {
    const speaker = dbSpeakers.find((dbSpeaker) => dbSpeaker.speakerName === dialogue.speaker);
    if (!speaker) {
      throw new Error('no speaker');
    }
    await addDialogueAction(sceneId, speaker.speakerId, dialogue);
  }

  return true;
}
