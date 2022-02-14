import { Axios } from 'axios';

export const axios = new Axios({ baseURL: process.env.REACT_APP_BACK_HOST });
