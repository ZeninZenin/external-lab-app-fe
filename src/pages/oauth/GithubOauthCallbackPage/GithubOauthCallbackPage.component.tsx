import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { axios } from '../../../axios';
import { AxiosError } from 'axios';
import { useSearchParams } from 'react-router-dom';
import { Space, Spin } from 'antd';
import './GithubOauthCallbackPage.styles.css';
import Title from 'antd/es/typography/Title';
import Text from 'antd/es/typography/Text';

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

        localStorage.setItem('token', data);
        navigate('/');
      } catch (err) {
        setError(err as AxiosError);
      }
    })();
  }, []);

  return (
    <>
      <Space direction="vertical">
        <Title>Авторизация с Github</Title>
      </Space>
      <div className="github-oauth-spin-wrapper">
        {error ? (
          <Text type="danger">
            {(error as AxiosError)?.response?.data?.statusCode}.{' '}
            {(error as AxiosError)?.response?.data?.message}
          </Text>
        ) : (
          <Spin size="large" />
        )}
      </div>
    </>
  );
};
