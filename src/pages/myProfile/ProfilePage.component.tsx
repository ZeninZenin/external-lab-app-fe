import React from 'react';
import { ProfileView } from '../../components';
import { useCurrentUser } from 'src/utils/hooks/query/useCurrentUser';

export const ProfilePage = () => {
  const { user } = useCurrentUser();

  return <ProfileView user={user} />;
};
