import React, { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  CalendarPage,
  GithubOauthCallbackPage,
  LectureManagement,
  ProfilePage,
  UserProfile,
  Dashboard,
  TaskManagement,
  UsersPageComponent,
  GuestPage,
} from 'src/pages';
import { LoginRedirect } from './LoginRedirect';
import { NotFoundPlaceholder } from './NotFoundPlaceholder';
import { PrivateRoute } from './PrivateRoute';
import { MyGroupPageComponent } from 'src/pages/myGroup';

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
        path="/lectures-management"
        element={
          <PrivateRoute roles={['admin', 'trainer']}>
            <LectureManagement />
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
        path="/my-group"
        element={
          <PrivateRoute roles={['admin', 'trainer']}>
            <MyGroupPageComponent />
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
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route path="/guest" element={<GuestPage />} />
      <Route path="oauth">
        <Route path="github/callback" element={<GithubOauthCallbackPage />} />
      </Route>
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="*" element={<NotFoundPlaceholder />} />
    </Routes>
    <LoginRedirect />
  </>
);
