import React, { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { GithubOauthCallbackPage, ProfilePage } from '../../pages';
import { LoginRedirect } from './LoginRedirect';
import { NotFoundPlaceholder } from './NotFoundPlaceholder';
import { PrivateRoute } from './PrivateRoute';
import { TaskManagement, UsersPageComponent, GuestPage } from '../../pages';
import { TrainerTasks } from '../../pages/trainerTasks/TrainerTasks.component';
import { UserProfile } from '../../pages/userProfile';

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
          <PrivateRoute roles={['admin', 'trainer']}>
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
      <Route
        path="/profile/:login"
        element={
          <PrivateRoute roles={['admin', 'trainer']}>
            <UserProfile />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute roles={['admin', 'trainer']}>
            <TrainerTasks />
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
