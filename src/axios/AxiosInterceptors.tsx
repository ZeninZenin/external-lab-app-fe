import noop from 'lodash-es/noop';
import { FC } from 'react';
import { axios } from './index';
import { URL_GITHUB_OAUTH } from '../constants';
import { useUserContext } from '../context';

export const AxiosInterceptors: FC = () => {
  const { setUserContextValue } = useUserContext();

  axios.interceptors.response.use(noop, res => {
    if (res.response.status === '401') {
      localStorage.removeItem('token');
      setUserContextValue(prevState => ({ ...prevState, user: null }));
      window.location.assign(URL_GITHUB_OAUTH);
    }
  });
  return null;
};
