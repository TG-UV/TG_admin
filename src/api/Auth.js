import API from './API'

export const signIn = (data) => API.post('/auth/token/login/', data);
export const activateAccount = (data) => API.post('/users/activation/', data);