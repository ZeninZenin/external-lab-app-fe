import React from 'react';
import { useUserContext } from '../../context';
import { ProfileView } from '../../app/components/ProfileView';

export const ProfilePage = () => {
  const {
    userContextValue: { user },
  } = useUserContext();

  return <ProfileView user={user} />;
};
