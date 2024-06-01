const TOKEN_KEY = 'authToken';
const ID_USER = 'id_user';

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const getIdUser = () => {
  return localStorage.getItem(ID_USER);
};

export const setIdUser = (id_user) => {
  localStorage.setItem(ID_USER, id_user);
};

export const removeIdUser = () => {
  localStorage.removeItem(ID_USER);
};

export const signInService = (token, id_user) => {
  setToken(token);
  setIdUser(id_user);
};

export const signOutService = () => {
  localStorage.clear();
};

export const isAuthenticated = () => {
  return !!getToken();
};
