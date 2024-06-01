import API from './API';

export const activateAccount = (data) => API.post('/users/activation/', data);
export const editUser = (id_user, data) =>
  API.patch('/user-management/' + id_user + '/', data);
export const getUser = (id_user) =>
  API.get('/user-management/' + id_user + '/');
export const me = () => API.get('/users/me/');
export const profile = () => API.get('/users/profile/');
export const resetPassword = (data) =>
  API.post('/users/reset_password_confirm/', data);
export const sendPasswordResetLink = (data) =>
  API.post('/users/reset_password/', data);
export const signIn = (data) => API.post('/auth/token/login/', data);
