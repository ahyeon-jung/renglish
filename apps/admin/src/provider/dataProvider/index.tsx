import { DataProvider } from "react-admin";
import getList from "./getList";
import getOne from "./getOne";
import create from "./create";
import update from "./update";

const dataProvider: DataProvider = {
  getList,
  getOne,
  create,
  update,
  getMany: async () => Promise.reject('Not implemented'),
  getManyReference: async () => Promise.reject('Not implemented'),
  updateMany: async () => Promise.reject('Not implemented'),
  delete: async () => Promise.reject('Not implemented'),
  deleteMany: async () => Promise.reject('Not implemented'),
};

export default dataProvider;