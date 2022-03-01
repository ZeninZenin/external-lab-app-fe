import React from 'react';
import { useUserContext } from '../../context';
import { ProfileView } from '../../components';

export const ProfilePage = () => {
  const {
    userContextValue: { user },
  } = useUserContext();

  return <ProfileView user={user} />;
};
