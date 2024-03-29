import axios from 'axios';
import { BASE_URL } from './ENV.js';

const API = axios.create({
  baseURL: BASE_URL,
});

console.log(BASE_URL);

export default API;
