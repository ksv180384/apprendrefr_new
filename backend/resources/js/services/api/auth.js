import { post } from '@/services/api/query';
// import { objToUrlParams } from '@/helpers/helper';

const login = async (params) => {
  return await post(`auth/login`, params);
}

const logout = async () => {
  return await post(`auth/logout`);
}

export default {
  login,
  logout
};
