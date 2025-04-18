import { CreateParams, CreateResult, DataProvider, RaRecord } from "react-admin";
import RESOURCE from "../../constants/resource";
import { movieApi } from "../../libs/api";

const create: DataProvider['create'] = async <RecordType extends RaRecord>(resource: string, params: CreateParams<RecordType>) => {
  if (resource === RESOURCE.MOVIES) {
    if (!params.data.title || !params.data.category || !params.data.imageUrl || !params.data.description) {
      return Promise.reject('Missing required fields');
    }

    const data = await movieApi.movieControllerCreate({
      createMovieDto: {
        title: params.data.title,
        category: params.data.category,
        imageUrl: params.data.imageUrl,
        description: params.data.description,
      }
    })

    return { data } as unknown as CreateResult<RecordType>
  }

  return Promise.reject(`Unknown resource: ${resource}`);
}

export default create;
