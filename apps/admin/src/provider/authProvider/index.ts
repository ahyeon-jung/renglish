import { AuthProvider } from "react-admin";
import { authApi } from "../../libs/api";

const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    try {
      const res = await authApi.authControllerLogin({ loginDto: { email: username, password } });

      localStorage.setItem("token", res.accessToken);
      return Promise.resolve();
    } catch (error) {
      console.error(error);
      return Promise.reject();
    }
  },
  logout: () => {
    localStorage.removeItem("token");
    return Promise.resolve();
  },
  checkAuth: () => {
    return localStorage.getItem("token") ? Promise.resolve() : Promise.reject();
  },
  checkError: (error) => {
    const status = error?.status || error?.response?.status;

    if (status === 401 || status === 403) {
      localStorage.removeItem("token");
      return Promise.reject();
    }

    return Promise.resolve();
  },
  getPermissions: () => Promise.resolve(),
};

export default authProvider;
