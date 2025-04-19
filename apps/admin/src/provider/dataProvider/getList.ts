import { expressionApi, movieApi, sceneApi, studyApi, userApi } from "../../libs/api";

import RESOURCE from "../../constants/resource";

const getList = async (resource: string, params: any) => {
  if (resource === RESOURCE.SCENES) {
    const { page, perPage } = params.pagination;

    const data = await sceneApi.sceneControllerFindAllScene({
      offset: page,
      limit: perPage,
    });

    return {
      data: data.data.map((item: any) => ({ ...item, id: item.id })),
      total: data.data.length,
    };
  }

  if (resource === RESOURCE.USERS) {
    const { page, perPage } = params.pagination;

    const data = await userApi.userControllerFindAll({
      offset: page,
      limit: perPage,
    });

    return {
      data: data.data.map((item: any) => ({ ...item, id: item.id })),
      total: data.data.length,
    };
  }

  if (resource === RESOURCE.MOVIES) {
    const { page, perPage } = params.pagination;

    const data = await movieApi.movieControllerFindAll({
      offset: page,
      limit: perPage,
    });

    return {
      data: data.data.map((item: any) => ({ ...item, id: item.id })),
      total: data.data.length,
    };
  }

  if (resource === RESOURCE.STUDIES) {
    const { page, perPage } = params.pagination;

    const data = await studyApi.studyControllerFindAll({
      offset: page,
      limit: perPage,
    });

    return {
      data: data.data.map((item: any) => ({ ...item, id: item.id })),
      total: data.data.length,
    };
  }

  return {
    data: [],
    total: 0,
  };
}

export default getList;
