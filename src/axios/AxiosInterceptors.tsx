import { FC, useEffect } from 'react';
import { axios } from './index';
import { URL_GITHUB_OAUTH } from '../constants';
import { AxiosRequestHeaders } from 'axios';

export const AxiosInterceptors: FC = () => {
  useEffect(() => {
    const id = axios.interceptors.response.use(
      res => res,
      res => {
        if (res.response.status === 401) {
          localStorage.removeItem('token');
          window.location.assign(URL_GITHUB_OAUTH);
        }
      },
    );

    return () => {
      axios.interceptors.request.eject(id);
    };
  }, []);

  useEffect(() => {
    const id = axios.interceptors.request.use(config => {
      const token = localStorage.getItem('token');

      if (token) {
        (config.headers as AxiosRequestHeaders)['Authorization'] =
          'Bearer ' + token;
      }

      return config;
    });

    return () => {
      axios.interceptors.request.eject(id);
    };
  }, []);

  return null;
};
