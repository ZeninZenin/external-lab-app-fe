import noop from 'lodash-es/noop';
import { FC } from 'react';
import { axios } from './index';
import { URL_GITHUB_OAUTH } from '../constants';

export const AxiosInterceptors: FC = () => {
  axios.interceptors.response.use(noop, res => {
    if (res.response.status === '401') {
      localStorage.removeItem('token');
      window.location.assign(URL_GITHUB_OAUTH);
    }
  });
  return null;
};
