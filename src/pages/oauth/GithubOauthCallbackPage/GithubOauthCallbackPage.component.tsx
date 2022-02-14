import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { axios } from '../../../axios';
import { AxiosError } from 'axios';

export const GithubOauthCallbackPage: FC = () => {
  const { code } = useParams<'code'>();
  const [error, setError] = useState<AxiosError>();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.post<string>('auth/github', { code });
        const token = data.split('&')[0].split('=')[1];

        localStorage.setItem('token', token);
        navigate('/');
      } catch (err) {
        setError(err as AxiosError);
      }
    })();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return <p>Loading...</p>;
};
