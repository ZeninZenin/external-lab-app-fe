import { FC, useEffect } from 'react';
import { useLocation } from 'react-router';
import { URL_GITHUB_OAUTH } from '../../constants';

export const LoginRedirect: FC = () => {
  const isAuthorized = !!localStorage.getItem('token');
  const { pathname } = useLocation();

  useEffect(() => {
    if (!isAuthorized && pathname !== '/oauth/github/callback') {
      window.location.assign(URL_GITHUB_OAUTH);
    }
  }, [isAuthorized, pathname]);

  return null;
};
