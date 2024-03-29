import API from './API'

export const signIn = (data) => API.post('/auth/token/login/', data);