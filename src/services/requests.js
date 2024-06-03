import API from './API';

export const activateAccount = (data) => API.post('/users/activation/', data);
export const addUser = (data) => API.post('/user-management/', data);
export const deleteUser = (id_user) =>
  API.delete('/user-management/' + id_user + '/');
export const editUser = (id_user, data) =>
  API.patch('/user-management/' + id_user + '/', data);
export const getUser = (id_user) =>
  API.get('/user-management/' + id_user + '/');
export const listUsers = (page = 1) =>
  API.get('/user-management/list/?page=' + page);
export const me = () => API.get('/users/me/');
export const profile = () => API.get('/users/profile/');
export const registration = () => API.get('/users/registration/');
export const resetPassword = (data) =>
  API.post('/users/reset_password_confirm/', data);
export const sendPasswordResetLink = (data) =>
  API.post('/users/reset_password/', data);
export const signIn = (data) => API.post('/auth/token/login/', data);
