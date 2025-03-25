'use client';

import Movie, { INITIAL_SCRIPT_ADD_MOVIE_BODY, ScriptAddMovieBodyType } from './_components/Movie';
import { SCRIPT_ADD_STEP, ScriptAddStepType } from './_constants/step';
import Scene, { INITIAL_SCRIPT_ADD_SCENE_BODY, ScriptAddSceneBodyType } from './_components/Scene';
import Speakers, {
  INITIAL_SCRIPT_ADD_SPEAKER_BODY,
  ScriptAddSpeakersBodyType,
} from './_components/Speakers';
import { Step, useFunnel } from '@/hooks/useFunnel';

import Dialogues from './_components/Dialogues';
import SubmitConfirm from './_components/SubmitConfirm';
import clsx from 'clsx';
import { useState } from 'react';

export type ScriptAddBodyType = {
  movie: ScriptAddMovieBodyType;
  scene: ScriptAddSceneBodyType;
  speakers: ScriptAddSpeakersBodyType;
};

const INITIAL_SCRIPT_ADD_BODY: ScriptAddBodyType = {
  movie: INITIAL_SCRIPT_ADD_MOVIE_BODY,
  scene: INITIAL_SCRIPT_ADD_SCENE_BODY,
  speakers: INITIAL_SCRIPT_ADD_SPEAKER_BODY,
};

export default function ScriptAdd() {
  const [scriptAddBody, setScriptAddBody] = useState<ScriptAddBodyType>(INITIAL_SCRIPT_ADD_BODY);
  const [Funnel] = useFunnel<ScriptAddStepType, ScriptAddBodyType>(
    SCRIPT_ADD_STEP.MOVIE,
    scriptAddBody,
    setScriptAddBody,
  );

  return (
    <main className={clsx('mt-[var(--header-height)]')}>
      <Funnel>
        <Step currentStep={SCRIPT_ADD_STEP.MOVIE}>
          <Movie />
        </Step>
        <Step currentStep={SCRIPT_ADD_STEP.SCENE}>
          <Scene />
        </Step>
        <Step currentStep={SCRIPT_ADD_STEP.SPEAKERS}>
          <Speakers />
        </Step>
        <Step currentStep={SCRIPT_ADD_STEP.DIALOGUES}>
          <Dialogues />
        </Step>
        <Step currentStep={SCRIPT_ADD_STEP.SUBMIT_CONFIRM}>
          <SubmitConfirm />
        </Step>
      </Funnel>
    </main>
  );
}
