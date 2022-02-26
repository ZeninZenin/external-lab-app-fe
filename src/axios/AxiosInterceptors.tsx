import noop from 'lodash-es/noop';
import { FC, useEffect } from 'react';
import { axios } from './index';
import { URL_GITHUB_OAUTH } from '../constants';
import { useUserContext } from '../context';
import { AxiosRequestHeaders } from 'axios';
import { isDevelopment } from '../utils';

export const AxiosInterceptors: FC = () => {
  const { setUserContextValue } = useUserContext();

  useEffect(() => {
    if (isDevelopment) return;

    const id = axios.interceptors.response.use(noop, res => {
      if (res.response.status === '401') {
        localStorage.removeItem('token');
        setUserContextValue(prevState => ({ ...prevState, user: null }));
        window.location.assign(URL_GITHUB_OAUTH);
      }
    });

    return () => {
      axios.interceptors.request.eject(id);
    };
  }, []);

  useEffect(() => {
    if (isDevelopment) return;

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
