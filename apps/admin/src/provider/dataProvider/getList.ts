import { expressionApi, movieApi, sceneApi, speakerApi, studyApi, userApi } from "../../libs/api";

import RESOURCE from "../../constants/resource";
import { SpeakersApi } from "@renglish/services";

const getList = async (resource: string, params: any) => {
  if (resource === RESOURCE.SCENES || resource === RESOURCE.DIALOGUES) {
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

  if (resource === RESOURCE.EXPRESSIONS) {
    const data = await expressionApi.expressionControllerFindWeeklyExpressions();

    return {
      data,
      total: data.length,
    };
  }

  if (resource === RESOURCE.SPEAKERS) {
    const data = await speakerApi.speakerControllerFindSpeakers();

    return {
      data,
      total: data.length,
    };
  }

  return {
    data: [],
    total: 0,
  };
}

export default getList;
