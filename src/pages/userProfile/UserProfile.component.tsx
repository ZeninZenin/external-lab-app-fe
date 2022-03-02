import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import { axios } from 'src/axios';
import { ProfileView } from '../../components';
import { User } from '../../types';

export const UserProfile = () => {
  const { login } = useParams<{ login: string }>();

  const { data } = useQuery(
    `${login}-profile`,
    async () => (await axios.get<User>(`/users/${login}`))?.data,
  );

  return <ProfileView user={data} />;
};
