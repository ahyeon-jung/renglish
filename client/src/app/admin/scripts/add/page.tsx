'use client';

import Dialogues from './_components/Dialogues';
import Movie from './_components/Movie';
import { SCRIPT_ADD_STEP, ScriptAddStepType } from './_constants/step';
import Scene from './_components/Scene';
import Speakers from './_components/Speakers';
import { Step, useFunnel } from '@/hooks/useFunnel';

import FileUpload from './_components/FileUpload';
import clsx from 'clsx';
import { useState } from 'react';
import Expressions from './_components/Expressions';

export type ScriptAddBodyType = {
  movieId: string;
  sceneId: string;
};

const INITIAL_SCRIPT_ADD_BODY: ScriptAddBodyType = {
  movieId: '',
  sceneId: '',
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
          <FileUpload />
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
        <Step currentStep={SCRIPT_ADD_STEP.EXPRESSIONS}>
          <Expressions />
        </Step>
      </Funnel>
    </main>
  );
}
