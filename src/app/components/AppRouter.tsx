import React, { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Title from 'antd/es/typography/Title';
import { GithubOauthCallbackPage } from '../../pages';
import { LoginRedirect } from './LoginRedirect';

export const AppRouter: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Title>Home</Title>} />
      <Route path="oauth">
        <Route path="github/callback" element={<GithubOauthCallbackPage />} />
      </Route>
      <Route path="*" element={<h1>There&apos;s nothing here!</h1>} />
    </Routes>
    <LoginRedirect />
  </BrowserRouter>
);
