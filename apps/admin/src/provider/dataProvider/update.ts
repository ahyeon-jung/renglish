import { DataProvider } from "react-admin";

const update: DataProvider["update"] = async (resource) => {
  return Promise.reject(`Unknown resource: ${resource}`);
};

export default update;
