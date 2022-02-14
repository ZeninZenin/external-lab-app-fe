import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { axios } from '../../../axios';
import { AxiosError } from 'axios';
import { useSearchParams } from 'react-router-dom';

export const GithubOauthCallbackPage: FC = () => {
  const [searchParams] = useSearchParams();
  const [error, setError] = useState<AxiosError>();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.post<string>('auth/github', {
          code: searchParams.get('code'),
        });
        const token = data.split('&')[0].split('=')[1];

        localStorage.setItem('token', token);
        navigate('/');
      } catch (err) {
        setError(err as AxiosError);
      }
    })();
  }, []);

  if (error) {
    return <p>{error.toString()}</p>;
  }

  return <p>Loading...</p>;
};
