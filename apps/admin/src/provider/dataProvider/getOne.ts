import { DataProvider } from 'react-admin';

const getOne: DataProvider['getOne'] = async (resource, params) => {

  return Promise.reject(`Unknown resource: ${resource}`);
};

export default getOne;
