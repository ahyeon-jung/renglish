import { FunnelContext, FunnelContextType } from '@/hooks/useFunnel';
import {
  MOVIE_CATEGORY,
  MOVIE_CATEGORY_OPTIONS,
  MovieCategoryType,
} from '@/constants/movie-category';
import { SCRIPT_ADD_STEP, ScriptAddStepType } from '../../_constants/step';
import { useContext, useState } from 'react';

import Field from '@/components/Field';
import { ScriptAddBodyType } from '../../page';
import StepFormContainer from '../StepFormContainer';

export type ScriptAddMovieBodyType = {
  title: string;
  category: MovieCategoryType;
  imageUrl: string;
  description: string;
};

export const INITIAL_SCRIPT_ADD_MOVIE_BODY: ScriptAddMovieBodyType = {
  title: '',
  category: MOVIE_CATEGORY.DRAMA,
  imageUrl: '',
  description: '',
};

export default function Movie() {
  const { data, setStep, setData } = useContext(FunnelContext) as FunnelContextType<
    ScriptAddStepType,
    ScriptAddBodyType
  >;
  const [movieInfoBody, setMovieInfoBody] = useState(data.movie);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMovieInfoBody((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextClick = () => {
    setData((prev) => ({ ...prev, movie: movieInfoBody }));
    setStep(SCRIPT_ADD_STEP.SCENE);
  };

  const isAvailableNextButton =
    movieInfoBody.title && movieInfoBody.imageUrl && movieInfoBody.description;

  return (
    <StepFormContainer
      header="Movie Information"
      onNext={handleNextClick}
      disabled={!isAvailableNextButton}
    >
      <Field>
        <Field.Label>Title</Field.Label>
        <Field.Input value={movieInfoBody.title} name="title" onChange={handleChange} />
      </Field>
      <Field>
        <Field.Label>Category</Field.Label>
        <Field.Select
          name="category"
          options={MOVIE_CATEGORY_OPTIONS}
          value={movieInfoBody.category}
          onChange={handleChange}
        />
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
