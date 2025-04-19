import { DataProvider, GetOneParams, GetOneResult, QueryFunctionContext, RaRecord } from 'react-admin';
import RESOURCE from '../../constants/resource';
import { movieApi, sceneApi, studyApi, userApi } from '../../libs/api';

const getOne: DataProvider['getOne'] = async <RecordType extends RaRecord>(resource: string, params: GetOneParams<RecordType> & QueryFunctionContext) => {
  if (resource === RESOURCE.MOVIES) {
    const data = await movieApi.movieControllerFindOne({ movieId: params.id.toString() });

    return { data } as unknown as GetOneResult<RecordType>
  }

  if (resource === RESOURCE.STUDIES) {
    const data = await studyApi.studyControllerFindOne({ studyId: params.id.toString() });
    console.log(data)
    return { data } as unknown as GetOneResult<RecordType>
  }


  if (resource === RESOURCE.USERS) {
    const data = await userApi.userControllerFindUserById({ userId: params.id.toString() });
    console.log(data)
    return { data } as unknown as GetOneResult<RecordType>
  }

  if (resource === RESOURCE.SCENES) {
    const data = await sceneApi.sceneControllerFindSceneById({ sceneId: params.id.toString() });
    console.log(data)
    return { data } as unknown as GetOneResult<RecordType>
  }




  return Promise.reject(`Unknown resource: ${resource}`);
};

export default getOne;
