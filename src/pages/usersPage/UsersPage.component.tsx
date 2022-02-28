import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { Box } from 'src/app/components/Box';
import { axios } from 'src/axios';
import { User } from '../../types';
import { ListLoader } from '../../app/components/ListLoader';
import { UserItem } from './components/UserItem';

export const UsersPageComponent = () => {
  const { data, isLoading, refetch } = useQuery(
    'users-list',
    async () => (await axios.get<(User & { trainer: User })[]>('/users')).data,
  );

  return isLoading ? (
    <ListLoader />
  ) : (
    <Box>
      {data?.map(user => (
        <Box key={user._id} mb={24}>
          <UserItem user={user} refetchList={refetch} />
        </Box>
      ))}
    </Box>
  );
};
