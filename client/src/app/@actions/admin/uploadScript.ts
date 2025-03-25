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

  const speakerPromises = speakers.map(async (speaker) => {
    const {
      data: { id: speakerId },
    } = await addSpeakerAction(sceneId, speaker);
    return { speakerId, speakerName: speaker.speaker_name };
  });

  const dbSpeakers = await Promise.all(speakerPromises);

  const dialoguePromises = dialogues.map(async (dialogue) => {
    const speaker = dbSpeakers.find((dbSpeaker) => dbSpeaker.speakerName === dialogue.speaker);
    if (!speaker) {
      throw new Error('No speaker found for dialogue');
    }
    return addDialogueAction(sceneId, speaker.speakerId, dialogue);
  });

  await Promise.all(dialoguePromises);

  return true;
}
