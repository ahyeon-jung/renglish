import { FunnelContext, FunnelContextType } from '@/hooks/useFunnel';
import { SCRIPT_ADD_STEP, ScriptAddStepType } from '../../_constants/step';
import { useContext, useState } from 'react';

import Field from '@/components/Field';
import { ScriptAddBodyType } from '../../page';
import StepFormContainer from '../StepFormContainer';

export type ScriptAddMovieBodyType = {
  title: string;
  imageUrl: string;
  studiedAt: string;
  description: string;
};

export const INITIAL_SCRIPT_ADD_MOVIE_BODY: ScriptAddMovieBodyType = {
  title: '',
  imageUrl: '',
  studiedAt: '',
  description: '',
};

export default function Movie() {
  const [movieInfoBody, setMovieInfoBody] = useState(INITIAL_SCRIPT_ADD_MOVIE_BODY);
  const { setStep, setData } = useContext(FunnelContext) as FunnelContextType<
    ScriptAddStepType,
    ScriptAddBodyType
  >;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMovieInfoBody((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextClick = () => {
    setData((prev) => ({ ...prev, movie: movieInfoBody }));
    setStep(SCRIPT_ADD_STEP.SCENE);
  };

  return (
    <StepFormContainer header="Movie Information" onNext={handleNextClick}>
      <Field>
        <Field.Label>Title</Field.Label>
        <Field.Input value={movieInfoBody.title} name="title" onChange={handleChange} />
      </Field>
      <Field>
        <Field.Label>Image Address</Field.Label>
        <Field.Input value={movieInfoBody.imageUrl} name="imageUrl" onChange={handleChange} />
      </Field>
      <Field>
        <Field.Label>Description</Field.Label>
        <Field.Input value={movieInfoBody.description} name="description" onChange={handleChange} />
      </Field>
    </StepFormContainer>
  );
}
