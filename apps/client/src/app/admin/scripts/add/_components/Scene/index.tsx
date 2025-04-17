import { FunnelContext, FunnelContextType } from '@/hooks/useFunnel';
import { SCRIPT_ADD_STEP, ScriptAddStepType } from '../../_constants/step';
import { useContext, useEffect, useState } from 'react';

import Field from '@/components/Field';
import { ScriptAddBodyType } from '../../page';
import StepFormContainer from '../StepFormContainer';
import { CreateSceneDto } from '@/services';
import getMovies from '@/app/_actions/movies/getMovies';
import addSceneAction from '@/app/_actions/scenes/addScene';

const INITIAL_SCRIPT_ADD_SCENE_BODY: CreateSceneDto = {
  title: '',
  description: '',
  audioUrl: '',
};

export default function Scene() {
  const { data, setStep, setData } = useContext(FunnelContext) as FunnelContextType<
    ScriptAddStepType,
    ScriptAddBodyType
  >;

  const [selectedMovieId, setSelectedMovieId] = useState<string>(data.movieId ?? '');
  const [movies, setMovies] = useState<{ label: string; value: string }[]>([]);
  const [sceneInfoBody, setSceneInfoBody] = useState<CreateSceneDto>(INITIAL_SCRIPT_ADD_SCENE_BODY);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSceneInfoBody((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextClick = async () => {
    await addSceneAction(selectedMovieId, sceneInfoBody);
    setData((prev) => ({ ...prev, sceneId: '' }));
    setStep(SCRIPT_ADD_STEP.SPEAKERS);
  };

  const isAvailableNextButton =
    sceneInfoBody.title && sceneInfoBody.audioUrl && sceneInfoBody.description;

  useEffect(() => {
    const loadMovies = async () => {
      const fetched = await getMovies({ offset: 1, limit: 100 });
      setMovies(fetched.data.data.map((movie) => ({ value: movie.id, label: movie.title })));
    };
    loadMovies();
  }, []);

  return (
    <StepFormContainer onNext={handleNextClick} disabled={!isAvailableNextButton}>
      <Field>
        <Field.Label>Movie</Field.Label>
        <Field.Select
          options={movies}
          value={selectedMovieId}
          onChange={(e) => setSelectedMovieId(e.target.value)}
        />
      </Field>
      <Field>
        <Field.Label>Title</Field.Label>
        <Field.Input value={sceneInfoBody.title} name="title" onChange={handleChange} />
      </Field>
      <Field>
        <Field.Label>Audio URL</Field.Label>
        <Field.Input value={sceneInfoBody.audioUrl} name="audioUrl" onChange={handleChange} />
      </Field>
      <Field>
        <Field.Label>Description</Field.Label>
        <Field.Input value={sceneInfoBody.description} name="description" onChange={handleChange} />
      </Field>
    </StepFormContainer>
  );
}
