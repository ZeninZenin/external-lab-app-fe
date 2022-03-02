import Axios from 'axios';

export const axios = Axios.create({ baseURL: '/api' });

export { AxiosInterceptors } from './AxiosInterceptors';
