import { Create, SelectInput, SimpleForm, TextInput } from 'react-admin'
import RESOURCE from '../../constants/resource'
import { IMAGE_STORAGE_URL } from '../../constants/url'

const MOVIE_CATEGORIES = [
  { label: 'Romance', value: 'romance' },
  { label: 'Drama', value: 'drama' },
  { label: 'Action', value: 'action' },
  { label: 'Comedy', value: 'comedy' },
  { label: 'Adventure', value: 'adventure' },
  { label: 'Animation', value: 'animation' },
  { label: 'Sci-Fi', value: 'sci-fi' },
];

const MovieCreate = () => (
  <Create resource={RESOURCE.MOVIES}>
    <SimpleForm>
      <TextInput source="title" />
      <SelectInput source="category" choices={MOVIE_CATEGORIES} defaultValue={MOVIE_CATEGORIES[0].value} optionText="label" optionValue="value" />
      <a href={IMAGE_STORAGE_URL} target="_blank" rel="noopener noreferrer">
        이미지 저장소 바로가기
      </a>
      <TextInput source="imageUrl" />
      <TextInput source="description" />
    </SimpleForm>
  </Create>
)

export default MovieCreate
