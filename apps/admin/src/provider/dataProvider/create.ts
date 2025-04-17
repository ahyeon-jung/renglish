import { DataProvider } from "react-admin";

const create: DataProvider['create'] = async (resource, params) => {


  return Promise.reject(`Unknown resource: ${resource}`);
}

export default create;
