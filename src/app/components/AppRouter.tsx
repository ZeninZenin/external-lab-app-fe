import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import Title from 'antd/es/typography/Title';
import { GithubOauthCallbackPage, ProfilePage } from '../../pages';
import { LoginRedirect } from './LoginRedirect';
import { NotFoundPlaceholder } from './NotFoundPlaceholder';

export const AppRouter: FC = () => (
  <>
    <Routes>
      <Route path="/" element={<Title>Home</Title>} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="oauth">
        <Route path="github/callback" element={<GithubOauthCallbackPage />} />
      </Route>
      <Route path="*" element={<NotFoundPlaceholder />} />
    </Routes>
    <LoginRedirect />
  </>
);
