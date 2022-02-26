import React, { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { GithubOauthCallbackPage, ProfilePage } from '../../pages';
import { LoginRedirect } from './LoginRedirect';
import { NotFoundPlaceholder } from './NotFoundPlaceholder';
import { PrivateRoute } from './PrivateRoute';
import { TaskManagement, UsersPageComponent, GuestPage } from '../../pages';

export const AppRouter: FC = () => (
  <>
    <Routes>
      <Route path="/" element={<Navigate to={'/profile'} />} />
      <Route
        path="/profile"
        element={
          <PrivateRoute roles={['student', 'trainer']}>
            <ProfilePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/tasks-management"
        element={
          <PrivateRoute roles={['admin']}>
            <TaskManagement />
          </PrivateRoute>
        }
      />
      <Route
        path="/users-list"
        element={
          <PrivateRoute roles={['admin', 'trainer']}>
            <UsersPageComponent />
          </PrivateRoute>
        }
      />
      <Route path="/guest" element={<GuestPage />} />
      <Route path="oauth">
        <Route path="github/callback" element={<GithubOauthCallbackPage />} />
      </Route>
      <Route path="*" element={<NotFoundPlaceholder />} />
    </Routes>
    <LoginRedirect />
  </>
);
