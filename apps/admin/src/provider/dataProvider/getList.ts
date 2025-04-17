import { sceneApi } from "../../libs/api";

import RESOURCE from "../../constants/resource";

const getList = async (resource: string, params: any) => {
  if (resource === RESOURCE.SCENES) {
    const { page, perPage } = params.pagination;
    const offset = page;
    const limit = perPage;

    const data = await sceneApi.sceneControllerFindAllScene({
      offset,
      limit,
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
